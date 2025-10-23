import { useState, useCallback } from 'react'
import { useReadMore } from '@timeline/hooks/useReadMore'
import { TimelineVert } from './TimelineVert'
import { TimelineAlt } from './TimelineAlt'
import type { Timelinerops, TimelineItem } from '@timeline/types'

export default function Timeline({
  items,
  mode,
  sizeMode = 'regularAlt',
  initialActiveIndex = 0,
  onItemSelect,
  highlightOnHover = false,
  enableReadMore = false,
  searchQuery = '',
  formatDate,
}: Timelinerops) {
  const [activeIndex, setActiveIndex] = useState(initialActiveIndex)
  const { expanded, toggle } = useReadMore()

  const displayDate = useCallback(
    //reformats date
    (d: string) => formatDate?.(d) ?? d,
    [formatDate],
  )

  const selectItem = useCallback(
    (item: TimelineItem, index: number, scroll = false) => {
      setActiveIndex(index)
      onItemSelect?.(item, index)
      if (scroll) {
        document
          .getElementById(`timeline-card-${item.id}`)
          ?.scrollIntoView({ block: 'center', behavior: 'smooth' })
      }
    },
    [onItemSelect],
  )

  if (!items.length) {
    return (
      <div className="py-8 text-center">
        <p className="text-subtitle dark:text-subtitle-dark text-lg">
          {searchQuery
            ? `No results found for "${searchQuery}"`
            : 'No timeline items available'}
        </p>
      </div>
    )
  }

  const List =
    mode === 'VERTICAL' ? TimelineVert : TimelineAlt

  return (
    <List
      items={items}
      activeIndex={activeIndex}
      expanded={expanded}
      onDotClick={(item, i) => selectItem(item, i, true)}
      onCardClick={(item, i) => selectItem(item, i)}
      toggleReadMore={toggle}
      sizeMode={sizeMode}
      useReadMore={enableReadMore}
      displayDate={displayDate}
      highlightCardsOnHover={highlightOnHover}
    />
  )
}
