module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#534AB7',
          coral: '#D85A30',
          cyan: '#1D9E75',
          bg: '#0A0A0F',
        },
      },
      boxShadow: {
        glow: '0 20px 120px rgba(83,74,183,0.25)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-glow': 'radial-gradient(circle at top, rgba(83,74,183,0.3), transparent 28%), radial-gradient(circle at 30% 10%, rgba(216,90,48,0.2), transparent 16%), radial-gradient(circle at right 30%, rgba(29,158,117,0.18), transparent 24%)',
      },
      colors: {
        background: 'rgb(var(--background) / <alpha-value>)',
        foreground: 'rgb(var(--foreground) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        card: 'rgb(var(--card) / <alpha-value>)',
        'card-foreground': 'rgb(var(--card-foreground) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        'muted-foreground': 'rgb(var(--muted-foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
          foreground: 'rgb(var(--primary-foreground) / <alpha-value>)',
        },
        brand: {
          purple: '#534AB7',
          coral: '#D85A30',
          cyan: '#1D9E75',
          bg: '#0A0A0F',
        },
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.75' },
          '50%': { opacity: '1' },
        },
        spinSlow: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        fadeOutLabel: {
          '0%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
          '70%': {
            opacity: '1',
            transform: 'translateX(0) scale(1)',
          },
          '100%': {
            opacity: '0',
            transform: 'translateX(0.5rem) scale(0.95)',
          },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glowPulse: 'glowPulse 4s ease-in-out infinite',
        'spin-slow': 'spinSlow 24s linear infinite',
        fadeOut: 'fadeOutLabel 1s ease-out forwards',
      },
    },
  },
  plugins: [],
}
