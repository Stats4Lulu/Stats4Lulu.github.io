import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactGA from "react-ga4"

export default function CookieBanner() {
  const [accepted, setAccepted] = useState(
    localStorage.getItem("cookie_consent") === "true"
  )
  const [visible, setVisible] = useState(!accepted)
  
  useEffect(() => {
    if (import.meta.env.MODE !== "production") return

    if (accepted) {
      ReactGA.initialize("G-7J4LDXCZJF")
      ReactGA.send("pageview")
    }
  }, [accepted])

  const acceptCookies = () => {
    localStorage.setItem("cookie_consent", "true")
    setAccepted(true)
    setVisible(false)
    ReactGA.initialize("G-7J4LDXCZJF")
    ReactGA.send("pageview")
  }

  const declineCookies = () => {
    localStorage.setItem("cookie_consent", "false")
    setVisible(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.4 }}
          className="fixed bottom-4 left-1/2 z-50 max-w-sm sm:max-w-md -translate-x-1/2 rounded-xl bg-mainLinks text-white shadow-lg px-5 py-4 dark:bg-mainLinks-dark">
          <p className="text-sm font-medium text-center sm:text-left">
            We use anonymous cookies (Google Analytics only) to make the site better. Cool with that? :)
          </p>
          <div className="mt-3 flex justify-center sm:justify-end gap-4">
            <button onClick={declineCookies} className="text-xs underline opacity-80 hover:opacity-100">
              Pass
            </button>
            <button onClick={acceptCookies} className="text-xs font-semibold underline opacity-80 hover:opacity-100">
              All good!
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>

  )
}
