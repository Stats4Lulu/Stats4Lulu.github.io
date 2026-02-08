import { useState, useCallback } from 'react'

export function useReadMore() {
  const [expanded, setExpandedIDs] = useState<Set<number>>(() => new Set())
  const [allExpanded, setAllExpanded] = useState(false)

  const toggle = (id: number) =>
    setExpandedIDs((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })

  const isExpanded = (id: number) => expanded.has(id)

  //bandaid but it works...
  const expandAll = useCallback((itemCount: number) => {
    const allIds = new Set(Array.from({ length: itemCount }, (_, i) => i))
    setExpandedIDs(allIds)
    setAllExpanded(true)
  }, [])

  const collapseAll = useCallback(() => {
    setExpandedIDs(new Set())
    setAllExpanded(false)
  }, [])

  const toggleAll = useCallback((itemCount: number) => {
    if (allExpanded) {
      collapseAll()
    } else {
      expandAll(itemCount)
    }
  }, [allExpanded, expandAll, collapseAll])

  return { expanded, toggle, isExpanded, expandAll, collapseAll, toggleAll, allExpanded }
}
