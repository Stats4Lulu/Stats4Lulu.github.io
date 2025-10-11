import { RotateCcw } from 'lucide-react'

export default function ClearFiltersButton({
  onClear,
}: {
  onClear: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClear}
      className="flex w-full items-center justify-center gap-2 rounded-md bg-red-500 px-4 py-2 text-white transition-colors transition-transform duration-200 hover:bg-red-600 active:translate-y-0.5 dark:bg-red-600 dark:hover:bg-red-700"
    >
      <RotateCcw size={16} className="shrink-0" />
      <span className="text-sm font-medium" aria-label="Clear all filters">
        Clear all filters
      </span>
    </button>
  )
}