import YouTube from 'react-youtube'
import { TwitterTweetEmbed } from 'react-twitter-embed'
import type { MediaItem, SizeClasses } from '../types'
import { ZoomIn } from 'lucide-react'
import ContentWarning from './ContentWarning'
import { useTheme } from '@shared/hooks/useTheme'

interface Props {
  item: MediaItem
  onClickImage?: () => void
  sizeClasses: SizeClasses
}

const getYouTubeID = (url: string) => {
  try {
    const u = new URL(url)
    return u.hostname === 'youtu.be'
      ? u.pathname.slice(1)
      : u.searchParams.get('v')
  } catch {
    return null
  }
}

const getTwitterID = (url: string) => {
  try {
    const match = url.match(/(?:twitter\.com|x\.com)\/\w+\/status\/(\d+)/)
    return match?.[1] || null
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
  const { isDark } = useTheme()
  const wrap = (content: React.ReactNode) =>
    item.sensitive ? <ContentWarning>{content}</ContentWarning> : content

  if (item.type === 'image') {
    return wrap(
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

  if (item.type === 'youtube' && item.link) {
    const youtubeId = getYouTubeID(item.link)
    if (!youtubeId) return null

    return wrap(
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

  if (item.type === 'twitter' && item.link) {
    const tweetId = getTwitterID(item.link)
    if (!tweetId) return null

    return wrap(
      <div className="w-full max-w-[550px] mx-auto overflow-hidden rounded-lg flex flex-col items-center justify-center">
        <div className="w-full flex justify-center">
          <TwitterTweetEmbed
            tweetId={tweetId}
            options={{
              theme: isDark ? 'dark' : 'light',
              align: 'center',
              conversation: 'none'
            }}
          />
        </div>
      </div>
    )
  }

  if (item.type === 'video' && item.url) {
    return wrap(
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
