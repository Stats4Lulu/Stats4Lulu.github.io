import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Sun, Moon } from 'lucide-react'

export default function ThemeToggle({
  toggleTheme,
}: {
  toggleTheme: () => void
}) {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains('dark'))
    const observer = new MutationObserver(() =>
      setIsDark(document.documentElement.classList.contains('dark')),
    )
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    })
    return () => observer.disconnect()
  }, [])

  return (
    <motion.button
      onClick={toggleTheme}
      className="bg-sbSection text-sbText hover:bg-sbBackground dark:bg-sbSection-dark dark:text-sbText-dark dark:hover:bg-sbBackground-dark flex w-full items-center gap-3 rounded-lg p-4 transition-colors duration-200"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <motion.div
        animate={{ rotate: isDark ? 180 : 0 }}
        transition={{ duration: 0.4 }}
      >
        {isDark ? (
          <Sun size={20} className="text-accent" />
        ) : (
          <Moon size={20} className="text-accent" />
        )}
      </motion.div>

      <div className="text-left">
        <div className="text-sm font-semibold">
          {isDark ? 'Light mode' : 'Dark mode'}
        </div>
        <div className="text-sbText dark:text-sbText-dark text-xs opacity-75">
          {isDark ? 'Click to switch to light' : 'Click to switch to dark'}
        </div>
      </div>
    </motion.button>
  )
}