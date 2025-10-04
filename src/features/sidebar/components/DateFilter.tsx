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
    if (from && to)
      return `${formatDate(from, dateFormat)} – ${formatDate(to, dateFormat)}`
    if (from) return `From ${formatDate(from, dateFormat)}`
    if (to) return `Until ${formatDate(to, dateFormat)}`
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
        <div className="border-muted/40 bg-surface/60 text-text dark:border-muted-dark/40 dark:bg-surface-dark/60 dark:text-text-dark rounded-lg border p-3">
          <p className="text-sm">{showRange()}</p>{' '}
          {(dateRange.from || dateRange.to) && (
            <button
              onClick={clear}
              className="bg-accent/80 hover:bg-accent mt-2 inline-flex items-center gap-1 rounded px-2 py-1 text-xs text-white transition-colors"
            >
              <RotateCcw size={12} /> Clear filter
            </button>
          )}
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">From date</label>
          <input
            type="date"
            value={dateRange.from?.toISOString().substring(0, 10) || ''}
            min={min}
            max={max}
            onChange={(label) => handleChange('from', label.target.value)}
            className="border-muted/40 bg-background text-text focus:ring-accent dark:bg-background-dark dark:border-muted-dark/40 dark:text-text-dark w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs font-medium">To date</label>
          <input
            type="date"
            value={dateRange.from?.toISOString().substring(0, 10) || ''}
            min={min}
            max={max}
            onChange={(label) => handleChange('to', label.target.value)}
            className="border-muted/40 bg-background text-text focus:ring-accent dark:bg-background-dark dark:border-muted-dark/40 dark:text-text-dark w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-2 block text-xs font-medium">Date format</label>
          <div className="grid grid-cols-2 gap-2">
            {formatOptions.map((option) => (
              <button
                key={option.key}
                onClick={() => onDateFormatChange(option.key)}
                className={`flex flex-col items-center gap-1 rounded-lg p-3 transition-colors ${
                  dateFormat === option.key
                    ? 'bg-accent text-white'
                    : 'bg-surface text-text hover:bg-surface/80 dark:bg-surface-dark dark:text-text-dark dark:hover:bg-surface-dark/80'
                }`}
              >
                {option.icon}
                <span className="text-xs opacity-75">{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
