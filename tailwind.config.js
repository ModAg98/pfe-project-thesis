/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // iObeya-inspired identity: royal blue, violet, sky
        brand: {
          DEFAULT: '#2342CE',
          blue: '#2342CE',
          navy: '#17287E',
          deep: '#0E1A52',
          purple: '#9A66D9',
          violet: '#7B4FD0',
          sky: '#6FBCEB',
          mint: '#39C5A6',
        },
        ink: {
          900: '#14172A',
          700: '#333A55',
          500: '#5C6580',
          400: '#8992AB',
          300: '#B3BACD',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#F4F7FD',
          tint: '#EEF3FE',
          line: '#DFE6F5',
        },
        signal: {
          good: '#16A97C',
          warn: '#E8952F',
          bad: '#E2514F',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Inter var', 'SF Pro Display', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
        mono: ['JetBrains Mono', 'SFMono-Regular', 'Menlo', 'Consolas', 'monospace'],
      },
      letterSpacing: {
        armor: '0.14em',
        ultra: '0.24em',
      },
      boxShadow: {
        card: '0 1px 2px rgba(20,23,42,0.04), 0 12px 32px -12px rgba(35,66,206,0.18)',
        lift: '0 2px 4px rgba(20,23,42,0.05), 0 28px 60px -20px rgba(35,66,206,0.30)',
        pop: '0 24px 70px -18px rgba(122,79,208,0.42)',
      },
      backgroundImage: {
        'brand-grad': 'linear-gradient(135deg, #2342CE 0%, #7B4FD0 55%, #9A66D9 100%)',
        'sky-grad': 'linear-gradient(135deg, #6FBCEB 0%, #2342CE 100%)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 3s linear infinite',
      },
    },
  },
  plugins: [],
}
