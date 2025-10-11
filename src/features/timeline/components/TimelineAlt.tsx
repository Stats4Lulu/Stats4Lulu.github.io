import TimelineCard from './TimelineCard'
import { TimelineDot } from './TimelineRail'
import type { TimelineProps } from '@timeline/types'
import { sizeClasses } from './sizeClasses'

function DateLabel({
  side,
  date,
  active,
}: {
  side: 'left' | 'right'
  date: string
  active: boolean
}) {
  return (
    <div
      className={`absolute top-1/2 -translate-y-1/2 ${side === 'left' ? 'left-full ml-12' : 'right-full mr-12'} z-20 transition-all duration-300 ${
        active
          ? 'text-date dark:text-date-dark drop-shadow-date font-bold'
          : 'text-date dark:text-date-dark'
      }`}
    >
      <span className="block text-center font-semibold whitespace-nowrap">
        {date}
      </span>
    </div>
  )
}

export function TimelineAlt({
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
  const gapY = spacing.replace('space-y-', 'gap-y-') //lil bit of black magic since tailwind doesnt allow it

  return (
    <div className="relative">
      {/* black magic:) (if someone ever reads this lmao) */}
      <div
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ width: `${lineWidth}px`, top: '-60px', bottom: '-60px' }}
      >
        <div className="bg-rail dark:bg-rail-dark h-full w-full" />
      </div>
      <div
        className={`grid ${gapY}`}
        style={{ gridTemplateColumns: `1fr ${gutter}px 1fr` }}
      >
        {/* every card... */}
        {items.map((item, i) => {
          const isActive = i === activeIndex
          const isExpanded = expanded.has(i)
          const isLeft = i % 2 === 1

          const card = (
            <TimelineCard
              item={item}
              active={isActive}
              expanded={isExpanded}
              onSelect={() => onCardClick(item, i)}
              onToggleExpand={() => toggleReadMore(i)}
              size={sizeMode}
              enableReadMore={useReadMore}
              formatDate={displayDate}
              hoverHighlight={highlightCardsOnHover}
            />
          )

          return (
            <div key={item.id} className="contents">
              <div
                className={
                  isLeft ? 'relative' : 'pointer-events-none invisible'
                }
              >
                {isLeft && (
                  <>
                    {card}
                    <DateLabel
                      side="left"
                      date={displayDate(item.date)}
                      active={isActive}
                    />
                  </>
                )}
              </div>

              <div className="relative" style={{ width: `${gutter}px` }}>
                <TimelineDot
                  isActive={isActive}
                  label={item.events.title}
                  dotSize={dotSize}
                  onClick={() => onDotClick(item, i)}
                />
              </div>

              {/* rright column */}
              <div
                className={
                  isLeft ? 'pointer-events-none invisible' : 'relative'
                }
              >
                {!isLeft && (
                  <>
                    {card}
                    <DateLabel
                      side="right"
                      date={displayDate(item.date)}
                      active={isActive}
                    />
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
