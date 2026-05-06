import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Sparkles, ArrowRight, Clock } from 'lucide-react'

const SESSION_KEY = 'bs-daily-special-dismissed'
const DELAY_MS    = 3000

export default function DailySpecialPopup() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    const t = setTimeout(() => setOpen(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  const close = () => {
    sessionStorage.setItem(SESSION_KEY, '1')
    setOpen(false)
  }

  // ESC to close
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && close()
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            className="fixed inset-0 z-[80] bg-coffee-900/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 30 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{   opacity: 0, scale: 0.9,  y: 20 }}
            transition={{ type: 'spring', stiffness: 220, damping: 22 }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="ds-title"
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[81]
                       w-[92%] max-w-md sm:max-w-lg pointer-events-none"
          >
            <div className="pointer-events-auto bg-cream-50 dark:bg-coffee-800
                            rounded-3xl overflow-hidden shadow-[0_30px_80px_-20px_rgba(0,0,0,0.6)]
                            border-2 border-gold-500/40">
              {/* Image */}
              <div className="relative h-48 sm:h-56 overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1000&q=80"
                  alt="Caramel Cloud Latte"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/70 to-transparent" />

                {/* Limited badge */}
                <motion.div
                  initial={{ scale: 0, rotate: -10 }}
                  animate={{ scale: 1, rotate: -8 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1.5
                             rounded-full bg-gold-500 text-coffee-900 text-xs font-bold uppercase
                             tracking-widest shadow-warm"
                >
                  <Sparkles size={12} />
                  Today only
                </motion.div>

                {/* Close */}
                <button
                  onClick={close}
                  aria-label="Close"
                  className="absolute top-3 right-3 p-2 rounded-full bg-cream-50/90 hover:bg-cream-50
                             text-coffee-800 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <p className="font-script text-2xl text-gold-600 dark:text-gold-500">Daily Special</p>
                <h2 id="ds-title" className="font-serif text-2xl sm:text-3xl font-bold
                                              text-coffee-900 dark:text-cream-50 mt-1 mb-3">
                  Caramel Cloud Latte
                </h2>
                <p className="text-coffee-700 dark:text-cream-100/80 text-sm leading-relaxed mb-5">
                  Our signature drink, crowned with a vanilla cloud and ribbons of house-made
                  salted caramel. <span className="font-semibold">20% off</span> today only —
                  one per guest.
                </p>

                {/* Price + Time */}
                <div className="flex items-center justify-between mb-6 pb-5 border-b border-coffee-200 dark:border-coffee-700">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif text-3xl font-bold text-gold-600">$4.60</span>
                    <span className="text-coffee-500 line-through text-sm">$5.75</span>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-coffee-600 dark:text-cream-200/70">
                    <Clock size={12} className="text-gold-500" />
                    Until 8 PM
                  </span>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Link
                    to="/menu"
                    onClick={close}
                    className="flex-1 group inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full
                               bg-gold-500 hover:bg-gold-400 text-coffee-900 font-semibold
                               shadow-[0_10px_25px_-8px_rgba(201,169,97,0.6)]
                               hover:-translate-y-0.5 transition-all duration-300"
                  >
                    See the menu
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                  <button
                    onClick={close}
                    className="px-5 py-3 rounded-full text-coffee-700 dark:text-cream-200/70
                               hover:text-coffee-900 dark:hover:text-cream-50 font-semibold text-sm transition-colors"
                  >
                    Maybe later
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
