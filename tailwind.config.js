/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        love: {
          bg: '#0a0a14',
          card: 'rgba(15, 15, 35, 0.6)',
          cyan: '#00f0ff',
          violet: '#a855f7',
          pink: '#f472b6',
          purple: '#7c3aed',
          glow: '#6366f1',
        },
      },
      boxShadow: {
        glow: '0 0 20px rgba(99, 102, 241, 0.3)',
        'glow-cyan': '0 0 20px rgba(0, 240, 255, 0.2)',
        'glow-pink': '0 0 20px rgba(244, 114, 182, 0.2)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
};
