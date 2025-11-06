import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ffd700',
        secondary: '#ffed4e',
        success: '#51cf66',
        accent: '#ffd700',
        dark: '#000000',
        'dark-bg': '#111111',
        'dark-card': '#1a1a1a',
        light: '#ffffff',
        'text-light': '#b0b0b0',
      },
      spacing: {
        xs: '8px',
        sm: '16px',
        md: '24px',
        lg: '40px',
        xl: '80px',
        xxl: '160px',
      },
      fontFamily: {
        sans: [
          '"IBM Plex Sans Thai"',
          'Inter',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif',
        ],
      },
      borderRadius: {
        lg: '16px',
        xl: '20px',
      },
      boxShadow: {
        sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
        md: '0 4px 20px rgba(0, 0, 0, 0.08)',
        lg: '0 20px 40px rgba(0, 0, 0, 0.15)',
      },
    },
  },
  plugins: [],
}

export default config
