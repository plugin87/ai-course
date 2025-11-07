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

      <div className="relative z-10 pt-24 sm:pt-40 md:pt-48 pb-24 sm:pb-40 md:pb-48 px-4 sm:px-6 md:px-8 h-full flex items-center justify-center">
        <div className="max-w-xl w-full text-center">
          {/* Text Content */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
            เรียนรู้{' '}
            <span className="text-primary">AI Design System</span>
            <br />
            ปลดล็อกศักยภาพใหม่!
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-light mb-10 sm:mb-14 leading-relaxed">
            คอร์ส 6 เดือน 192 ชม. สัปดาห์ละ 8 ชม.<br/>
            <span className="text-primary font-bold">เริ่มเรียน 1 ธันวาคม 2025</span>
          </p>

          {/* Pricing Box */}
          <div className="bg-dark-card rounded-2xl p-5 sm:p-7 border border-primary/30 max-w-sm mb-8 sm:mb-12 backdrop-blur-sm mx-auto hover:border-primary/60 hover:shadow-xl hover:shadow-primary/20 transition-all duration-300 text-center space-y-3 sm:space-y-4 w-full sm:w-auto">
            <div>
              <div className="text-xs text-text-light opacity-70 mb-1">ราคาปกติ 45,000 บาท</div>
              <div className="flex items-baseline gap-1 sm:gap-2 justify-center">
                <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary">29,000</span>
                <span className="text-sm sm:text-base text-text-light">บาท</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="inline-block bg-secondary/20 text-primary px-3 py-1 rounded-full text-xs font-semibold">
                Early Bird
              </div>
              <div className="text-xs sm:text-sm font-semibold text-primary">
                ⚡ เหลือ 15 ที่เท่านั้น!
              </div>
            </div>

            <button
              onClick={handleCTAClick}
              className="w-full bg-gradient-to-r from-primary to-secondary text-dark py-2.5 sm:py-3 px-6 rounded-lg font-bold text-sm sm:text-base hover:shadow-2xl hover:shadow-primary/60 hover:-translate-y-2 transition-all duration-300 active:translate-y-0 relative overflow-hidden group"
            >
              <span className="relative z-10">สมัครตอนนี้!</span>
              <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>

            <div className="text-xs text-text-light opacity-60 pt-2">
              ✓ ต่อบริษัทได้ | ✓ ออกบิลได้
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
