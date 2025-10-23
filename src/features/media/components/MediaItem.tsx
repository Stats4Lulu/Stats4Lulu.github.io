import YouTube from 'react-youtube'
import type { MediaItem, SizeClasses } from '../types'
import { ZoomIn } from 'lucide-react'

interface Props {
  item: MediaItem
  onClickImage?: () => void
  sizeClasses: SizeClasses
}

const getYouTubeID = (url: string) => {
  try {
    const u = new URL(url)
    return u.hostname === 'youtu.be' //future-rpoof
      ? u.pathname.slice(1)
      : u.searchParams.get('v')
  } catch {
    return null
  }
}

const YOUTUBE_OPTS = { playerVars: { modestbranding: 1, rel: 0 } }

const BORDER = 'border border-muted/20'

export default function MediaItemRenderer({
  item,
  onClickImage,
  sizeClasses,
}: Props) {
  if (item.type === 'image') {
    return (
      <div className="group relative">
        <img
          src={item.url}
          alt={item.title}
          loading="lazy"
          className={`w-full rounded-lg ${BORDER} cursor-pointer object-contain transition-transform duration-200 hover:scale-105 ${sizeClasses.maxHeight}`}
          onClick={onClickImage}
        />
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
          <ZoomIn className="bg-photoZoom dark:bg-photoZoom-dark h-10 w-10 rounded-full p-2 text-white shadow-lg" />
        </div>
      </div>
    )
  }

  if (item.type === 'video') {
    if (item.link) {
      const youtubeId = getYouTubeID(item.link)
      if (!youtubeId) return null

      return (
        <div
          className={`aspect-video w-full ${sizeClasses.container} mx-auto overflow-hidden rounded-lg`}
        >
          <YouTube
            videoId={youtubeId}
            opts={YOUTUBE_OPTS}
            className="h-full w-full"
            iframeClassName="w-full h-full rounded-lg"
            onReady={(e) => e.target.pauseVideo()}
          />
        </div>
      )
    }

    // redundant but kept in for future-proofing:)
    if (item.url) {
      return (
        <video
          src={item.url}
          controls
          preload="metadata"
          className={`w-full rounded-lg ${BORDER} ${sizeClasses.maxHeight} ${sizeClasses.minHeight}`}
        >
          Your browser does not support the video tag *sadface*
        </video>
      )
    }
  }
}
