import { useEffect, useState } from 'react'
import CollapsibleSection from '@sidebar/components/CollapsibleSection'
import { PaintBucket } from 'lucide-react'

const default_cols: Record<string, string> = {
  background: '#E8F4F0',
  surface: '#B7D5C7',
  text: '#0F221B',
  muted: '#4B6E60',
  accent: '#F46A1F',
  rail: '#F46A1F',
  'background-dark': '#0E1714',
  'surface-dark': '#1C2A26',
  'text-dark': '#E7F6F1',
  'muted-dark': '#7FA997',
  'accent-dark': '#FF8439',
  'rail-dark': '#FF8439',
}

export default function ThemeCustomizer() {
  const [colors, setColors] = useState<Record<string, string>>(
    () => JSON.parse(localStorage.getItem('theme-colors') || 'null') || default_cols
  )

  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) =>
      document.documentElement.style.setProperty(`--${key}`, value)
    )
    localStorage.setItem('theme-colors', JSON.stringify(colors))
  }, [colors])

  const update = (key: string, v: string) => setColors({ ...colors, [key]: v })
  const reset = () => setColors(default_cols)

  const light = Object.keys(default_cols).filter(k => !k.includes('dark'))
  const dark = Object.keys(default_cols).filter(k => k.includes('dark'))

  const render = (keys: string[]) =>
    keys.map(k => (
      <div key={k} className="flex items-center justify-between py-2 px-2">
        <span className="w-40 text-sm font-medium">{k}</span>
        <input
          type="color"
          className="w-12 h-6 border border-gray-300 rounded"
          value={colors[k]}
          onChange={e => update(k, e.target.value)}
        />
      </div>
    ))

  return (
    <div className="mb-24">
    <CollapsibleSection
      title="Theme"
      icon={<PaintBucket size={18} />}
      badge="Customize"
      defaultOpen={true}
    >
      <div className="mb-4 flex justify-end">
        <button
          onClick={reset}
          className="text-xs px-3 py-1 rounded-full border border-gray-300"
        >
          Reset
        </button>
      </div>

      <div className="mb-5">
        <h3 className="text-xs uppercase tracking-wide mb-2">Light</h3>
        <div className="divide-y divide-gray-200 rounded-md border border-gray-200">
          {render(light)}
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-wide mb-2">Dark</h3>
        <div className="divide-y divide-gray-200 rounded-md border border-gray-200">
          {render(dark)}
        </div>
      </div>
    </CollapsibleSection>
    </div>
  )
}
