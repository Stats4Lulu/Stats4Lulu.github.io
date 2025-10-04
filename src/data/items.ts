import type { TimelineItem } from '@timeline/types'

export function cleanItems(raw: unknown): TimelineItem[] {
  const seen = new Set<number>()
  const deduped: TimelineItem[] = []

  for (const item of raw as TimelineItem[]) {
    if (!item?.id || !item?.date || !item?.events?.title) continue
    if (seen.has(item.id)) {
      console.warn(`Duplicate id dropped: ${item.id}`, item)
      continue
    }
    seen.add(item.id)
    deduped.push(item)
  }

  return deduped
}

