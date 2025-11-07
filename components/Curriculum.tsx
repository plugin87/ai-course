export default function Curriculum() {
  const curriculum = [
    {
      section: 'Phase 1: Foundations of AI Design Systems',
      week: 'สัปดาห์ 1-4',
      lessons: [
        { number: 1, title: 'Introduction to AI Design Systems', live: true },
        { number: 2, title: 'Figma as a Design System Core', live: false },
        { number: 3, title: 'Design Tokens & Variable Systems', live: false },
        { number: 4, title: 'AI Tools for Designers', live: true },
      ]
    },
    {
      section: 'Phase 2: Systematizing Design with Code',
      week: 'สัปดาห์ 5-8',
      lessons: [
        { number: 5, title: 'Introduction to Vibe Framework', live: true },
        { number: 6, title: 'Building Components with AI Assist', live: false },
        { number: 7, title: 'Sync Figma → Vibe → GitHub', live: false },
        { number: 8, title: 'Component State & Props Design', live: true },
      ]
    },
    {
      section: 'Phase 3: Generative AI in Design Systems',
      week: 'สัปดาห์ 9-12',
      lessons: [
        { number: 9, title: 'Prompt Engineering for Designers', live: true },
        { number: 10, title: 'AI-Driven UX Patterns', live: false },
        { number: 11, title: 'Generative Token & Style Creation', live: false },
        { number: 12, title: 'Integrating AI Agents', live: true },
      ]
    },
    {
      section: 'Phase 4: DesignOps Automation & Documentation',
      week: 'สัปดาห์ 13-16',
      lessons: [
        { number: 13, title: 'DesignOps Overview', live: true },
        { number: 14, title: 'Automating Design QA', live: false },
        { number: 15, title: 'Smart Documentation', live: false },
        { number: 16, title: 'System Versioning & Governance', live: true },
      ]
    },
    {
      section: 'Phase 5: Collaborative AI & Team Scaling',
      week: 'สัปดาห์ 17-20',
      lessons: [
        { number: 17, title: 'Collaboration with AI', live: true },
        { number: 18, title: 'AI in UX Research & Testing', live: false },
        { number: 19, title: 'Scaling the Design System', live: false },
        { number: 20, title: 'Cross-Platform Integration', live: true },
      ]
    },
    {
      section: 'Phase 6: Final Project & Mastery',
      week: 'สัปดาห์ 21-24',
      lessons: [
        { number: 21, title: 'System Planning & Setup', live: true },
        { number: 22, title: 'AI-Driven Component Library', live: false },
        { number: 23, title: 'Final Integration & Optimization', live: true },
        { number: 24, title: 'Presentation & Evaluation', live: true },
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
