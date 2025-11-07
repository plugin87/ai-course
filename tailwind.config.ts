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
      fontSize: {
        // Fluid typography using clamp() for responsive scaling
        // Formula: clamp(min, preferred, max)
        'xs': 'clamp(0.75rem, 1vw, 0.875rem)',
        'sm': 'clamp(0.875rem, 1.2vw, 1rem)',
        'base': 'clamp(1rem, 1.4vw, 1.125rem)',
        'lg': 'clamp(1.125rem, 1.6vw, 1.25rem)',
        'xl': 'clamp(1.25rem, 2vw, 1.5rem)',
        '2xl': 'clamp(1.5rem, 2.5vw, 1.875rem)',
        '3xl': 'clamp(1.875rem, 3.2vw, 2.25rem)',
        '4xl': 'clamp(2.25rem, 4vw, 2.5rem)',
        '5xl': 'clamp(2.5rem, 5vw, 3rem)',
        '6xl': 'clamp(3rem, 6vw, 3.75rem)',
        '7xl': 'clamp(3.5rem, 7vw, 4.5rem)',
      },
      lineHeight: {
        // Proportional line-height for better readability
        'tight': '1.2',
        'normal': '1.5',
        'relaxed': '1.75',
        'loose': '2',
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
