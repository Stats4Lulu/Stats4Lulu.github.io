import { useState, type PropsWithChildren, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface Props extends PropsWithChildren {
  title: string
  icon: ReactNode
  badge?: string
  defaultOpen?: boolean
}

export default function CollapsibleSection({
  title,
  icon,
  badge,
  children,
  defaultOpen = true,
}: Props) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        aria-controls={`section-${title}`}
        className="bg-sbSection text-sbText hover:bg-sbSection/80 dark:bg-sbSection-dark dark:text-sbText-dark dark:hover:bg-sbSection-dark/80 flex w-full items-center justify-between rounded-lg p-3 transition-colors duration-200"
      >
        <div className="flex items-center gap-3">
          <div className="text-sbActive">{icon}</div>
          <span className="text-sm font-semibold">{title}</span>
        </div>

        <div className="flex items-center gap-2">
          {badge && (
            <span className="bg-sbIcon/20 text-sbText dark:bg-sbDark-dark/40 dark:text-sbText-dark rounded-full px-2 py-0.5 text-xs font-medium">
              {badge}
            </span>
          )}
          <ChevronDown
            size={16}
            className={`transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      <div
        id={`section-${title}`}
        className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        {children}
      </div>
    </div>
  )
}