import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { BoxProps } from '@media/types'

export default function LightboxWrapper({
  open,
  images,
  startIndex,
  onClose,
}: BoxProps) {
  if (!open || images.length === 0) return null
  return (
    <Lightbox
      open={open}
      close={onClose}
      slides={images}
      index={startIndex}
      // ensures no button is visible when there is only 1 image,
      // a bit "over the top" but hey, it works:)
      render={{
        buttonNext: images.length <= 1 ? () => null : undefined,
        buttonPrev: images.length <= 1 ? () => null : undefined,
      }}
    />
  )
}
