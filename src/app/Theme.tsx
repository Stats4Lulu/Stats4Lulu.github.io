import { useEffect, useState } from 'react'

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
  const [colors, setColors] = useState<Record<string, string>>(() => JSON.parse(localStorage.getItem('theme-colors')|| 'null') || default_cols
  )

  useEffect(() => {
    Object.entries(colors).forEach(([key, value]) => document.documentElement.style.setProperty(`--${key}`, value))
    localStorage.setItem('theme-colors', JSON.stringify(colors))}, [colors])

  const update = (key: string, v: string) => setColors({ ...colors, [key]: v })
  const reset = () => setColors(default_cols)

  const light = Object.keys(default_cols).filter(k => !k.includes('dark'))
  const dark = Object.keys(default_cols).filter(k => k.includes('dark'))

  const render = (keys: string[]) =>
    keys.map(k => (
      <div key={k} className="flex items-center">
        <span className="w-32 text-l">{k}</span>
        <input type="color" value={colors[k]} onChange={ex => update(k, ex.target.value)}/>
      </div>
    ))

  return (
    <div className="border p-2 my-4 text-sm">
      <div className="flex justify-between mb-2">
        <b>Theme</b>
        <button onClick={reset} className="text-xs px-2"> Reset</button>
      </div>
      <div>
        <b className="text-xs">Light</b>{render(light)}
      </div>
      <div className="mt-2">
        <b className="text-xs">Dark</b>{render(dark)}</div>
    </div>
  )
}
