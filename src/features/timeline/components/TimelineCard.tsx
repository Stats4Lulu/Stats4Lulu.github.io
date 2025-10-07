import { useMemo } from 'react'
import PhotoCarousel from '../../media/components/PhotoCarousel'
import type { CardProps } from '@timeline/types'
import { sizeClasses } from './sizeClasses'

const READ_MORE_LIMIT = 200

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
  const needsReadMore =
    enableReadMore && item.events.content.length > READ_MORE_LIMIT
  const date = useMemo(
    () => (formatDate ? formatDate(item.date) : item.date),
    [formatDate, item.date],
  )

  return (
    <div
      id={`timeline-card-${item.id}`}
      onClick={onSelect}
      className={`rounded-card shadow-surface cursor-pointer transition-all duration-200 ${s.panel} ${hoverHighlight ? 'hover:shadow-surfaceHover hover:-translate-y-0.5' : ''} ${active ? 'ring-accent dark:ring-accent-dark ring-2' : ''} bg-surface dark:bg-surface-dark text-text dark:text-text-dark`}
    >
      <div className="mb-2 flex items-start justify-between">
        <p className={`text-date dark:text-date-dark ${s.date}`}>{date}</p>

        <div className="ml-4 flex flex-wrap gap-1">
          {[item.category, item.jurisdiction]
            .filter(Boolean)
            .map((label, idx) => (
              <span
                key={idx}
                className={`bg-accent dark:bg-accent-dark text-text-dark dark:text-text rounded font-medium ${s.badge}`}
              >
                {label}
              </span>
            ))}
        </div>
      </div>

      <h3 className={`text-title dark:text-title-dark ${s.title}`}>
        {item.events.title}
      </h3>

      {item.events.media?.length > 0 && (
        <PhotoCarousel
          media={item.events.media}
          title={item.events.title}
          sizeMode={size}
        />
      )}

      {item.events.subtitle && (
        <p className={`text-subtitle dark:text-subtitle-dark ${s.subtitle}`}>
          {item.events.subtitle}
        </p>
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
            className={`mt-2 hover:read ${s.sources} text-read dark:text-read-dark`}
          >
            {expanded ? 'Read less' : 'Read more'}
          </button>
        )}
      </div>

      {item.links?.length > 0 && (
        <div className="mt-3">
          <p
            className={`text-underline dark:text-underline-dark mb-1 ${s.sourceLabel}`}
          >
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
                className={`hover:links ${s.sources} text-links dark:text-links-dark`}
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
