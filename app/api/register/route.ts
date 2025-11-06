import { Resend } from 'resend'
import { NextRequest, NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

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

    // Email to admin (designlazyyy@gmail.com)
    await resend.emails.send({
      from: 'AI Design System <onboarding@resend.dev>',
      to: 'designlazyyy@gmail.com',
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
        <p>หากมีคำถาม โปรดติดต่อ: designlazyyy@gmail.com</p>
        <p><em>ขอบคุณ!</em></p>
      `,
    })

    return NextResponse.json(
      { message: 'Registration received successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json(
      { error: 'Failed to process registration' },
      { status: 500 }
    )
  }
}
