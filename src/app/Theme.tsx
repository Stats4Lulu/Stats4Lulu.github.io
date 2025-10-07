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
  date: '#4B6E60',
  title: '#F46A1F',
  subtitle: '#35584D',
  read: '#F46A1F',
  links: '#4B6E60',
  underline: '#F46A1F',
  'background-dark': '#0E1714',
  'surface-dark': '#1C2A26',
  'text-dark': '#E7F6F1',
  'muted-dark': '#7FA997',
  'accent-dark': '#FF8439',
  'rail-dark': '#FF8439',
  'date-dark': '#7FA997',
  'title-dark': '#FF8439',
  'subtitle-dark': '#9CBFB2',
  'read-dark': '#FF8439',
  'links-dark': '#9CBFB2',
  'underline-dark': '#FF8439',
  ringHover: '#60A5FA',
  dot: '#BF5B45',
  dotInner: '#E3C7B8',
  dotRing: '#BF5B454D',
}

const descriptions: Record<string, string> = {
  background: 'Page background',
  surface: 'Card and sidebar surfaces',
  text: 'Main text color',
  muted: '"Clear all" filter buttons',
  accent: 'Primary accent (category tags and buttons in sidebar)',
  rail: 'Timeline rail',
  date: 'Event date text',
  title: 'Event title',
  subtitle: 'Event subtitle',
  read: '“Read more” button',
  links: 'Color of hyperlinks (sources)',
  underline: 'Color of "Sources" text',
  dot: 'Passive timeline dot',
  dotInner: 'Active dot inner ring',
  dotRing: 'Active dot outer ring',
  ringHover: 'Active hover ring color'
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

  const light = Object.keys(default_cols).filter(
    k => !k.includes('dark') && !['dot', 'dotInner', 'dotRing', 'ringHover'].includes(k)
  )
  const dark = Object.keys(default_cols).filter(k => k.includes('dark'))
  const dots = ['dot', 'dotInner', 'dotRing', 'ringHover']

  const render = (keys: string[]) =>
    keys.map(k => (
      <div key={k} className="flex flex-col gap-1 py-1 px-1 text-xs">
        <div className="flex items-center justify-between">
          <span className="w-28 truncate">{k}</span>
          <input
            type="color"
            className="w-8 h-5 border border-gray-300 rounded-sm"
            value={colors[k]}
            onChange={e => update(k, e.target.value)}
          />
        </div>
        {descriptions[k] && (
          <span className="text-[10px] text-gray-500 truncate">{descriptions[k]}</span>
        )}
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
          <h3 className="text-[10px] uppercase tracking-wide mb-2 text-gray-600">
            Light
          </h3>
          <div className="grid grid-cols-2 divide-y divide-gray-200 rounded-md border border-gray-200">
            {render(light)}
          </div>
        </div>

        <div className="mb-5">
          <h3 className="text-[10px] uppercase tracking-wide mb-2 text-gray-600">
            Dark
          </h3>
          <div className="grid grid-cols-2 divide-y divide-gray-200 rounded-md border border-gray-200">
            {render(dark)}
          </div>
        </div>

        <div>
          <h3 className="text-[10px] uppercase tracking-wide mb-2 text-gray-600">
            Dots
          </h3>
          <div className="grid grid-cols-2 divide-y divide-gray-200 rounded-md border border-gray-200">
            {render(dots)}
          </div>
        </div>
      </CollapsibleSection>
    </div>
  )
}
