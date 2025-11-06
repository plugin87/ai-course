'use client'

import { Award, Briefcase, Users, Trophy } from 'lucide-react'

export default function Instructor() {
  const certifications = [
    'Google UX Design',
    'Google AI Essentials',
    'Google Prompting Essentials',
    'AI Fluency Framework & Foundations',
    'Claude Code in Action',
    'Claude with the Anthropic API',
  ]

  const companies = [
    'Google',
    'Meta',
    'Airbnb',
    'Figma',
    'Stripe',
  ]

  return (
    <section className="py-32 px-8 bg-gradient-to-br from-dark via-dark-bg to-dark" id="instructor">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl lg:text-5xl font-bold text-center mb-16 text-light">
          ผู้สอน
        </h2>

        {/* Testimonial Card */}
        <div className="bg-dark-card rounded-3xl p-12">
          <div className="flex flex-col gap-8">
            {/* Image - Top Left */}
            <div className="flex">
              <img
                src="/images/instructor.jpeg"
                alt="Designlazyyy"
                className="w-40 h-40 rounded-2xl object-cover flex-shrink-0"
              />
            </div>

            {/* Testimonial Content */}
            <div className="space-y-6">
              <div>
                <p className="text-lg text-primary font-semibold">
                  Design System Expert & UX/UI Design Master
                </p>
              </div>

              <div className="text-text-light leading-relaxed space-y-4">
                <p>
                  ผู้มีประสบการณ์กว่า <span className="text-primary font-bold">15 ปี</span> ในการออกแบบ User Experience และ User Interface ที่เน้นมนุษยศาสตร์ สำหรับผู้ใช้งาน
                </p>
                <p>
                  ช่วง <span className="text-primary font-bold">7 ปีที่ผ่านมา</span> ได้ออกแบบและบริหารจัดการ Design System สำหรับบริษัทชั้นนำในประเทศและต่างประเทศ
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="bg-dark-bg rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">15+</div>
                  <div className="text-sm text-text-light">Years Experience</div>
                </div>
                <div className="bg-dark-bg rounded-xl p-4 text-center">
                  <div className="text-2xl font-bold text-primary">50+</div>
                  <div className="text-sm text-text-light">Projects Delivered</div>
                </div>
              </div>

              {/* Certifications */}
              <div className="pt-6 border-t border-dark-card">
                <div className="text-sm text-text-light mb-3">ใบรับรอง & Certification:</div>
                <div className="grid grid-cols-2 gap-2">
                  {certifications.map((cert, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Trophy className="w-4 h-4 text-primary flex-shrink-0 mt-1" />
                      <span className="text-sm text-text-light">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
