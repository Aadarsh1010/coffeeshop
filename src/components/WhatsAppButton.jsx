import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, X } from 'lucide-react'

const WHATSAPP_NUMBER = '15552347891' // E.164 format minus the +
const DEFAULT_MSG     = "Hi Brew & Soul! I'd like to ask about…"

export default function WhatsAppButton() {
  const [tooltip, setTooltip] = useState(false)

  // Show tooltip once per session, after a delay
  useEffect(() => {
    if (sessionStorage.getItem('bs-wa-tooltip')) return
    const t1 = setTimeout(() => setTooltip(true), 7000)
    const t2 = setTimeout(() => {
      setTooltip(false)
      sessionStorage.setItem('bs-wa-tooltip', '1')
    }, 14000)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MSG)}`

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-40 flex flex-col items-end gap-3">
      {/* Tooltip card */}
      <AnimatePresence>
        {tooltip && (
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1,    y: 0 }}
            exit={{ opacity: 0, scale: 0.85, y: 10 }}
            transition={{ type: 'spring', stiffness: 260, damping: 22 }}
            className="relative max-w-[260px] bg-cream-50 dark:bg-coffee-800
                       rounded-2xl shadow-[0_15px_35px_-10px_rgba(0,0,0,0.35)]
                       border border-cream-200 dark:border-coffee-700 p-4 pr-8"
          >
            <button
              onClick={() => { setTooltip(false); sessionStorage.setItem('bs-wa-tooltip', '1') }}
              aria-label="Dismiss"
              className="absolute top-2 right-2 p-1 rounded-full text-coffee-500 hover:text-coffee-900
                         dark:hover:text-cream-50 transition-colors"
            >
              <X size={14} />
            </button>
            <p className="font-script text-xl text-gold-600 leading-none mb-1">Hi there!</p>
            <p className="text-xs text-coffee-700 dark:text-cream-100/80 leading-relaxed">
              Need a quick answer? Chat with us on WhatsApp — we usually reply in a few minutes.
            </p>
            {/* Tail */}
            <span className="absolute -bottom-2 right-7 w-4 h-4 rotate-45
                             bg-cream-50 dark:bg-coffee-800
                             border-r border-b border-cream-200 dark:border-coffee-700" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        title="Chat on WhatsApp"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.6, type: 'spring', stiffness: 260 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        className="relative group inline-flex items-center justify-center
                   w-14 h-14 rounded-full text-white
                   bg-[#25D366] hover:bg-[#20BD5C]
                   shadow-[0_15px_30px_-10px_rgba(37,211,102,0.6)]
                   hover:shadow-[0_20px_40px_-10px_rgba(37,211,102,0.8)]
                   transition-shadow"
      >
        {/* Pulse ring */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-50 animate-ping" />
        {/* Online dot */}
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-green-400
                         border-2 border-coffee-900" />
        {/* Icon */}
        <MessageCircle size={26} className="relative" fill="currentColor" />

        {/* Hover tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 rounded-lg
                         bg-coffee-900 text-cream-50 text-xs font-medium whitespace-nowrap
                         opacity-0 -translate-x-1 pointer-events-none
                         group-hover:opacity-100 group-hover:translate-x-0
                         transition-all duration-300">
          Chat with us
        </span>
      </motion.a>
    </div>
  )
}
