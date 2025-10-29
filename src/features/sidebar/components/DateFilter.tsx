import { RotateCcw, CalendarDays, Globe, CupSoda } from 'lucide-react'
import CollapsibleSection from './CollapsibleSection'
import type { DateRange, DateFormat } from '../types'
import { getDateBounds, formatDate } from '@shared/utils/dateUtils'

type Props = {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  dateFormat: DateFormat
  onDateFormatChange: (format: DateFormat) => void
  items: Array<{ date: string }>
}

export default function DateFilter({
  dateRange,
  onDateRangeChange,
  dateFormat,
  onDateFormatChange,
  items,
}: Props) {
  const { min, max } = getDateBounds(items)

  const showRange = () => {
    const { from, to } = dateRange
    if (from && to) return `${formatDate(from)} – ${formatDate(to)}`
    if (from) return `From ${formatDate(from)}`
    if (to) return `Until ${formatDate(to)}`
    return 'No date selected'
  }

  const handleChange = (type: 'from' | 'to', value: string) =>
    onDateRangeChange({
      ...dateRange,
      [type]: value ? new Date(value) : undefined,
    })
  const clear = () => onDateRangeChange({})

  const formatOptions = [
    { key: 'DD/MM/YYYY', label: 'DD/MM/YYYY', icon: <Globe size={16} /> },
    { key: 'MM/DD/YYYY', label: 'MM/DD/YYYY', icon: <CupSoda size={16} /> },
  ] as const

  return (
    <CollapsibleSection title="Date filter" icon={<CalendarDays size={16} />}>
      <div className="space-y-4">
        <div className="border-sbIcon/40 bg-sbSection/60 text-sbText dark:border-sbIcon-dark/40 dark:bg-sbSection-dark/60 dark:text-sbText-dark rounded-lg border p-3">
          <p className="text-sm">{showRange()}</p>
          {(dateRange.from || dateRange.to) && (
            <button
              onClick={clear}
              className="bg-red-600 dark:bg-red-800 text-white dark:text-black hover:bg-accent mt-2 inline-flex items-center gap-1 rounded px-2 py-1 text-xs transition-colors"
            >
              <RotateCcw size={12} /> Clear filter
            </button>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sbText dark:text-sbText-dark text-xs font-medium">From date</label>
          <input
            type="date"
            value={dateRange.from?.toISOString().substring(0, 10) || ''}
            min={min}
            max={dateRange.to?.toISOString().substring(0, 10) || max}
            onChange={(e) => handleChange('from', e.target.value)}
            className="border-muted/40 bg-sbBackground text-sbText focus:ring-sbActive dark:bg-sbBackground-dark dark:border-muted-dark/40 dark:text-sbText-dark w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sbText dark:text-sbText-dark text-xs font-medium">To date</label>
          <input
            type="date"
            value={dateRange.to?.toISOString().substring(0, 10) || ''}
            min={dateRange.from?.toISOString().substring(0, 10) || min}
            max={max}
            onChange={(e) => handleChange('to', e.target.value)}
            className="border-sbIcon/40 bg-sbBackground text-sbText focus:ring-sbActive dark:bg-sbBackground-dark dark:border-muted-dark/40 dark:text-sbText-dark w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>
      </div>
    </CollapsibleSection>
  )
}