export default function Footer() {
  return (
    <footer className="bg-dark-bg text-light py-16 px-8 border-t border-dark-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold mb-8">
            AI Design System Bootcamp
          </h3>

          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            <a
              href="#benefits"
              className="text-primary hover:text-white transition-colors"
            >
              เกี่ยวกับเรา
            </a>
            <a
              href="#curriculum"
              className="text-primary hover:text-white transition-colors"
            >
              หลักสูตร
            </a>
            <a
              href="#faq"
              className="text-primary hover:text-white transition-colors"
            >
              คำถาม
            </a>
            <a
              href="mailto:designlazyyy@gmai.com"
              className="text-primary hover:text-white transition-colors"
            >
              ติดต่อเรา
            </a>
            <a
              href="#"
              className="text-primary hover:text-white transition-colors"
            >
              นโยบายความเป็นส่วนตัว
            </a>
          </div>

          <div className="border-t border-gray-700 pt-8 space-y-2 text-sm opacity-70">
            <p>&copy; 2025 Designlazyyy. All rights reserved.</p>
            <p>📧 Email: designlazyyy@gmai.com | 📞 Phone: 0994145665</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
