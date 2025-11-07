import Image from 'next/image'

export default function BonusEbook() {
  return (
    <section className="py-32 px-8 bg-gradient-to-br from-primary/10 via-dark to-dark-bg">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="bg-gradient-to-r from-primary to-secondary px-6 py-2 rounded-full text-sm font-bold uppercase tracking-wider text-dark">
              🎁 โบนัสพิเศษ
            </span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-black mb-6 text-light">
            รับ E-Book พิเศษ<br />
            <span className="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              เฉพาะสำหรับผู้สมัครเรียน
            </span>
          </h2>
          <p className="text-lg text-text-light max-w-2xl mx-auto">
            เมื่อจบการศึกษา คุณจะได้รับ E-Book ฉบับพิเศษ "From Graphic Design สู่ UX/UI Designer"
            ที่รวมความรู้ทั้งหมดที่คุณได้เรียนไป
          </p>
        </div>

        {/* Images Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 mb-12">
          {/* Book Cover */}
          <div className="flex justify-center">
            <div className="bg-dark rounded-2xl p-8 flex justify-center">
              <Image
                src="/images/Book cover@3x.png"
                alt="E-Book Cover - From Graphic Design สู่ UX/UI Designer"
                width={300}
                height={400}
                className="w-full max-w-xs h-auto rounded-xl shadow-2xl"
              />
            </div>
          </div>

          {/* Content List */}
          <div className="flex justify-center">
            <Image
              src="/images/01. List of Content@3x.png"
              alt="E-Book Content List"
              width={400}
              height={500}
              className="w-full max-w-sm rounded-xl shadow-2xl"
            />
          </div>
        </div>

        {/* Benefits Section */}
        <div className="bg-dark-card/50 backdrop-blur rounded-2xl p-8 border border-primary/20 hover:border-primary/50 transition-all max-w-3xl mx-auto mb-12">
          <h3 className="text-2xl font-bold text-light mb-6 flex items-center gap-3 justify-center">
            <span className="text-3xl">📖</span>
            เนื้อหาภายในเล่ม
          </h3>

          <div className="space-y-3">
            <p className="text-text-light leading-relaxed text-center mb-6">
              E-Book นี้ออกแบบมาเป็นคู่มือครอบจักรวาล สำหรับการเดินทางจาก Graphic Design สู่ UX/UI Designer
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3 text-text-light">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">⭐</span>
                <span>รวมความรู้พื้นฐานสำคัญ ตั้งแต่หลักการถึงการปฏิบัติ</span>
              </li>
              <li className="flex items-start gap-3 text-text-light">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">⭐</span>
                <span>ตัวอย่างโปรเจกต์จริงและ Case Study ที่ใช้ได้จริง</span>
              </li>
              <li className="flex items-start gap-3 text-text-light">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">⭐</span>
                <span>Tips & Tricks จากผู้ทำงานมากกว่า 15 ปี</span>
              </li>
              <li className="flex items-start gap-3 text-text-light">
                <span className="text-primary text-lg mt-0.5 flex-shrink-0">⭐</span>
                <span>Accessible ตลอดชีวิตก職าของคุณ</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-primary/10 via-dark to-dark-bg rounded-2xl p-8 border border-primary/30">
            <h3 className="text-2xl font-bold text-light mb-4">
              ที่รอแค่นี้ก็ได้ประสิทธิผลแล้ว...
            </h3>
            <p className="text-lg text-primary font-bold">
              เลือกเรียนวันนี้ รับโบนัสนี้ไปเลย! 🚀
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
