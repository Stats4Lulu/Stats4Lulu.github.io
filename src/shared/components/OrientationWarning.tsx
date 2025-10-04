import { useState, useEffect } from 'react'
import { useMediaQuery } from 'react-responsive'
import { Smartphone, X } from 'lucide-react'

type Props = { mode: 'VERTICAL' | 'VERTICAL_ALTERNATING' }

export default function OrientationWarning({ mode }: Props) {
  const isMobile = useMediaQuery({ query: '(pointer: coarse)' })
  const isPortrait = useMediaQuery({ query: '(orientation: portrait)' })
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => setDismissed(false), [mode])

  const shouldShow =
    mode === 'VERTICAL_ALTERNATING' && isMobile && isPortrait && !dismissed

  if (!shouldShow) return null

  return (
    <div className="mb-4 flex items-start gap-3 rounded-lg border border-yellow-300 bg-yellow-50 p-4 text-yellow-800 transition-colors">
      <Smartphone size={20} className="mt-0.5 flex-shrink-0 text-yellow-300" />

      <div className="flex-1">
        <h3 className="mb-1 font-medium">Better viewing on landscape</h3>
        <p className="text-sm opacity-90">
          The alternating timeline layout works best in landscape orientation.
          Try rotating your phone for a better experience!
        </p>
      </div>

      <button
        onClick={() => setDismissed(true)}
        aria-label="Dismiss the warning"
        className="flex-shrink-0 rounded p-1 text-yellow-300 transition-colors hover:bg-yellow-700/40"
      >
        <X size={16} strokeWidth={2} />
      </button>
    </div>
  )
}
