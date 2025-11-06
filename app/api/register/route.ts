import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Resend with API key from environment
const resendApiKey = process.env.RESEND_API_KEY || ''
const resend = resendApiKey ? new Resend(resendApiKey) : null

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Save registration data to Supabase database
async function saveToSupabase(data: any) {
  if (!supabase) {
    console.warn('Supabase not configured')
    return false
  }

  try {
    const { data: savedData, error } = await supabase
      .from('registrations')
      .insert([
        {
          name: data.name,
          email: data.email,
          phone: data.phone,
          line_id: data.lineId,
          submitted_at: new Date().toISOString(),
        },
      ])

    if (error) {
      console.error('Supabase insert error:', error)
      return false
    }

    console.log('Registration saved to Supabase:', savedData)
    return true
  } catch (error) {
    console.error('Error saving to Supabase:', error)
    return false
  }
}

// Fallback: Save registration data to filesystem (local development only)
async function saveRegistrationDataLocal(data: any) {
  try {
    // Try to save to filesystem if available (local development)
    if (typeof process !== 'undefined' && process.versions?.node) {
      try {
        const { promises: fs } = await import('fs')
        const { join } = await import('path')

        const registrationsDir = join(process.cwd(), 'registrations')
        await fs.mkdir(registrationsDir, { recursive: true })

        const timestamp = new Date().toISOString()
        const filename = `registration_${Date.now()}.json`
        const filepath = join(registrationsDir, filename)

        const registrationData = {
          ...data,
          submittedAt: timestamp,
          id: Date.now(),
        }

        await fs.writeFile(filepath, JSON.stringify(registrationData, null, 2))
        console.log(`Registration saved to ${filename}`)
      } catch (fsError) {
        console.log('Filesystem not available (expected on Cloudflare Workers)')
      }
    }
  } catch (error) {
    console.error('Error in saveRegistrationDataLocal:', error)
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, lineId } = await request.json()

    // Validate required fields
    if (!name || !email || !phone || !lineId) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }

    const registrationData = { name, email, phone, lineId }

    // Save registration data to Supabase (primary)
    const saved = await saveToSupabase(registrationData)

    // Also save locally as fallback
    await saveRegistrationDataLocal(registrationData)

    if (!saved) {
      console.warn('Registration not saved to Supabase, but saved locally')
    }

    // Try to send emails via Resend (if API key is configured)
    if (resend) {
      try {
        // Email to admin (info@designlazyyy.com)
        await resend.emails.send({
          from: 'AI Design System <onboarding@resend.dev>',
          to: 'info@designlazyyy.com',
          subject: 'New Course Registration - AI Design System Bootcamp',
          html: `
            <h2>New Registration Received!</h2>
            <p><strong>Course:</strong> AI Design System Bootcamp</p>
            <hr/>
            <h3>Applicant Information:</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Line ID:</strong> ${lineId}</p>
            <hr/>
            <p><em>This is an automated email from your AI Design System Bootcamp registration form.</em></p>
          `,
        })

        // Confirmation email to user
        await resend.emails.send({
          from: 'AI Design System <onboarding@resend.dev>',
          to: email,
          subject: 'ยืนยันการลงทะเบียน - AI Design System Bootcamp',
          html: `
            <h2>ขอบคุณที่สมัครเข้าร่วม AI Design System Bootcamp!</h2>
            <p>สวัสดี ${name},</p>
            <p>เราได้รับการลงทะเบียนของคุณแล้ว เราจะติดต่อกลับให้ท่านภายใน 24 ชั่วโมง</p>
            <hr/>
            <h3>ข้อมูลการลงทะเบียน:</h3>
            <p><strong>ชื่อ:</strong> ${name}</p>
            <p><strong>อีเมล:</strong> ${email}</p>
            <p><strong>เบอร์โทร:</strong> ${phone}</p>
            <p><strong>Line ID:</strong> ${lineId}</p>
            <hr/>
            <h3>รายละเอียดคอร์ส:</h3>
            <p><strong>ระยะเวลา:</strong> 6 เดือนเต็ม 192 ชั่วโมง</p>
            <p><strong>เรียน:</strong> สัปดาห์ละ 2 วัน (8 ชั่วโมง)</p>
            <p><strong>เริ่มเรียน:</strong> 1 ธันวาคม 2025</p>
            <p><strong>ราคา Early Bird:</strong> 29,000 บาท (ลด 36% จากปกติ 45,000 บาท)</p>
            <hr/>
            <p>หากมีคำถาม โปรดติดต่อ: info@designlazyyy.com</p>
            <p><em>ขอบคุณ!</em></p>
          `,
        })

        console.log('Emails sent successfully')
      } catch (emailError) {
        console.error('Email sending failed (data saved as backup):', emailError)
        // Continue anyway since we have backup data
      }
    } else {
      console.log('RESEND_API_KEY not configured - emails will not be sent. Data saved to backup.')
    }

    return NextResponse.json(
      { message: 'Registration received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing registration:', error)
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
}
