import type {Config} from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './data/**/*.{ts,tsx}',
    './i18n/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        aytrix: {
          bg: 'var(--aytrix-bg)',
          surface: 'var(--aytrix-surface)',
          border: 'var(--aytrix-border)',
          primary: 'var(--aytrix-primary)',
          secondary: 'var(--aytrix-secondary)',
          text: 'var(--aytrix-text)',
          muted: 'var(--aytrix-muted)'
        }
      },
      backgroundImage: {
        'aytrix-gradient': 'var(--aytrix-gradient)',
        'hero-grid':
          'radial-gradient(circle at top, rgba(124, 58, 237, 0.2), transparent 35%), radial-gradient(circle at bottom right, rgba(6, 182, 212, 0.18), transparent 30%)'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124, 58, 237, 0.18), 0 24px 60px rgba(10, 10, 15, 0.45)'
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        pulseSoft: 'pulseSoft 2.5s ease-in-out infinite',
        marquee: 'marquee 24s linear infinite'
      },
      keyframes: {
        float: {
          '0%, 100%': {transform: 'translateY(0px)'},
          '50%': {transform: 'translateY(-10px)'}
        },
        pulseSoft: {
          '0%, 100%': {transform: 'scale(1)', opacity: '1'},
          '50%': {transform: 'scale(1.06)', opacity: '0.9'}
        },
        marquee: {
          from: {transform: 'translateX(0)'},
          to: {transform: 'translateX(-50%)'}
        }
      }
    }
  },
  plugins: []
};

export default config;
