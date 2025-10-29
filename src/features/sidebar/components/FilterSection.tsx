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
      <div className="bg-sbSection/60 dark:bg-sbSection-dark/60 border-muted/40 dark:border-muted-dark/40 rounded-lg border p-4">
        <div className="mb-4 flex gap-2">
          <button
            onClick={selectAll}
            className="bg-sbSelectButton hover:bg-sbSelectButton/90 flex-1 rounded-md px-3 py-2 text-xs font-medium text-sbSelectText dark:text-sbSelectText-dark active:scale-95"
          >
            Select all
          </button>
          <button
            onClick={clearAll}
            className="bg-sbClearButton text-sbClearText hover:bg-sbClearButton/70 dark:bg-sbClearButton-dark dark:text-sbClearText-dark dark:hover:bg-sbClearButton-dark/70 flex-1 rounded-md px-3 py-2 text-xs font-medium active:scale-95"
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
                    ? 'bg-sbCheckboxFiller border-sbCheckboxFiller'
                    : 'bg-sbBackground/30 border-muted/40 hover:bg-sbBackground/50 dark:bg-sbBackground-dark/30 dark:border--dark/40 dark:hover:bg-sbBackground-dark/50'
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
                  {checked && <Check size={12} strokeWidth={3} className="text-sbCheckboxMark dark:text-sbCheckboxMark-dark" />}
                </div>
                <span
                  className={`flex-1 text-sm font-medium ${checked ? 'text-sbText' : 'text-sbText/70 dark:text-sbText-dark/70'}`}
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