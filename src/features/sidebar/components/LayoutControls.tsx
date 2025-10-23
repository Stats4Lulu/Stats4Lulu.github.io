import { LayoutGrid, List, Shuffle } from 'lucide-react'
import CollapsibleSection from './CollapsibleSection'
import type { SizeMode, Mode } from '@sidebar/types'
import { useMediaQuery } from 'react-responsive'

type Props = {
  currentMode: Mode
  onModeChange: (mode: Mode) => void
  sizeMode: SizeMode
  onSizeModeChange: (size: SizeMode) => void
}

export default function LayoutControls({
  currentMode,
  onModeChange,
  sizeMode,
  onSizeModeChange,
}: Props) {
  const isMobileDevice = useMediaQuery({ query: '(pointer: coarse)' })

  const sizeOptions =
    currentMode === 'VERTICAL'
      ? [
          { key: 'regularVert', label: 'S' },
          { key: 'largeVert', label: 'L' },
        ]
      : [
          { key: 'regularAlt', label: 'S' },
          { key: 'largeAlt', label: 'L' },
        ]

  const baseBtn = 'flex items-center gap-3 w-full p-3 rounded-lg transition-colors'
  const variant = (active: boolean) =>
    active
      ? 'bg-sbActive dark:bg-sbActive-dark text-sbActiveText dark:text-sbActiveText-dark'
      : 'bg-sbPassive text-sbPassiveText hover:bg-sbPassive/80 dark:bg-sbPassive-dark dark:text-sbPassiveText-dark dark:hover:bg-sbPassive-dark/80'

  return (
    <CollapsibleSection title="Layout & size" icon={<LayoutGrid size={16} />} defaultOpen={false}>
      <div className="space-y-4">
        <div>
          <label className="text-sbText dark:text-sbText-dark mb-2 block text-xs font-medium">
            Timeline layout
          </label>
          <div className="grid gap-2">
            <button
              onClick={() => onModeChange('VERTICAL')}
              aria-pressed={currentMode === 'VERTICAL'}
              className={`${baseBtn} ${variant(currentMode === 'VERTICAL')}`}
            >
              <List size={16} />
              <span className="text-sm font-medium">Standard view</span>
            </button>

            <button
              onClick={() => !isMobileDevice && onModeChange('VERTICAL_ALTERNATING')}
              aria-pressed={currentMode === 'VERTICAL_ALTERNATING'}
              disabled={isMobileDevice}
              className={`${baseBtn} ${variant(currentMode === 'VERTICAL_ALTERNATING')} ${
                isMobileDevice ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              <Shuffle size={16} />
              <span className="text-sm font-medium flex flex-col items-start">
                Zigzag view
                {isMobileDevice && (
                  <span className="opacity-70">(not available on mobile)</span>
                )}
              </span>
            </button>
          </div>
        </div>

        <div>
          <label className="text-sbText dark:text-sbText-dark mb-2 block text-xs font-medium">
            Card size
          </label>
          <div
            className={`grid gap-1 ${
              sizeOptions.length === 2 ? 'grid-cols-2' : 'grid-cols-3'
            }`}
          >
            {sizeOptions.map(({ key, label }) => (
              <button
                key={key}
                onClick={() => onSizeModeChange(key as SizeMode)}
                aria-pressed={sizeMode === key}
                className={`flex flex-col items-center gap-1 rounded-lg p-2 transition-colors ${variant(
                  sizeMode === key
                )}`}
              >
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </CollapsibleSection>
  )
}
