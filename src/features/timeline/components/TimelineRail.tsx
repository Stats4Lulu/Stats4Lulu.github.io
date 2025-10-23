import type { DotProps } from '@timeline/types'

export function TimelineDot({
  isActive,
  label,
  dotSize,
  onClick,
}: DotProps) {
  return (
    <button
      onClick={onClick}
      aria-label={`Scroll to ${label}`}
      className={`absolute top-1/2 left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-transform duration-300 hover:scale-110 ${
        isActive ? 'active-pulse' : ''
      } bg-dot dark:bg-dot-dark hover:ring-2 ring-hover focus:ring-0 focus:outline-none`}
      style={{ width: dotSize, height: dotSize }}
    >
      {isActive && (
        <div
          className="rounded-full bg-dotInner dark:bg-dotInner"
          style={{
            width: Math.max(5, dotSize * 0.7),
            height: Math.max(5, dotSize * 0.7),
          }}
        />
      )}
    </button>
  )
}