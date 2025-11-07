import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
const supabase = supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null

// Get current UTC time in format: YYYY-MM-DD HH:MM:SS.mm
function getCurrentTimestamp(): string {
  const now = new Date()
  const year = now.getUTCFullYear()
  const month = String(now.getUTCMonth() + 1).padStart(2, '0')
  const day = String(now.getUTCDate()).padStart(2, '0')
  const hours = String(now.getUTCHours()).padStart(2, '0')
  const minutes = String(now.getUTCMinutes()).padStart(2, '0')
  const seconds = String(now.getUTCSeconds()).padStart(2, '0')
  const ms = String(now.getUTCMilliseconds()).padStart(3, '0').substring(0, 2)
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${ms}`
}

// Get a new access token using refresh token
async function getAccessToken(refreshToken: string): Promise<string | null> {
  try {
    const clientId = process.env.GOOGLE_CLIENT_ID
    const clientSecret = process.env.GOOGLE_CLIENT_SECRET

    if (!clientId || !clientSecret) {
      console.error('Google OAuth credentials not configured')
      return null
    }

    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
      }).toString(),
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Token refresh error:', error)
      return null
    }

    const { access_token } = await response.json()
    return access_token
  } catch (error) {
    console.error('Error refreshing access token:', error)
    return null
  }
}

// Send emails via Gmail API
async function sendGmailEmails(data: any, accessToken: string) {
  try {
    const { name, email, phone, lineId } = data
    const adminEmail = 'designlazyyy@gmail.com'

    // Helper function to send email via Gmail API
    async function sendEmail(to: string, subject: string, htmlContent: string) {
      const message = {
        raw: Buffer.from(
          `From: ${adminEmail}\r\n` +
            `To: ${to}\r\n` +
            `Subject: ${subject}\r\n` +
            `Content-Type: text/html; charset="UTF-8"\r\n\r\n` +
            htmlContent
        ).toString('base64'),
      }

      const response = await fetch(
        'https://www.googleapis.com/gmail/v1/users/me/messages/send',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(message),
        }
      )

      return response.ok
    }

    // Email to admin
    const adminEmailSent = await sendEmail(
      adminEmail,
      'New Course Registration - AI Design System Bootcamp',
      `
        <h2>New Registration Received!</h2>
        <p><strong>Course:</strong> AI Design System Bootcamp</p>
        <hr/>
        <h3>Applicant Information:</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Line ID:</strong> ${lineId}</p>
        <hr/>
        <p><em>Submitted at: ${new Date().toLocaleString('th-TH', { timeZone: 'Asia/Bangkok' })}</em></p>
      `
    )

    // Confirmation email to user
    const userEmailSent = await sendEmail(
      email,
      'ยืนยันการลงทะเบียน - AI Design System Bootcamp',
      `
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
        <p>หากมีคำถาม โปรดติดต่อ: ${adminEmail}</p>
        <p><em>ขอบคุณ!</em></p>
      `
    )

    return adminEmailSent && userEmailSent
  } catch (error) {
    console.error('Gmail API email sending failed:', error)
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
      .select()

    if (error) {
      console.error('❌ Supabase insert FAILED:', JSON.stringify(error, null, 2))
      console.error('Data attempted to insert:', JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        line_id: data.lineId,
        submitted_at: getCurrentTimestamp(),
      }, null, 2))
      return false
    }

    console.log('✅ Registration saved to Supabase:', savedData)
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

    // Try to send emails via Gmail API (if user has authorized)
    let emailSent = false

    if (userId && supabase) {
      try {
        // Retrieve refresh token from Supabase
        const { data: tokenData, error: tokenError } = await supabase
          .from('oauth_tokens')
          .select('refresh_token')
          .eq('id', userId)
          .single()

        if (!tokenError && tokenData?.refresh_token) {
          // Get a fresh access token
          const accessToken = await getAccessToken(tokenData.refresh_token)

          if (accessToken) {
            emailSent = await sendGmailEmails(registrationData, accessToken)

            if (emailSent) {
              console.log('Emails sent successfully via Gmail API')
            }
          }
        }
      } catch (gmailError) {
        console.error('Gmail API error:', gmailError)
      }
    }

    if (!emailSent) {
      console.log('Emails not sent via Gmail API. Registration data saved to backup (Supabase + JSON).')
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
