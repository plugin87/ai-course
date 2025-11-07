export default function SocialProof() {
  const testimonials = [
    {
      rating: 5,
      text: 'หลังจากจบคอร์ส ฉันได้งานใหม่ที่มีเงินเดือนสูงขึ้นจากเดิม 40% และได้ประยุกต์ AI ในงานออกแบบของตัวเองจริงๆ',
      author: 'นางสาว ภัญญา ม.',
      role: 'UX/UI Designer, Tech Startup',
    },
    {
      rating: 5,
      text: 'สอนแบบสด แต่มีบันทึกให้ดูซ้ำ เข้าใจง่าย และผู้สอนช่วยตอบข้อสงสัยอย่างละเอียด ปรึกษาเรื่องอาชีพด้วย',
      author: 'นายสมศักดิ์ ก.',
      role: 'Data Analyst, Digital Agency',
    },
    {
      rating: 5,
      text: 'Portfolio ที่สร้างในคอร์สนี้ช่วยให้ฉันประสบความสำเร็จในการประจำตัวต่อลูกค้าและได้ freelance project ที่มี value สูง',
      author: 'นางสาว กิตติยา ค.',
      role: 'Freelance Designer',
    },
  ]

  return (
    <section className="py-32 px-8 bg-dark-bg">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 max-w-3xl mx-auto text-light">
          ความพึงพอใจจากผู้เรียนที่ผ่านมา
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-2xl p-8 border border-dark-card/50"
            >
              {/* Star Rating */}
              <div className="text-yellow-400 mb-4 text-lg">
                {'★'.repeat(testimonial.rating)}
              </div>

              {/* Testimonial Text */}
              <p className="text-text-light italic mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author Info */}
              <div className="border-t border-dark-card/50 pt-4">
                <p className="text-sm text-text-light">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
