import { X } from 'lucide-react'
import type { Mode } from '@sidebar/types'

interface Props {
  isFiltered: boolean
  visibleCount: number
  totalCount: number
  clearAllFilters: () => void
  mode: Mode
}

export default function FilterStatusBar({
  isFiltered,
  visibleCount,
  totalCount,
  clearAllFilters,
  mode,
}: Props) {
  if (!isFiltered) return null

  const button = (
    <button
      onClick={clearAllFilters}
      className="flex items-center gap-2 rounded-lg bg-red-500 px-3 py-1.5 text-sm font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-red-600"
      aria-label="Clear all filters"
    >
      <X size={16} strokeWidth={2} /> Clear all filters
    </button>
  )

  const count = (
    <span>
      Showing {visibleCount} of {totalCount} items
    </span>
  )

  const layout =
    mode === 'VERTICAL'
      ? 'w-full max-w-2xl ml-auto justify-end' //right
      : mode === 'VERTICAL_ALTERNATING'
        ? 'order-2'
        : '' //left

  const children =
    mode === 'VERTICAL_ALTERNATING' ? [button, count] : [count, button]

  return (
    <div
      className={`text-muted dark:text-muted-dark mb-3 flex items-center gap-3 text-sm ${layout}`}
    >
      {children}
    </div>
  )
}
