import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(
    () => {
      const onScroll = () => setIsVisible(window.scrollY > 300) //300 = arbitrary; might be too low
      window.addEventListener('scroll', onScroll)
      return () => window.removeEventListener('scroll', onScroll)
    },
    [], //render once
  )

  if (!isVisible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      //reminder: z = mobile only!
      className="bg-mainScroll hover:bg-mainScroll dark:bg-mainScroll-dark fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full text-white shadow-lg transition-transform duration-300 hover:scale-110 active:scale-95"
    >
      <ArrowUp size={22} strokeWidth={2.5} />
    </button>
  )
}
