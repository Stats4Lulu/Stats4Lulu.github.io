import { useCallback } from 'react'

export const scrollToCenter = () => {
  const scrollToCenter = useCallback((elementId: string) => {
    const el = document.getElementById(elementId)
    if (!el) return

    const rect = el.getBoundingClientRect()
    const height = window.innerHeight
    const elCenterY = rect.top + window.scrollY + rect.height / 2
    const targetY = Math.max(0, elCenterY - height / 2)

    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }, [])

  return { scrollToCenter }
}
