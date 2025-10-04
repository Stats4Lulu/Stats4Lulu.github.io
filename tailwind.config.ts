import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // light theme
        background: '#E8F4F0',
        surface: '#B7D5C7',
        text: '#0F221B',
        muted: '#4B6E60',
        accent: '#F46A1F',
        rail: '#F46A1F',

        // dark theme
        'background-dark': '#0E1714',
        'surface-dark': '#1C2A26',
        'text-dark': '#E7F6F1',
        'muted-dark': '#7FA997',
        'accent-dark': '#FF8439',
        'rail-dark': '#FF8439',

        // hover
        'ring-hover': '#60A5FA',

        // dot
        dot: '#BF5B45',
        'dot-inner': '#E3C7B8', 
        'dot-ring': '#BF5B454D',
      },
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        surface: '0 8px 22px #00000014',
        surfaceHover: '0 12px 34px #BF5B451F, 0 8px 22px #00000014',
        dot: '0 0 0 6px #BF5B4559',
      },
      dropShadow: {
        glow: '0 0 8px #BF5B45', // reusable glowing text or icons
      },
    },
  },
  plugins: [scrollbar],
}

export default config
