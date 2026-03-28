/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          cyan: '#00fff5',
          blue: '#00b4d8',
          purple: '#b829dd',
          magenta: '#ff00ff',
          pink: '#ff2d95',
          green: '#39ff14',
          lime: '#b5ff2d',
          yellow: '#ffe600',
          orange: '#ff6b35',
        },
        dark: {
          50: '#e0e0e8',
          100: '#b0b0c0',
          200: '#8080a0',
          300: '#505070',
          400: '#303050',
          500: '#1a1a2e',
          600: '#16162a',
          700: '#0f0f1e',
          800: '#0a0a16',
          900: '#050510',
          950: '#020208',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', '"Rajdhani"', 'system-ui', 'sans-serif'],
        body: ['"Rajdhani"', '"Exo 2"', 'system-ui', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'neon-flicker': 'neonFlicker 3s ease-in-out infinite',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 8s linear infinite',
        'gradient-x': 'gradientX 3s ease infinite',
        'marquee': 'marquee 25s linear infinite',
        'border-glow': 'borderGlow 3s ease-in-out infinite',
        'scan-line': 'scanLine 4s linear infinite',
        'glitch': 'glitch 0.3s ease-in-out',
        'pulse-ring': 'pulseRing 1.5s ease-out infinite',
      },
      keyframes: {
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 5px currentColor, 0 0 20px currentColor' },
          '50%': { boxShadow: '0 0 10px currentColor, 0 0 40px currentColor, 0 0 80px currentColor' },
        },
        neonFlicker: {
          '0%, 100%': { opacity: '1' },
          '41%': { opacity: '1' },
          '42%': { opacity: '0.8' },
          '43%': { opacity: '1' },
          '45%': { opacity: '0.3' },
          '46%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientX: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        borderGlow: {
          '0%, 100%': { borderColor: '#00fff5' },
          '33%': { borderColor: '#b829dd' },
          '66%': { borderColor: '#ff2d95' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        pulseRing: {
          '0%': { transform: 'scale(0.8)', opacity: '1' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'grid-pattern': 'linear-gradient(rgba(0,255,245,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,245,0.03) 1px, transparent 1px)',
      },
      backgroundSize: {
        'grid': '60px 60px',
      },
    },
  },
  plugins: [],
};
