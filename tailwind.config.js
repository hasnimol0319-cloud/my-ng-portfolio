/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#f97316',
          hover: '#ea580c',
          light: '#fb923c',
          glow: 'rgba(249, 115, 22, 0.25)',
        },
        brand: {
          ember: '#f97316',
          'ember-foreground': '#ffedd5',
          'ember-dark': '#c2410c',
        },
        obsidian: {
          950: '#09090b',
          900: '#121215',
          850: '#16161a',
          800: '#1c1c21',
          700: '#27272a',
        }
      },
      fontFamily: {
        heading: ['Sora', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'ember-glow': '0 0 25px -5px rgba(249, 115, 22, 0.35)',
        'glass-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5)',
        'mockup': '0 25px 60px -15px rgba(0, 0, 0, 0.7)',
      },
      animation: {
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
