'use client'

import { useState } from 'react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: 'smooth' })
    setMobileMenuOpen(false)
  }

  return (
    <header className="sticky top-0 z-50 bg-dark-bg border-b border-dark-card/50 backdrop-blur-sm">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-4 sm:py-6 flex justify-between items-center">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <span className="text-lg sm:text-2xl font-bold text-light">AI</span>
          <span className="text-lg sm:text-2xl font-bold text-primary">Design</span>
          <span className="text-lg sm:text-2xl font-bold text-light leading-none">System</span>
        </div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-8 md:gap-10 list-none">
          <li>
            <a
              href="#benefits"
              className="text-sm md:text-base text-text-light font-medium hover:text-primary transition-colors"
            >
              จุดเด่น
            </a>
          </li>
          <li>
            <a
              href="#curriculum"
              className="text-sm md:text-base text-text-light font-medium hover:text-primary transition-colors"
            >
              หลักสูตร
            </a>
          </li>
          <li>
            <a
              href="#faq"
              className="text-sm md:text-base text-text-light font-medium hover:text-primary transition-colors"
            >
              คำถาม
            </a>
          </li>
          <li>
            <a
              href="#registration"
              className="text-sm md:text-base text-text-light font-medium hover:text-primary transition-colors"
            >
              ติดต่อ
            </a>
          </li>
        </ul>

        <button
          onClick={() => {
            const element = document.getElementById('registration')
            element?.scrollIntoView({ behavior: 'smooth' })
          }}
          className="hidden md:block bg-primary text-dark font-semibold px-5 md:px-6 py-2 rounded-lg text-sm md:text-base hover:bg-opacity-90 transition-all hover:shadow-lg hover:shadow-primary/50 hover:-translate-y-1"
        >
          สมัครเลย
        </button>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden flex flex-col gap-1.5 focus:outline-none"
        >
          <span
            className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              mobileMenuOpen ? 'opacity-0' : ''
            }`}
          ></span>
          <span
            className={`w-6 h-0.5 bg-primary transition-all duration-300 ${
              mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          ></span>
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-dark-card/80 backdrop-blur-sm border-t border-dark-card/50">
          <ul className="flex flex-col gap-0 list-none px-4 sm:px-6 py-4 sm:py-6">
            <li>
              <button
                onClick={() => handleNavClick('benefits')}
                className="w-full text-left py-3 text-sm sm:text-base text-text-light font-medium hover:text-primary transition-colors"
              >
                จุดเด่น
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('curriculum')}
                className="w-full text-left py-3 text-sm sm:text-base text-text-light font-medium hover:text-primary transition-colors"
              >
                หลักสูตร
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('faq')}
                className="w-full text-left py-3 text-sm sm:text-base text-text-light font-medium hover:text-primary transition-colors"
              >
                คำถาม
              </button>
            </li>
            <li>
              <button
                onClick={() => handleNavClick('registration')}
                className="w-full text-left py-3 text-sm sm:text-base text-text-light font-medium hover:text-primary transition-colors"
              >
                ติดต่อ
              </button>
            </li>
            <li className="pt-3 sm:pt-4 border-t border-dark-card/50">
              <button
                onClick={() => handleNavClick('registration')}
                className="w-full bg-gradient-to-r from-primary to-secondary text-dark font-bold py-3 px-4 sm:px-6 rounded-lg text-sm sm:text-base hover:shadow-lg hover:shadow-primary/50 transition-all"
              >
                สมัครเลย
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  )
}
