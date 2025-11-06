export default function CourseDetails() {
  const details = [
    {
      icon: '⏱️',
      title: 'ระยะเวลา',
      content: '6 เดือนเต็ม\nสัปดาห์ละ 8 ชั่วโมง\nรวมระยะเวลา 192 ชั่วโมงเรียน',
    },
    {
      icon: '📚',
      title: 'รูปแบบการเรียน',
      content: 'สอนแบบออนไลน์\nLive Classes + Practical Workshops\nProject-based Learning\nPeer Review & Mentorship\nบันทึกการเรียนพร้อมให้เข้าชมซ้ำได้\nพิเศษเจอผู้สอนเดือนละครึ่ง (นอกสถานที่)',
    },
    {
      icon: '👥',
      title: 'ขนาดชั้นเรียน',
      content: 'จำกัดเพียง 20 คนต่อชั้น\nเพื่อให้ได้รับการสอนแบบ hands-on\nและ 1-on-1 mentorship ที่มีคุณภาพ',
    },
    {
      icon: '🎓',
      title: 'ใบประกาศและ Portfolio',
      content: 'ใบประกาศแสดงการศึกษา\nCapstone Project Portfolio',
    },
  ]

  return (
    <section className="py-32 px-8 bg-gradient-to-br from-dark via-dark-bg to-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 max-w-3xl mx-auto text-light">
          รายละเอียดคอร์ส
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {details.map((detail, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-2xl p-8 hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-2 transition-all duration-300"
            >
              <div className="bg-gradient-to-br from-primary to-secondary w-16 h-16 rounded-xl flex items-center justify-center mb-6 text-4xl">
                {detail.icon}
              </div>
              <h4 className="text-xl font-bold text-primary uppercase mb-6 tracking-wider">
                {detail.title}
              </h4>
              <ul className="space-y-3">
                {detail.content.split('\n').map((line, i) => (
                  <li key={i} className="flex items-start gap-3 text-text-light leading-relaxed">
                    <span className="text-primary text-lg mt-0.5">✓</span>
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
