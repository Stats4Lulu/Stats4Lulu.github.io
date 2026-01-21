import { ChevronLeft, ChevronRight, Camera, Play } from 'lucide-react'
import type { NavProps } from '@media/types'

const NAV_BUTTON =
  'absolute top-1/2 -translate-y-1/2 bg-photoArrow dark:bg-photoArrow-dark text-white p-3 rounded-full ' +
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
  const isVideo = mediaType && mediaType !== 'image'
  const Icon = isVideo ? Play : Camera

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

     <div className="nav-dots absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1.5 opacity-0 transition group-hover:opacity-100">
        {Array.from({ length: total }).map((_, i) => {
          const isVideoType = mediaTypes[i] && mediaTypes[i] !== 'image'
          return (
            <button
              key={i}
              onClick={() => onDotClick(i)}
              aria-label={`Go to ${isVideoType ? 'video' : 'image'} ${i + 1}`}
              className={`h-2 w-2 rounded-full transition ${
                i === currentIndex
                  ? 'bg-photoIndexBottomActive dark:bg-photoIndexBottomActive-dark scale-125'
                  : 'bg-photoIndexBottomNonActive hover:bg-photoIndexBottomNonActive'
              } ${isVideoType ? 'rounded-sm' : ''}`}
            />
          )
        })}
      </div>

      <div className="bg-photoIndexTop dark:bg-photoIndexTop-dark absolute top-3 right-3 flex items-center gap-2 rounded-full px-3 py-2 text-xs opacity-0 transition group-hover:opacity-100">
        <Icon className="text-photoCamera dark:text-photoCamera-dark h-4 w-4" />
        <span className="text-photoText">
          {currentIndex + 1} / {total}
        </span>
      </div>  
    </>
  )
}
