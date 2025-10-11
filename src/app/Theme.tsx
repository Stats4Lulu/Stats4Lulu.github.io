import { useEffect, useState } from 'react'
import CollapsibleSection from '@sidebar/components/CollapsibleSection'
import { PaintBucket } from 'lucide-react'

const default_cols: Record<string, string> = {
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
  'mainHeart-dark': '#9d71fbff',
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
  active: '#F97316',
  date: '#0EA5E9',
  title: '#1E293B',
  background: '#F8FAFC',
  read: '#16A34A',
  source: '#9333EA',
  links: '#2563EB',
  subtitle: '#64748B',
  rail: '#BF5B45',
  context: '#D97706',
  juris: '#DC2626',
  category: '#0891B2',
  'active-dark': '#FB923C',
  'date-dark': '#38BDF8',
  'title-dark': '#F1F5F9',
  'background-dark': '#0F172A',
  'read-dark': '#22C55E',
  'source-dark': '#A855F7',
  'links-dark': '#3B82F6',
  'subtitle-dark': '#94A3B8',
  'rail-dark': '#BF5B45',
  'context-dark': '#F59E0B',
  'juris-dark': '#EF4444',
  'category-dark': '#06B6D4',
  ringHover: '#60A5FA',
  dot: '#BF5B45',
  dotInner: '#E3C7B8',
  dotRing: '#BF5B454D',
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

}

export default function ThemeCustomizer() {
  const [colors, setColors] = useState<Record<string, string>>(
    () => JSON.parse(localStorage.getItem('theme-colors') || 'null') || default_cols
  )
  const [filter, setFilter] = useState<'all' | 'sb' | 'main' | 'photo' | 'timeline'>('all')

  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) =>
      document.documentElement.style.setProperty(`--${key}`, value)
    )
    localStorage.setItem('theme-colors', JSON.stringify(colors))
  }, [colors])

  const update = (key: string, v: string) => setColors({ ...colors, [key]: v })

  const reset = () => {
    setColors(default_cols)
    localStorage.removeItem('theme-colors')
  }

  const exportColors = () => {
    const blob = new Blob([JSON.stringify(colors, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'theme-colors.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  const renderInputRow = (label: string, key: string, val: string) => (
    <div className="flex items-center justify-between gap-2 mt-1">
      <span className="text-xs text-gray-500 truncate">{label}</span>
      <input
        type="color"
        className="w-8 h-5 border border-gray-300 rounded-sm"
        value={val}
        onChange={e => update(key, e.target.value)}
      />
    </div>
  )

  const renderPair = (baseKey: string) => {
    const darkKey = `${baseKey}-dark`
    return (
      <div key={baseKey} className="flex flex-col gap-1 py-2 px-2 border-b">
        {renderInputRow(baseKey, baseKey, colors[baseKey])}
        {darkKey in colors && renderInputRow(darkKey, darkKey, colors[darkKey])}
      </div>
    )
  }

  const filterKeys = (prefix: string) => {
    let keys: string[]
    if (prefix === 'timeline') {
      keys = Object.keys(default_cols).filter(
        k => !k.startsWith('sb') && !k.startsWith('main') && !k.startsWith('photo') && !k.includes('-dark')
      )
    } else if (prefix === 'all') {
      keys = Object.keys(default_cols).filter(k => !k.includes('-dark'))
    } else {
      keys = Object.keys(default_cols).filter(k => k.startsWith(prefix) && !k.includes('-dark'))
    }
    return keys.sort()
  }

  return (
    <div className="mb-24">
      <CollapsibleSection
        title="Theme"
        icon={<PaintBucket size={18} />}
        badge="Customize"
        defaultOpen={true}
      >
        <div className="mb-4 flex justify-between items-center">
          <div className="flex gap-2 flex-wrap">
            {['all', 'sb', 'main', 'photo', 'timeline'].map(opt => (
              <button
                key={opt}
                onClick={() => setFilter(opt as any)}
                className={`text-xs px-3 py-1 rounded-full border ${
                  filter === opt ? 'bg-gray-200 font-semibold' : 'border-gray-300'
                }`}
              >
                {opt.toUpperCase()}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button
              onClick={reset}
              className="text-xs px-3 py-1 rounded-full border border-gray-300"
            >
              Reset
            </button>
            <button
              onClick={exportColors}
              className="text-xs px-3 py-1 rounded-full border border-gray-300"
            >
              Export
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 divide-y divide-gray-200 rounded-md border border-gray-200 max-h-150 overflow-y-auto">
          {filterKeys(filter).map(k => renderPair(k))}
        </div>
      </CollapsibleSection>
    </div>
  )
}
