import { ChevronLeft, ChevronRight, Camera, Play } from 'lucide-react'
import type { NavProps } from '@media/types'

const NAV_BUTTON =
  'absolute top-1/2 -translate-y-1/2 bg-accent dark:bg-accent-dark text-white p-3 rounded-full ' +
  'opacity-0 group-hover:opacity-100 transition hover:scale-110'

export default function Navigation({
  currentIndex,
  total,
  onPrev,
  onNext,
  onDotClick,
  mediaTypes = [],
}: NavProps) {
  const mediaType = mediaTypes[currentIndex]
  const Icon = mediaType === 'video' ? Play : Camera

  return (
    <>
      {currentIndex > 0 && (
        <button
          onClick={onPrev}
          aria-label="Previous entry"
          className={`${NAV_BUTTON} left-3`}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      )}

      {currentIndex < total - 1 && (
        <button
          onClick={onNext}
          aria-label="Next entry"
          className={`${NAV_BUTTON} right-3`}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 opacity-0 transition group-hover:opacity-100">
        {Array.from({ length: total }).map((_, i) => {
          const isVideo = mediaTypes[i] === 'video'
          return (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              aria-label={`Go to ${isVideo ? 'video' : 'image'} ${i + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                i === currentIndex
                  ? 'bg-accent dark:bg-accent-dark scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              } ${isVideo ? 'rounded-sm' : ''}`}
            />
          )
        })}
      </div>

      <div className="bg-surface/90 dark:bg-surface-dark/90 absolute top-3 right-3 flex items-center gap-2 rounded-full px-3 py-2 text-xs opacity-0 transition group-hover:opacity-100">
        <Icon className="text-accent dark:text-accent-dark h-4 w-4" />
        <span>
          {currentIndex + 1} / {total}
        </span>
      </div>
    </>
  )
}
