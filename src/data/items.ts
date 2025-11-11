import type { CardLinks, TimelineItem } from '@timeline/types'

export function cleanItems(raw: unknown): TimelineItem[] {
  const seen = new Set<number>()
  const deduped: TimelineItem[] = []

  for (const item of raw as TimelineItem[]) {
    if (!item?.id || !item?.date || !item?.events?.title) continue
    if (seen.has(item.id)) {
      console.warn(`Duplicate id dropped: ${item.id}`, item)
      continue
    }
    if (!item.category) item.category = 'N/A'
    if (!item.jurisdiction) item.jurisdiction = 'N/A'
    seen.add(item.id)
    deduped.push(item)
  }

  return deduped
}

export function cleanLinkItems(raw: any[]): CardLinks[] {
  return raw.map(card => ({
    buttonColor: card.buttonColor,
    sections: card.sections.map((section: any) => ({
      name: section.name,
      links: section.links.map((linkArr: [string, string]) => ({
        text: linkArr[0],
        link: linkArr[1],
      })),
    })),
  }));
}
