export type MediaItem = {
  type: 'image' | 'video'
  title: string
  url?: string //redundant
  link?: string
}

export type SizeClasses = {
  maxHeight: string
  minHeight: string
  container: string
}

export interface PhotoCarouselProps {
  media: MediaItem[]
  title?: string
  className?: string
  sizeMode?: 'regularAlt' | 'largeAlt' | 'regularVert' | 'largeVert'
}

export interface NavProps {
  currentIndex: number
  total: number
  onPrev: () => void
  onNext: () => void
  onDotClick: (i: number) => void
  mediaTypes?: ('image' | 'video')[]
}

export interface BoxProps {
  open: boolean
  images: { src: string; alt: string }[]
  startIndex: number
  onClose: () => void
}