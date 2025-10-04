import type { DateRange, DateFormat } from '@sidebar/types'

export const parseDate = (dateString: string): Date =>
  isNaN(new Date(dateString).getTime()) ? new Date() : new Date(dateString)

export function isDateInRange(
  dateStr: string,
  { from, to }: DateRange,
): boolean {
  const date = parseDate(dateStr)
  if (from && date < from) return false
  if (to && date > to) return false
  return true
}

export const isBeforeMin = (dateStr: string, min: string | Date): boolean => {
  const date = parseDate(dateStr)
  const m = typeof min === 'string' ? parseDate(min) : min
  return date < m
}

export function formatDate(
  dateStr: string | Date,
  format: DateFormat = 'MM/DD/YYYY',
): string {
  const d = typeof dateStr === 'string' ? parseDate(dateStr) : dateStr
  const day = d.getDate().toString().padStart(2, '0')
  const month = (d.getMonth() + 1).toString().padStart(2, '0')
  const year = d.getFullYear()
  return format === 'DD/MM/YYYY'
    ? `${day}/${month}/${year}`
    : `${month}/${day}/${year}`
}

export function getDateBounds(items: Array<{ date: string }>) {
  if (!items.length) return { min: '', max: '' }
  const timestamps = items.map((i) => parseDate(i.date).getTime())
  return {
    min: new Date(Math.min(...timestamps)).toISOString().split('T')[0],
    max: new Date(Math.max(...timestamps)).toISOString().split('T')[0],
  }
}
