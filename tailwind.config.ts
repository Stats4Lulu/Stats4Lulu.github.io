import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      borderRadius: {
        card: '12px',
      },
      boxShadow: {
        surface: '0 8px 22px #00000014',
        surfaceHover: '0 12px 34px #BF5B451F, 0 8px 22px #00000014',
        dot: '0 0 0 6px #BF5B4559',
      },
      dropShadow: {
        glow: '0 0 8px #BF5B45',
      },
      fontFamily: {
        title: ['"Courier New"', 'Courier', 'monospace'],
      },
    },
  },
  plugins: [scrollbar],
}

export default config
