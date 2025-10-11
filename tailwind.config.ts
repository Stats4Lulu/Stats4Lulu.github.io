import type { Config } from 'tailwindcss'
import scrollbar from 'tailwind-scrollbar'

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        mainBackground: '#F8FAFC',
        mainTitle: '#0F172A',
        mainLinks: '#CBD5E1',
        mainText: '#1E293B',
        mainScroll: '#64748B',
        mainHeart: '#E11D48',

        'mainBackground-dark': '#0F172A',
        'mainTitle-dark': '#F1F5F9',
        'mainLinks-dark': '#334155',
        'mainText-dark': '#E2E8F0',
        'mainScroll-dark': '#94A3B8',
        'mainHeart-dark': '#FB7185',

        photoZoom: '#22c55e',
        photoCamera: '#f97316',
        photoArrow: '#9d71fbff',
        photoIndexTop: '#0f172a',
        photoBackground: '#f8fafc',
        photoIndexBottomActive: '#9d71fbff',
        photoIndexBottomNonActive: '#cbd5e1',
        photoText: '#1e293b',

        'photoZoom-dark': '#4ade80',
        'photoCamera-dark': '#fb923c',
        'photoArrow-dark': '#c4a2ff',
        'photoIndexTop-dark': '#e2e8f0',
        'photoBackground-dark': '#0f172a',
        'photoIndexBottomActive-dark': '#c4a2ff',
        'photoIndexBottomNonActive-dark': '#475569',
        'photoText-dark': '#f1f5f9',

        active: '#F97316',       // bright orange
        date: '#0EA5E9',         // sky blue
        title: '#1E293B',        // slate gray
        background: '#F8FAFC',   // off white
        read: '#16A34A',         // green
        source: '#9333EA',       // purple
        links: '#2563EB',        // deep blue
        subtitle: '#64748B',     // muted slate
        rail: '#BF5B45',         // your given brick red
        context: '#D97706',      // amber
        juris: '#DC2626',        // red
        category: '#0891B2',     // cyan

        ringHover: '#60A5FA',
        dot: '#BF5B45',
        dotInner: '#E3C7B8',
        dotRing: '#BF5B454D',

        'active-dark': '#FB923C',       // softer orange
        'date-dark': '#38BDF8',         // bright sky
        'title-dark': '#F1F5F9',        // near white
        'background-dark': '#0F172A',   // deep navy
        'read-dark': '#22C55E',         // green
        'source-dark': '#A855F7',       // purple
        'links-dark': '#3B82F6',        // blue
        'subtitle-dark': '#94A3B8',     // lighter slate
        'rail-dark': '#BF5B45',
        'context-dark': '#F59E0B',      // amber
        'juris-dark': '#EF4444',        // brighter red
        'category-dark': '#06B6D4',     // cyan

        'ringHover-dark': '#60A5FA',
        'dot-dark': '#BF5B45',
        'dotInner-dark': '#E3C7B8',
        'dotRing-dark': '#BF5B454D',

        sbBackground: '#F8FAFC',
        sbIcon: '#475569',
        sbText: '#334155',
        sbTitle: '#0F172A',
        sbSection: '#E2E8F0',
        sbHover: '#F97316',
        sbSelectButton: '#CBD5E1',
        sbClearButton: '#E11D48',
        sbSelectText: '#0F766E',
        sbClearText: '#FFFFFF',
        sbCheckboxMark: '#CA8A04',
        sbCheckboxOutline: '#F59E0B',
        sbCheckboxFiller: '#F1F5F9',
        sbActive: '#2563EB',
        sbPassive: '#A1A1AA',
        sbActiveText: '#FFFFFF',
        sbPassiveText: '#475569',

        'sbBackground-dark': '#0F172A',
        'sbIcon-dark': '#94A3B8',
        'sbText-dark': '#E2E8F0',
        'sbTitle-dark': '#F8FAFC',
        'sbSection-dark': '#1E293B',
        'sbHover-dark': '#FB923C',
        'sbSelectButton-dark': '#334155',
        'sbClearButton-dark': '#BE123C',
        'sbSelectText-dark': '#2DD4BF',
        'sbClearText-dark': '#F8FAFC',
        'sbCheckboxMark-dark': '#EAB308',
        'sbCheckboxOutline-dark': '#FACC15',
        'sbCheckboxFiller-dark': '#1E293B',
        'sbActive-dark': '#3B82F6',
        'sbPassive-dark': '#64748B',
        'sbActiveText-dark': '#0F172A',
        'sbPassiveText-dark': '#CBD5E1',

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
        glow: '0 0 8px #BF5B45',
      },
    },
  },
  plugins: [scrollbar],
}

export default config
