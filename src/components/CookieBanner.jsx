import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Cookie, X } from 'lucide-react'

const STORAGE_KEY = 'bs-cookies-pref'

export default function CookieBanner() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      const t = setTimeout(() => setOpen(true), 1500)
      return () => clearTimeout(t)
    }
  }, [])

  const accept   = () => { localStorage.setItem(STORAGE_KEY, 'accepted'); setOpen(false) }
  const decline  = () => { localStorage.setItem(STORAGE_KEY, 'declined'); setOpen(false) }
  const dismiss  = () => { localStorage.setItem(STORAGE_KEY, 'dismissed'); setOpen(false) }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0,   opacity: 1 }}
          exit={{   y: 100, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
          role="dialog"
          aria-label="Cookie consent"
          className="fixed bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5
                     md:left-auto md:max-w-lg z-[55]"
        >
          <div className="relative bg-coffee-900 text-cream-100 rounded-2xl
                          shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]
                          border border-coffee-700 overflow-hidden">
            {/* Top gold accent */}
            <div className="h-1 bg-gradient-to-r from-gold-700 via-gold-500 to-gold-700" />

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row gap-4 items-start">
              {/* Icon */}
              <div className="shrink-0 p-3 rounded-2xl bg-gold-500/15 text-gold-500
                              ring-1 ring-gold-500/30">
                <Cookie size={22} />
              </div>

              {/* Body */}
              <div className="flex-1 min-w-0">
                <h3 className="font-serif text-lg font-bold text-cream-50 mb-1">
                  We use cookies ☕
                </h3>
                <p className="text-sm text-cream-200/80 leading-relaxed">
                  We use cookies to improve your experience, remember your preferences, and
                  analyze site traffic. Read our{' '}
                  <a href="#" className="text-gold-500 hover:text-gold-400 underline underline-offset-2">
                    Privacy Policy
                  </a>{' '}
                  for details.
                </p>

                <div className="mt-4 flex flex-wrap gap-2">
                  <button
                    onClick={accept}
                    className="inline-flex items-center px-5 py-2 rounded-full
                               bg-gold-500 hover:bg-gold-400 text-coffee-900 font-semibold text-sm
                               shadow-[0_8px_20px_-6px_rgba(201,169,97,0.5)]
                               hover:-translate-y-0.5 transition-all duration-300"
                  >
                    Accept all
                  </button>
                  <button
                    onClick={decline}
                    className="inline-flex items-center px-5 py-2 rounded-full
                               border border-coffee-700 text-cream-100 hover:bg-coffee-800
                               font-semibold text-sm transition-colors"
                  >
                    Essential only
                  </button>
                </div>
              </div>

              {/* Close (treated as dismiss) */}
              <button
                onClick={dismiss}
                aria-label="Dismiss"
                className="absolute top-3 right-3 p-1.5 rounded-full text-cream-200/60
                           hover:text-cream-50 hover:bg-coffee-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
