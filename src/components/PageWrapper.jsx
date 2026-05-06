import { motion } from 'framer-motion'

/**
 * Smooth page transition wrapper.
 * Tightened to 0.3s for snappier perceived performance.
 */
const variants = {
  initial: { opacity: 0, y: 16, scale: 0.998 },
  enter:   { opacity: 1, y: 0,  scale: 1     },
  exit:    { opacity: 0, y: -10, scale: 0.998 },
}

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ willChange: 'transform, opacity' }}
    >
      {children}
    </motion.div>
  )
}
