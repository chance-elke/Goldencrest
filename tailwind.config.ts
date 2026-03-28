import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#1a1f36',
          50: '#f0f1f6',
          100: '#d6d9e8',
          200: '#adb2d1',
          300: '#7e88ba',
          400: '#5460a3',
          500: '#1a1f36',
          600: '#161a2e',
          700: '#121626',
          800: '#0e111e',
          900: '#0a0d16',
        },
        gold: {
          DEFAULT: '#d4a843',
          50: '#fdf8ed',
          100: '#faefd0',
          200: '#f5dfa0',
          300: '#efca6a',
          400: '#e8b540',
          500: '#d4a843',
          600: '#b88a2a',
          700: '#9a6e20',
          800: '#7d561a',
          900: '#664516',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        shimmer: 'shimmer 1.5s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 168, 67, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212, 168, 67, 0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
}

export default config
