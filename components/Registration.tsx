'use client'

import { FormEvent, useState } from 'react'
import { Mail } from 'lucide-react'

export default function Registration() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lineId: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Filter phone field to only accept digits
    let finalValue = value
    if (name === 'phone') {
      finalValue = value.replace(/[^0-9]/g, '')
    }

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', phone: '', lineId: '' })

        // Reset success message after 3 seconds
        setTimeout(() => {
          setSubmitted(false)
        }, 3000)
      } else {
        alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('เกิดข้อผิดพลาด กรุณาลองใหม่อีกครั้ง')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section
      id="registration"
      className="py-20 sm:py-28 md:py-32 px-4 sm:px-6 md:px-8 bg-primary text-dark"
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-black mb-6 sm:mb-8 leading-tight">
            พร้อมเข้าร่วม AI Design System Bootcamp หรือยัง?
          </h2>
          <p className="text-base sm:text-lg opacity-85 mb-8 sm:mb-12 leading-relaxed">
            สมัครสอบถามเพิ่มเติม ติดตามข้อมูล และรับสิทธิพิเศษ Early Bird ราคา 29,000 บาทเพียงนั้น!
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 sm:gap-8 mb-8 sm:mb-12 py-6 sm:py-8 border-y border-dark/20">
            <div className="flex items-center gap-2 sm:gap-3 text-sm sm:text-base">
              <Mail className="w-5 sm:w-7 h-5 sm:h-7 text-dark flex-shrink-0" />
              <span className="font-semibold">อีเมล: designlazyyy@gmail.com</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 justify-center mb-8 sm:mb-12">
            <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
              <span className="text-lg sm:text-xl flex-shrink-0">🔒</span>
              <span className="font-semibold pt-0.5">สามารถจ่ายผ่านบริษัทได้</span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 text-sm sm:text-base">
              <span className="text-lg sm:text-xl flex-shrink-0">📋</span>
              <span className="font-semibold pt-0.5">ออกบิลในนามบริษัท</span>
            </div>
          </div>
        </div>

        <div className="bg-dark/10 rounded-3xl p-6 sm:p-10 md:p-14 backdrop-blur-sm max-w-2xl mx-auto">
          {submitted ? (
            <div className="py-8 sm:py-12 text-center">
              <div className="text-6xl sm:text-7xl mb-3 sm:mb-4">✓</div>
              <h3 className="text-2xl sm:text-3xl font-bold text-dark mb-2 sm:mb-3">
                ขอบคุณสำหรับการสมัคร!
              </h3>
              <p className="text-sm sm:text-base opacity-85 mb-4">
                เราจะติดต่อกลับให้ท่านภายใน 24 ชั่วโมง
              </p>
              <div className="bg-dark/10 rounded-lg p-4 sm:p-6 border-2 border-dark/20">
                <p className="text-xs sm:text-sm font-semibold text-dark mb-2">📧 อีเมลยืนยันการสมัครถูกส่งไปแล้ว</p>
                <p className="text-xs sm:text-sm opacity-80">
                  กรุณาตรวจสอบอีเมลของท่าน (รวมถึงโฟลเดอร์ Spam/Promotions)
                </p>
                <p className="text-xs sm:text-sm opacity-80 mt-2">
                  ติดต่อเรา: 099-414-5665
                </p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-xs sm:text-sm font-bold text-dark mb-1.5 sm:mb-2"
                >
                  ชื่อ-นามสกุล
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="กรุณากรอกชื่อ-นามสกุล"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dark/30 bg-white rounded-lg focus:outline-none focus:border-dark text-dark placeholder-dark/50 font-medium text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-xs sm:text-sm font-bold text-dark mb-1.5 sm:mb-2"
                >
                  อีเมล
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="กรุณากรอกอีเมล"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dark/30 bg-white rounded-lg focus:outline-none focus:border-dark text-dark placeholder-dark/50 font-medium text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-xs sm:text-sm font-bold text-dark mb-1.5 sm:mb-2"
                >
                  เบอร์โทรศัพท์
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="กรุณากรอกเบอร์โทร"
                  required
                  pattern="[0-9]{10,}"
                  inputMode="numeric"
                  title="โปรดป้อนเบอร์โทรให้ถูกต้อง (10 หลักขึ้นไป)"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dark/30 bg-white rounded-lg focus:outline-none focus:border-dark text-dark placeholder-dark/50 font-medium text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="lineId"
                  className="block text-xs sm:text-sm font-bold text-dark mb-1.5 sm:mb-2"
                >
                  Line ID
                </label>
                <input
                  type="text"
                  id="lineId"
                  name="lineId"
                  value={formData.lineId}
                  onChange={handleChange}
                  placeholder="กรุณากรอก Line ID"
                  required
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-dark/30 bg-white rounded-lg focus:outline-none focus:border-dark text-dark placeholder-dark/50 font-medium text-sm"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-dark text-primary py-3 sm:py-4 px-4 sm:px-6 rounded-lg font-bold text-base sm:text-lg hover:opacity-90 transition-all hover:shadow-lg hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'กำลังส่ง...' : 'ลงทะเบียนรับสิทธิ์ Early Bird ฟรี!'}
              </button>

              <p className="text-xs sm:text-sm text-dark/70 text-center mt-3 sm:mt-4 font-medium">
                เราจะติดต่อกลับภายใน 24 ชั่วโมง
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
