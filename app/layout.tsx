import type { Metadata, Viewport } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Design System Bootcamp - โปรแกรมเรียนสายออกแบบและ AI',
  description: 'คอร์สเข้มข้น 6 เดือน เรียนสด สอนโดยผู้เชี่ยวชาญ พร้อมสร้างโปรเจกต์จริง',
  keywords: ['Design System', 'AI', 'Bootcamp', 'UX/UI', 'Design'],
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="th">
      <head>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-JH9Z4VYF85"></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-JH9Z4VYF85');
            `,
          }}
        />
      </head>
      <body className="bg-dark text-light">
        {children}
      </body>
    </html>
  )
}
