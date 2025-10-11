import { useState } from 'react'
import type { PhotoCarouselProps, MediaItem } from '@media/types'
import MediaItemRenderer from './MediaItem'
import LightboxWrapper from './LightboxWrapper'
import Navigation from './Navigation'
import { resolveImage } from '@shared/utils/imageMap'

const SIZE_CONFIG = {
  smaller: {
    maxHeight: 'max-h-48',
    minHeight: 'min-h-32',
    container: 'max-w-md',
  },
  regular: {
    maxHeight: 'max-h-80',
    minHeight: 'min-h-48',
    container: 'max-w-2xl',
  },
  large: {
    maxHeight: 'max-h-[500px]',
    minHeight: 'min-h-64',
    container: 'max-w-4xl',
  },
}

export default function PhotoCarousel({
  media,
  className = '',
  sizeMode = 'regular',
}: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0) //img
  const [lightboxOpen, setLightboxOpen] = useState(false) //lightbox

  if (!media?.length) return null

  const resolveUrl = (item: MediaItem) =>
    item.link || resolveImage(item.url || '')
  const currentItem = {
    ...media[currentIndex],
    url: resolveUrl(media[currentIndex]),
  }

  const images = media
    .filter((item) => item.type === 'image')
    .map((item) => ({ src: resolveUrl(item), alt: item.title }))

  const mediaTypes = media.map((m) => m.type)
  const startIndex = Math.max(
    0,
    images.findIndex((img) => img.src === currentItem.url),
  )

  const navigate = (delta: number) =>
    setCurrentIndex((i) => (i + delta + media.length) % media.length)
  const handleImageClick = () => setLightboxOpen(true)
  const handleCloseLightbox = () => setLightboxOpen(false)

  return (
    <div
      className={`group bg-photoBackground dark:bg-photoBackground-dark shadow-surface relative my-3 overflow-hidden rounded-md ${className}`}
    >
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
