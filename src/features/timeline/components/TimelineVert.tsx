import TimelineCard from './TimelineCard'
import { TimelineDot } from './TimelineRail'
import type { TimelineProps } from '@timeline/types'
import { sizeClasses } from './sizeClasses'

export function TimelineVert({
  items,
  activeIndex,
  expanded,
  onDotClick,
  onCardClick,
  toggleReadMore,
  sizeMode,
  useReadMore,
  displayDate,
  highlightCardsOnHover,
}: TimelineProps) {
  const { gutter, dotSize, lineWidth, spacing } = sizeClasses[sizeMode]

  return (
    <div className="relative pl-0">
      <div
        className="pointer-events-none absolute"
        //keeps dot on the railing
        style={{
          left: `${gutter / 2}px`,
          width: `${lineWidth}px`,
          top: '-60px',
          bottom: '-60px',
        }}
      >
        <div className="bg-rail dark:bg-rail-dark h-full w-full" />
      </div>

      <div className={spacing}>
        {items.map((item, i) => {
          const isActive = i === activeIndex
          const isExpanded = expanded.has(i)

          return (
            <div key={item.id} className="flex items-center gap-4">
              <div
                className="relative flex shrink-0 items-center"
                style={{ width: `${gutter}px`, minHeight: '100px' }}
              >
                <TimelineDot
                  label={item.events.title}
                  dotSize={dotSize}
                  onClick={() => onDotClick(item, i)}
                  isActive={isActive}
                />
              </div>

              <div
                className={`flex-1 ${highlightCardsOnHover ? 'hover:-translate-y-0.5' : ''}`}
              >
                <TimelineCard
                  item={item}
                  active={isActive}
                  expanded={isExpanded}
                  size={sizeMode}
                  onSelect={() => onCardClick(item, i)}
                  onToggleExpand={() => toggleReadMore(i)}
                  formatDate={displayDate}
                  enableReadMore={useReadMore}
                  hoverHighlight={highlightCardsOnHover}
                />
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
