import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Get current Bangkok time in format: YYYY-MM-DD HH:MM:SS.mm (UTC+7)
function getCurrentTimestamp(): string {
  const now = new Date()
  // Bangkok is UTC+7
  const bangkokTime = new Date(now.getTime() + (7 * 60 * 60 * 1000))

  const year = bangkokTime.getUTCFullYear()
  const month = String(bangkokTime.getUTCMonth() + 1).padStart(2, '0')
  const day = String(bangkokTime.getUTCDate()).padStart(2, '0')
  const hours = String(bangkokTime.getUTCHours()).padStart(2, '0')
  const minutes = String(bangkokTime.getUTCMinutes()).padStart(2, '0')
  const seconds = String(bangkokTime.getUTCSeconds()).padStart(2, '0')
  const ms = String(bangkokTime.getUTCMilliseconds()).padStart(3, '0').substring(0, 2)

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}`
}

// Send emails via Gmail SMTP with Nodemailer
async function sendEmails(data: any) {
  try {
    const { name, email, phone, lineId } = data
    const adminEmail = 'designlazyyy@gmail.com'
    const gmailAppPassword = process.env.GMAIL_APP_PASSWORD

    if (!gmailAppPassword) {
      console.warn('Gmail app password not configured, emails not sent')
      return false
    }

    console.log('Initializing email sender...')

    // Import nodemailer
    const nodemailer = await import('nodemailer')

    // Create transporter using Gmail SMTP
    const transporter = nodemailer.default.createTransport({
      service: 'gmail',
      auth: {
        user: adminEmail,
        pass: gmailAppPassword,
      },
    })

    console.log('Sending admin notification email...')
    const adminEmailSent = await transporter.sendMail({
      from: adminEmail,
      to: adminEmail,
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
        <p><em>Submitted at: ${getCurrentTimestamp()}</em></p>
        <p><strong>Contact:</strong> 099-414-5665</p>
      `,
    })

    console.log('✓ Admin email sent:', !!adminEmailSent.messageId)

    console.log('Sending confirmation email to user...')
    const userEmailSent = await transporter.sendMail({
      from: adminEmail,
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
        <p><strong>เรียน:</strong> สัปดาห์ละ 8 ชั่วโมง</p>
        <p><strong>เริ่มเรียน:</strong> 1 ธันวาคม 2025</p>
        <p><strong>ราคา Early Bird:</strong> 29,000 บาท (ลด 36% จากปกติ 45,000 บาท)</p>
        <hr/>
        <p><strong>ติดต่อเรา:</strong></p>
        <p>อีเมล: ${adminEmail}</p>
        <p>โทรศัพท์: 099-414-5665</p>
        <p><em>ขอบคุณ!</em></p>
      `,
    })

    console.log('✓ User confirmation email sent:', !!userEmailSent.messageId)

    return !!adminEmailSent.messageId && !!userEmailSent.messageId
  } catch (error) {
    console.error('Email sending failed:', error)
    return false
  }
}

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
          submitted_at: getCurrentTimestamp(),
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

// Save registration data to filesystem (local development only)
async function saveRegistrationDataLocal(data: any) {
  try {
    if (typeof process !== 'undefined' && process.versions?.node) {
      try {
        const { promises: fs } = await import('fs')
        const { join } = await import('path')

        const registrationsDir = join(process.cwd(), 'registrations')
        await fs.mkdir(registrationsDir, { recursive: true })

        const timestamp = getCurrentTimestamp()
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
    const { name, email, phone, lineId, userId } = await request.json()

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

    // Try to send emails
    console.log('Attempting to send emails...')
    const emailSent = await sendEmails(registrationData)

    if (emailSent) {
      console.log('✓ Emails sent successfully!')
    } else {
      console.log('⚠ Email sending failed or not configured')
    }

    return NextResponse.json(
      { message: 'Registration received successfully', userId },
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
