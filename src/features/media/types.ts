export type MediaType = 'image' | 'video' | 'youtube' | 'twitter'

export type MediaItem = {
  type: MediaType
  title: string
  url?: string
  link?: string
  sensitive?: boolean
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
  mediaTypes?: MediaType[]
}

export interface BoxProps {
  open: boolean
  images: { src: string; alt: string }[]
  startIndex: number
  onClose: () => void
}