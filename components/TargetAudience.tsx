export default function TargetAudience() {
  const audiences = [
    {
      emoji: '🎨',
      title: 'นักออกแบบ / UX UI Designer',
      description: 'ต้องการเพิ่มทักษะด้าน AI และ Design System เพื่อยก level งานของตัวเอง',
    },
    {
      emoji: '📊',
      title: 'ผู้ทำงานด้านดาต้า/Software Developer',
      description: 'อยากเข้าใจด้านออกแบบมากขึ้น และประยุกต์ AI ในการพัฒนาผลิตภัณฑ์',
    },
    {
      emoji: '🚀',
      title: 'บุคคลทั่วไปที่มีความสนใจ',
      description: 'อยากสร้างพื้นฐาน AI และ Design Thinking เพื่อประยุกต์ใช้กับงานของตนเอง',
    },
  ]

  return (
    <section className="py-32 px-8 bg-gradient-to-br from-dark-bg to-dark">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 max-w-3xl mx-auto text-light">
          ใครเหมาะกับคอร์สนี้
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {audiences.map((audience, index) => (
            <div
              key={index}
              className="bg-dark-card rounded-2xl p-8 border-2 border-primary/30 hover:border-primary transition-colors"
            >
              <div className="text-5xl mb-4">{audience.emoji}</div>
              <h3 className="text-xl font-bold text-primary mb-4">
                {audience.title}
              </h3>
              <p className="text-text-light leading-relaxed">
                {audience.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
