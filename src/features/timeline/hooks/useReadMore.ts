import { useState } from 'react'

export function useReadMore() {
  const [expanded, setExpandedIDs] = useState<Set<number>>(() => new Set())

  const toggle = (id: number) =>
    setExpandedIDs((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const isExpanded = (id: number) => expanded.has(id)

  return { expanded, toggle, isExpanded }
}
