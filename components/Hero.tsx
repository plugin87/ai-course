'use client'

export default function Hero() {
  const handleCTAClick = () => {
    const element = document.getElementById('registration')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative w-full h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/images/cover.png)' }}>
      {/* Overlay with gradient for text readability */}
      <div className="absolute inset-0" style={{
        background: `
          linear-gradient(180deg,
            rgba(0, 0, 0, 0.85) 0%,
            rgba(0, 0, 0, 0.7) 40%,
            rgba(0, 0, 0, 0.5) 70%,
            rgba(255, 215, 0, 0.25) 100%),
          radial-gradient(ellipse at 50% 100%,
            rgba(255, 215, 0, 0.4) 0%,
            transparent 70%)`
      }}></div>

      <div className="relative z-10 pt-40 pb-32 px-8 h-full flex items-center justify-center">
        <div className="max-w-2xl text-center">
          {/* Text Content */}
          <h1 className="text-5xl lg:text-6xl font-bold mb-6" style={{ lineHeight: '1.4' }}>
            เรียนรู้{' '}
            <span className="text-primary">AI Design System</span>
            <br />
            ปลดล็อกศักยภาพใหม่สายออกแบบและดาต้า!
          </h1>
          <p className="text-xl text-light mb-10 leading-relaxed">
            คอร์ส 6 เดือนเต็ม 192 ชม. เรียนสัปดาห์ละ 8 ชม. เรียนสด สอนโดยผู้เชี่ยวชาญ พร้อมสร้างโปรเจกต์จริง<br/>
            <span className="text-primary font-bold">เริ่มเรียน 1 ธันวาคม 2025 เป็นต้นไป</span>
          </p>

          {/* Pricing Box */}
          <div className="bg-dark-card rounded-2xl p-8 border border-primary/30 max-w-md mb-8 backdrop-blur-sm mx-auto hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 text-center space-y-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wider">
              ราคาพิเศษสำหรับผู้สมัครเร็ว
            </h3>
            <div className="text-lg text-text-light line-through">
              ราคาปกติ 45,000 บาท
            </div>
            <div className="flex items-baseline gap-2 justify-center">
              <span className="text-5xl font-bold text-primary">29,000</span>
              <span className="text-lg text-text-light">บาท</span>
            </div>

            <div className="flex flex-col gap-2 justify-center">
              <div className="inline-block bg-secondary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mx-auto">
                Early Bird Special
              </div>
              <div className="inline-block bg-primary/20 text-primary px-4 py-2 rounded-full text-sm font-semibold mx-auto">
                🎓 First Batch Ever
              </div>
            </div>

            <button
              onClick={handleCTAClick}
              className="w-full bg-gradient-to-r from-primary to-secondary text-dark py-4 px-8 rounded-xl font-bold text-lg hover:shadow-2xl hover:shadow-primary/60 hover:-translate-y-2 transition-all duration-300 active:translate-y-0 relative overflow-hidden group"
            >
              <span className="relative z-10">สมัครตอนนี้!</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="space-y-2">
              <div className="text-sm font-semibold text-primary">
                ⚡ เหลือที่นั่ง Early Bird เพียง 15 ที่เท่านั้น!
              </div>
              <div className="text-xs text-text-light opacity-60">
                จำนวนจำกัด ปิดรับภายในวันที่ 15 พฤศจิกายน 2025 หรือเต็มที่นั่งแล้ว
              </div>
              <div className="text-sm text-primary font-semibold mt-3">
                แนะนำให้สมัครโดยเร็ว!
              </div>
            </div>

            <div className="pt-4 border-t border-dark-card/50">
              <p className="text-xs text-text-light">
                ✓ สามารถจ่ายผ่านบริษัทได้<br/>
                ✓ ออกบิลในนามบริษัท
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
