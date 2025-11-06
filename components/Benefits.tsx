export default function Benefits() {
  const benefits = [
    {
      image: '/images/object-01.png',
      title: 'สอนสดทุกบท',
      description: 'พร้อมเวิร์กช็อปปฏิบัติจริง และการ feedback จากผู้สอนทีละคนอย่างละเอียด',
    },
    {
      image: '/images/object-02.png',
      title: 'เทคโนโลยี AI ล่าสุด',
      description: 'เรียนรู้เครื่องมือและเทคโนโลยี AI ล่าสุดที่ใช้ในวงการจริง พร้อม best practices',
    },
    {
      image: '/images/object-03.png',
      title: 'Portfolio ระดับโปร',
      description: 'สร้างผลงาน Portfolio ที่พร้อมใช้งานได้จริง และสามารถนำเสนอต่อนายจ้าง',
    },
    {
      image: '/images/object-04.png',
      title: 'Networking & Mentorship',
      description: 'เชื่อมต่อกับผู้เชี่ยวชาญในวงการ และได้รับคำแนะนำด้านอาชีพ',
    },
    {
      image: '/images/object-05.png',
      title: 'สำหรับทุกระดับ',
      description: 'เหมาะสำหรับสายออกแบบ UX/UI และผู้ที่อยากต่อยอดทักษะด้าน AI',
    },
    {
      image: '/images/object-06.png',
      title: 'เชื่อมต่อ Data',
      description: 'บูรณาการความรู้เกี่ยวกับ Data และ Design เพื่อสร้างระบบที่ยั่งยืน',
    },
  ]

  return (
    <section className="py-32 px-8 bg-dark-bg" id="benefits">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 max-w-3xl mx-auto text-light">
          จุดเด่นของคอร์สนี้
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="p-8 bg-dark-card rounded-2xl border border-dark-card/50 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1 transition-all duration-300 flex flex-col items-center text-center"
            >
              <img
                src={benefit.image}
                alt={benefit.title}
                className="w-24 h-24 object-contain mb-6"
              />
              <h3 className="text-xl font-bold mb-3 text-light">{benefit.title}</h3>
              <p className="text-text-light leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
