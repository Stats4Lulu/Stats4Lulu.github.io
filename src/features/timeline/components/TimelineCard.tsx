import { useMemo, useRef } from 'react'
import PhotoCarousel from '../../media/components/PhotoCarousel'
import type { CardProps } from '@timeline/types'
import { sizeClasses } from './sizeClasses'

const READ_MORE_LIMIT = 350
const READ_MORE_REST = 50

export default function TimelineCard({
  item,
  active = false,
  expanded = false,
  onSelect,
  onToggleExpand,
  size,
  enableReadMore = false,
  formatDate,
  hoverHighlight = false,
}: CardProps) {
  const s = sizeClasses[size]
  const cardRef = useRef<HTMLDivElement>(null)
  const carouselRef = useRef<HTMLDivElement>(null)

  const needsReadMore =
    enableReadMore && item.events.content.length > READ_MORE_LIMIT && item.events.content.length - READ_MORE_REST >= READ_MORE_LIMIT
  const date = useMemo(
    () => (formatDate ? formatDate(item.date) : item.date),
    [formatDate, item.date],
  )

  const handleCardClick = (e: React.MouseEvent) => {
    // If the click happened inside the carousel, don't scroll card to center
    if (carouselRef.current && carouselRef.current.contains(e.target as Node)) {
      return
    }

    onSelect?.()
    if (cardRef.current) {
      cardRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }

  return (
    <div
      ref={cardRef}
      id={`timeline-card-${item.id}`}
      onClick={handleCardClick}
      className={`rounded-card shadow-surface cursor-pointer transition-all duration-200 ${s.panel} ${hoverHighlight ? 'hover:shadow-surfaceHover hover:-translate-y-0.5' : ''} ${active ? 'ring-active dark:ring-active-dark ring-2' : ''} bg-background dark:bg-background-dark text-context dark:text-context-dark`}
    >
      <div className="mb-2 flex items-start justify-between gap-2">
        <p className={`text-date dark:text-date-dark whitespace-nowrap flex-shrink-0 ${s.date}`}>{date}</p>

        <div className="flex flex-wrap gap-1 justify-end min-w-0">
          {[item.category, item.jurisdiction]
            .filter(Boolean)
            .map((label, idx) => (
              <div key={idx} className="relative group">
                <span
                  className={`bg-category dark:bg-category-dark text-juris dark:text-juris-dark rounded font-medium ${s.badge}`}
                >
                  {label}
                </span>
                <div
                  className="absolute left-1/2 -translate-x-1/2 bottom-full mb-1
                             hidden group-hover:block
                             bg-gray-800 text-white text-xs rounded px-2 py-1
                             whitespace-nowrap z-10"
                >
                  {label === item.category ? 'Event Category' : label === item.jurisdiction ? 'Jurisdiction' : label}
                </div>
              </div>
            ))}
        </div>
      </div>

      <h3 className={`text-title dark:text-title-dark ${s.title}`}>
        {item.events.title}
      </h3>

      {item.events.subtitle && (
        <p className={`text-subtitle dark:text-subtitle-dark ${s.subtitle}`}>
          {item.events.subtitle}
        </p>
      )}

      {item.events.media?.length > 0 && (
        <div ref={carouselRef}>
          <PhotoCarousel
            media={item.events.media}
            title={item.events.title}
            sizeMode={size}
          />
        </div>
      )}

      <div>
        <div
          className={`${s.content} ${needsReadMore && !expanded ? 'line-clamp-3' : ''}`}
        >
          {item.events.content}
        </div>
        {needsReadMore && (
          <button
            onClick={(e) => {
              e.stopPropagation()
              onToggleExpand?.()
            }}
            className={`mt-2 hover:read ${s.sources} text-read dark:text-read-dark hover:underline`}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {item.links?.length > 0 && (
        <div className="mt-3">
          <p className="text-source dark:text-source-dark mb-1 font-semibold text-sm">
            Sources:
          </p>
          <div className="flex flex-wrap gap-2">
            {item.links.map((link, i) => (
              <a
                key={i}
                href={link.link}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className={`hover:links ${s.sources} text-links dark:text-links-dark hover:text-links/80 hover:underline`}
              >
                {link.title}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}