import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function SidebarWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        aria-label="Open sidebar"
        className="bg-sbBackground text-sbText border-sbSection hover:bg-sbSection dark:bg-sbBackground-dark dark:text-sbText-dark dark:border-sbSection-dark dark:hover:bg-sbSection-dark fixed top-6 left-6 z-50 rounded-full border p-3 shadow-lg transition-colors duration-200 hover:scale-105 active:scale-95"
      >
        <Menu size={20} />
      </button>

      <Dialog open={isOpen} onClose={setIsOpen} className="relative z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="backdrop"
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, ease: 'easeInOut' }}
            />
          )}
        </AnimatePresence>

        <div className="fixed inset-0 flex">
          <AnimatePresence>
            {isOpen && (
              <DialogPanel
                key="panel"
                className="bg-sbBackground border-sbSection dark:bg-sbBackground-dark dark:border-sbSection-dark h-full w-96 overflow-y-auto border-r shadow-xl"
              >
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '-100%' }}
                  transition={{
                    type: 'spring',
                    stiffness: 280,
                    damping: 26,
                    mass: 1,
                  }}
                  className="flex h-full flex-col"
                >
                  <div className="border-bgSection dark:border-sbSection-dark flex items-center justify-between border-b p-6">
                    <DialogTitle className="text-sbTitle dark:text-sbTitle-dark text-lg font-semibold">
                      Timeline controls
                    </DialogTitle>
                    <button
                      onClick={() => setIsOpen(false)}
                      aria-label="Close sidebar"
                      className="text-sbText hover:text-sbText hover:bg-sbSection dark:text-sbText-dark dark:hover:text-sbText-dark dark:hover:bg-sbSection-dark rounded-lg p-2 transition-colors duration-150"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <div className="scrollbar-light dark:scrollbar-dark max-h-[calc(100vh-88px)] flex-1 space-y-6 overflow-y-auto p-6">
                    {children}
                  </div>
                </motion.div>
              </DialogPanel>
            )}
          </AnimatePresence>
        </div>
      </Dialog>
    </>
  )
}