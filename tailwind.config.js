/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          950: '#070b14',
          900: '#0b1324',
          850: '#101a30',
          800: '#162340',
          750: '#1e2f54',
          700: '#273c68'
        },
        aws: {
          gold: '#ff9900',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          sky: '#0284c7',
          emerald: '#10b981',
          purple: '#8b5cf6',
          rose: '#f43f5e'
        }
      },
      backgroundImage: {
        'mesh-glow': 'radial-gradient(at 0% 0%, rgba(245, 158, 11, 0.15) 0px, transparent 50%), radial-gradient(at 100% 0%, rgba(6, 182, 212, 0.15) 0px, transparent 50%), radial-gradient(at 50% 100%, rgba(139, 92, 246, 0.12) 0px, transparent 50%)',
      },
      boxShadow: {
        'glow-gold': '0 0 25px -5px rgba(245, 158, 11, 0.4)',
        'glow-cyan': '0 0 25px -5px rgba(6, 182, 212, 0.4)',
        'glow-purple': '0 0 25px -5px rgba(139, 92, 246, 0.4)',
        'glow-card': '0 10px 30px -10px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255, 255, 255, 0.08)',
      }
    },
  },
  plugins: [],
}
