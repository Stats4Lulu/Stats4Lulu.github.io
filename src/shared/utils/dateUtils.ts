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

export function formatDate(dateStr: string | Date): string {
  const date = typeof dateStr === 'string' ? new Date(dateStr) : dateStr;
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: '2-digit',
    timeZone: 'UTC'
  });
}

export function getDateBounds(items: Array<{ date: string }>) {
  if (!items.length) return { min: '', max: '' }
  const timestamps = items.map((i) => parseDate(i.date).getTime())
  return {
    min: new Date(Math.min(...timestamps)).toISOString().split('T')[0],
    max: new Date(Math.max(...timestamps)).toISOString().split('T')[0],
  }
}
