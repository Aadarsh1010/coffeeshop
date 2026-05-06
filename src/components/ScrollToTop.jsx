import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1,   y: 0 }}
          exit={{   opacity: 0, scale: 0.5, y: 20 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Scroll to top"
          title="Back to top"
          className="fixed bottom-5 left-5 sm:bottom-6 sm:left-6 z-40 group
                     w-12 h-12 rounded-full bg-coffee-800 hover:bg-coffee-900
                     text-gold-500 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.4)]
                     transition-colors flex items-center justify-center"
        >
          {/* Circular progress ring */}
          <svg viewBox="0 0 48 48" className="absolute inset-0 -rotate-90">
            <circle cx="24" cy="24" r="22" fill="none"
                    stroke="rgba(201,169,97,0.2)" strokeWidth="2" />
            <motion.circle
              cx="24" cy="24" r="22"
              fill="none"
              stroke="#C9A961"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength="1"
              style={{ pathLength: progress }}
            />
          </svg>
          <ArrowUp size={18} className="relative group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
