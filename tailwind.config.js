/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        tokora: {
          blue: '#1E90FF',
          cyan: '#00FFFF',
          gold: '#FFD700',
          purple: '#8A2BE2',
          pink: '#FF1493',
          red: '#DC143C',
          green: '#32CD32',
          black: '#080810',
          grey: '#A9A9A9',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'cyber-grid': 'linear-gradient(transparent 0%, rgba(30, 144, 255, 0.1) 2%), linear-gradient(to right, transparent 0%, rgba(30, 144, 255, 0.1) 2%)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'glow-slow': 'glow-slow 3s ease-in-out infinite alternate',
        'float': 'float 3s ease-in-out infinite',
        'bounce': 'bounce 2s infinite',
        'scale': 'scale 1s ease-out',
        'pulse': 'pulse 4s ease-in-out infinite',
      },
      keyframes: {
        glow: {
          '0%': { textShadow: '0 0 5px #1E90FF, 0 0 10px #1E90FF, 0 0 15px #1E90FF' },
          '100%': { textShadow: '0 0 10px #00FFFF, 0 0 20px #00FFFF, 0 0 30px #00FFFF' },
        },
        'glow-slow': {
          '0%': { 
            boxShadow: '0 0 5px rgba(234, 179, 8, 0.5), 0 0 10px rgba(234, 179, 8, 0.5), 0 0 15px rgba(234, 179, 8, 0.5)',
            borderColor: 'rgba(234, 179, 8, 0.6)'
          },
          '100%': { 
            boxShadow: '0 0 10px rgba(234, 179, 8, 0.8), 0 0 20px rgba(234, 179, 8, 0.8), 0 0 30px rgba(234, 179, 8, 0.8)',
            borderColor: 'rgba(234, 179, 8, 0.9)'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        bounce: {
          '0%, 100%': { transform: 'translateY(-5%)' },
          '50%': { transform: 'translateY(5%)' },
        },
        scale: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        pulse: {
          '0%, 100%': { opacity: '0.1' },
          '50%': { opacity: '0.3' },
        },
      },
    },
  },
  plugins: [],
};