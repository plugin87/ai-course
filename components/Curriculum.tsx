export default function Curriculum() {
  const curriculum = [
    {
      section: 'เดือนที่ 1: พื้นฐาน AI และ Design System',
      week: 'Week 1',
      lessons: [
        { number: 1, title: 'Overview AI & Design System', live: true },
        { number: 2, title: 'Core Principles & System Design', live: false },
        { number: 3, title: 'Tool Introduction (Figma, Cursor, AI)', live: false },
        { number: 4, title: 'Workshop: AI in Design Basics', live: true },
      ]
    },
    {
      section: 'เดือนที่ 2: Mathematical & CS Foundations',
      week: 'Week 2',
      lessons: [
        { number: 5, title: 'Linear Algebra & Probability for AI', live: true },
        { number: 6, title: 'Python Programming for Designers', live: false },
        { number: 7, title: 'Data Handling & APIs', live: false },
        { number: 8, title: 'Case Study: Data Integration', live: true },
      ]
    },
    {
      section: 'เดือนที่ 3: Human-AI Interaction & Ethics',
      week: 'Week 3',
      lessons: [
        { number: 9, title: 'Human-AI System Design Principles', live: true },
        { number: 10, title: 'UX in AI-driven Systems', live: false },
        { number: 11, title: 'Automation & Mixed-initiative', live: false },
        { number: 12, title: 'Risk Analysis & Ethics Workshop', live: true },
      ]
    },
    {
      section: 'เดือนที่ 4: AI Component & Architecture',
      week: 'Week 4',
      lessons: [
        { number: 13, title: 'Component Design with AI', live: true },
        { number: 14, title: 'Generative Design & Algorithms', live: false },
        { number: 15, title: 'System Architecture & MLOps', live: false },
        { number: 16, title: 'Portfolio Review & Analysis', live: true },
      ]
    },
    {
      section: 'เดือนที่ 5: Implementation & Testing',
      week: 'Week 5',
      lessons: [
        { number: 17, title: 'AI-Assisted Component Development', live: true },
        { number: 18, title: 'Testing & Validation', live: false },
        { number: 19, title: 'Collaboration Tools & Workflow', live: false },
        { number: 20, title: 'Project-based Learning Start', live: true },
      ]
    },
    {
      section: 'เดือนที่ 6: Industry & Capstone',
      week: 'Week 6',
      lessons: [
        { number: 21, title: 'Industry Best Practices', live: true },
        { number: 22, title: 'Case Studies (Fintech, Healthcare)', live: false },
        { number: 23, title: 'Capstone Project Development', live: true },
        { number: 24, title: 'Portfolio & Final Presentation', live: true },
      ]
    },
  ]

  return (
    <section className="py-32 px-8 bg-dark-bg" id="curriculum">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-4 max-w-3xl mx-auto text-light">
          หลักสูตรการเรียน
        </h2>
        <p className="text-center text-text-light text-lg mb-16">6 เดือนเต็ม 192 ชั่วโมง | 24 บทเรียน | สอนออนไลน์</p>

        <div className="max-w-5xl mx-auto space-y-12">
          {curriculum.map((module, idx) => (
            <div key={idx} className="space-y-4">
              {/* Section Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-dark-card">
                <h3 className="text-xl font-bold text-light">
                  {module.section}
                </h3>
                <span className="text-primary font-bold text-lg">
                  {module.week}
                </span>
              </div>

              {/* Lessons */}
              <div className="space-y-3">
                {module.lessons.map((lesson) => (
                  <div
                    key={lesson.number}
                    className="flex items-center gap-6 p-6 bg-dark-card rounded-2xl hover:shadow-2xl hover:shadow-primary/20 hover:-translate-y-1 transition-all duration-300 group"
                  >
                    {/* Number */}
                    <div className="flex-shrink-0">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                        <span className="text-dark font-bold text-lg">
                          {String(lesson.number).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="flex-grow">
                      <h4 className="text-light font-semibold group-hover:text-primary transition-colors">
                        🚩 {lesson.title}
                      </h4>
                    </div>

                    {/* Status */}
                    {lesson.live && (
                      <div className="flex-shrink-0 flex items-center gap-2">
                        <span className="w-3 h-3 bg-primary rounded-full animate-pulse"></span>
                        <span className="text-primary font-semibold text-sm">Live</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
