import { useMemo } from 'react'
import { scroller } from 'react-scroll'
import type { TimelineItem } from '@timeline/types'
import type { Mode } from '@sidebar/types'
import { parseDate } from '@shared/utils/dateUtils'

type Props = {
  items: TimelineItem[]
  mode: Mode
}

export default function MonthJump({ items, mode }: Props) {
  const months = useMemo(() => {
    const map: { [month: string]: number } = {}

    for (const item of items) {
      if (!item.date) continue

      const m = item.date.slice(0, 7)
      const timestamp = parseDate(item.date).getTime()

      if (map[m] === undefined || timestamp < map[m]) {
        map[m] = timestamp
      }
    }

    const keys = Object.keys(map).sort()

    return keys.map(m => {
      const date = new Date(map[m])
      return {
        key: m,
        label: date.toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric',
          timeZone: 'UTC'
        }),
      }
    })
  }, [items])

  const scrollToCard = (cardId: string, el: HTMLElement) => {
    const rect = el.getBoundingClientRect()
    const targetTop = rect.top + window.scrollY
    const distance = Math.abs(window.scrollY - targetTop)

    const farThreshold = window.innerHeight * 2
    const duration = distance > farThreshold ? 0 : 500

    scroller.scrollTo(cardId, {
      duration,
      smooth: duration === 0 ? undefined : 'easeInOutQuart',
      offset: -80, //tweak if needed
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = e.target.value
    if (!month) return

    const target = items.find(i => i.date?.startsWith(month))
    if (!target) return

    const cardId = `timeline-card-${target.id}`
    const el = document.getElementById(cardId) as HTMLElement | null
    if (!el) return

    //reminder; handleCardClick will *****not****** scroll because e.isTrusted === false
    el.click()

    scrollToCard(cardId, el)
  }

  if (months.length === 0) return null

  const verticalAlign =
    mode === 'VERTICAL'
      ? 'w-full max-w-2xl ml-auto justify-end'
      : 'order-2'

  return (
    <div className={`mb-4 flex items-center gap-2 text-xs sm:text-sm ${verticalAlign}`}>
      <span className="text-subtitle dark:text-subtitle-dark">Jump to month:</span>

      <select
        defaultValue=""
        onChange={handleChange}
        className="rounded-md bg-mainLinks text-white dark:bg-mainLinks-dark
                   px-2 py-1 text-xs sm:text-sm
                   focus:outline-none focus:ring-2 focus:ring-ringHover"
      >
        <option disabled>Select month</option>
        {months.map(m => (
          <option key={m.key} value={m.key}>
            {m.label}
          </option>
        ))}
      </select>
    </div>
  )
}
