import { useState, useRef, useEffect } from 'react'
import { useSwipeable } from 'react-swipeable'
import type { PhotoCarouselProps, MediaItem } from '@media/types'
import MediaItemRenderer from './MediaItem'
import LightboxWrapper from './LightboxWrapper'
import Navigation from './Navigation'
import { resolveImage } from '@shared/utils/imageMap'

const SIZE_CONFIG = {
  regularAlt: {
    maxHeight: 'max-h-[55vh] sm:max-h-48',
    minHeight: 'min-h-40 sm:min-h-32',
    container: 'w-full sm:max-w-md',
  },
  largeAlt: {
    maxHeight: 'max-h-[60vh] sm:max-h-80',
    minHeight: 'min-h-48',
    container: 'w-full sm:max-w-2xl',
  },
  regularVert: {
    maxHeight: 'max-h-[60vh] sm:max-h-80',
    minHeight: 'min-h-48',
    container: 'w-full sm:max-w-2xl',
  },
  largeVert: {
    maxHeight: 'max-h-[70vh] sm:max-h-[500px]',
    minHeight: 'min-h-56 sm:min-h-64',
    container: 'w-full sm:max-w-4xl',
  },
}


export default function PhotoCarousel({
  media,
  className = '',
  sizeMode = 'regularVert',
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [uiVisible, setUiVisible] = useState(false)
  const hideTimer = useRef<number | null>(null)

  if (!media?.length) return null

  const resolveUrl = (item: MediaItem) => item.link || resolveImage(item.url || '')
  const currentItem = { ...media[currentIndex], url: resolveUrl(media[currentIndex]) }

  const images = media
    .filter((item) => item.type === 'image')
    .map((item) => ({ src: resolveUrl(item), alt: item.title }))

  const mediaTypes = media.map((m) => m.type)
  const startIndex = Math.max(0, images.findIndex((img) => img.src === currentItem.url))

  const navigate = (delta: number) =>
    setCurrentIndex((i) => (i + delta + media.length) % media.length)

  const handleImageClick = () => setLightboxOpen(true)
  const handleCloseLightbox = () => setLightboxOpen(false)

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => navigate(1),
    onSwipedRight: () => navigate(-1),
    preventScrollOnSwipe: true,
    trackTouch: true,
  })

  const revealUi = () => {
    setUiVisible(true)
    if (hideTimer.current) window.clearTimeout(hideTimer.current)
    hideTimer.current = window.setTimeout(() => setUiVisible(false), 2500)
  }

  useEffect(() => {
    return () => hideTimer.current && window.clearTimeout(hideTimer.current)
  }, [])

  return (
    <div
      className={`media-nav group relative my-3 overflow-hidden rounded-md bg-photoBackground dark:bg-photoBackground-dark shadow-surface ${className} ${
        uiVisible ? 'ui-visible' : ''
      }`} onClick={revealUi} {...swipeHandlers} >
      <MediaItemRenderer
        item={currentItem}
        sizeClasses={SIZE_CONFIG[sizeMode]}
        onClickImage={handleImageClick}
      />

      <Navigation
        currentIndex={currentIndex}
        total={media.length}
        onPrev={() => navigate(-1)}
        onNext={() => navigate(1)}
        onDotClick={setCurrentIndex}
        mediaTypes={mediaTypes}
      />

      <LightboxWrapper
        open={lightboxOpen}
        images={images}
        startIndex={startIndex}
        onClose={handleCloseLightbox}
      />
    </div>
  )
}
