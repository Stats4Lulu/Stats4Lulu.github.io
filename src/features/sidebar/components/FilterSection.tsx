import { Check } from 'lucide-react'
import CollapsibleSection from './CollapsibleSection'

type FilterProps = {
  title: string
  icon: React.ReactNode
  items: string[]
  selected: Record<string, boolean>
  onChange: (next: Record<string, boolean>) => void
}

export default function FilterSection({
  title,
  icon,
  items,
  selected,
  onChange,
}: FilterProps) {
  const toggle = (name: string) =>
    onChange({ ...selected, [name]: !selected[name] })
  const selectAll = () =>
    onChange(Object.fromEntries(items.map((i) => [i, true])))
  const clearAll = () =>
    onChange(Object.fromEntries(items.map((i) => [i, false])))

  const count = Object.values(selected).filter(Boolean).length

  return (
    <CollapsibleSection
      title={title}
      icon={icon}
      badge={`${count}/${items.length}`}
      defaultOpen
    >
      <div className="bg-surface/60 dark:bg-surface-dark/60 border-muted/40 dark:border-muted-dark/40 rounded-lg border p-4">
        <div className="mb-4 flex gap-2">
          <button
            onClick={selectAll}
            className="bg-accent hover:bg-accent/90 flex-1 rounded-md px-3 py-2 text-xs font-medium text-white active:scale-95"
          >
            Select all
          </button>
          <button
            onClick={clearAll}
            className="bg-muted text-text hover:bg-muted/70 dark:bg-muted-dark dark:text-text-dark dark:hover:bg-muted-dark/70 flex-1 rounded-md px-3 py-2 text-xs font-medium active:scale-95"
          >
            Clear all
          </button>
        </div>
        <div className="max-h-48 space-y-2 overflow-y-auto pr-2">
          {items.map((i) => {
            const checked = selected[i] ?? false
            return (
              <label
                key={i}
                className={`flex cursor-pointer items-center gap-3 rounded-lg border p-3 transition-colors ${
                  checked
                    ? 'bg-accent/10 border-accent'
                    : 'bg-background/30 border-muted/40 hover:bg-background/50 dark:bg-background-dark/30 dark:border-muted-dark/40 dark:hover:bg-background-dark/50'
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggle(i)}
                  className="sr-only"
                />
                <div
                  className={`flex h-4 w-4 items-center justify-center rounded border-2 transition-colors ${checked ? 'bg-accent border-accent' : 'border-muted bg-transparent'}`}
                >
                  {checked && <Check size={12} className="text-white" />}
                </div>
                <span
                  className={`flex-1 text-sm font-medium ${checked ? 'text-accent' : 'text-text/70 dark:text-text-dark/70'}`}
                >
                  {i || 'No label'}
                </span>
              </label>
            )
          })}
        </div>
      </div>
    </CollapsibleSection>
  )
}
