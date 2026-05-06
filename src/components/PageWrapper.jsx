import { motion } from 'framer-motion'

/**
 * Smooth premium page transition wrapper.
 * Includes opacity, y-shift, scale, and a subtle blur for that "focus pull" feel.
 */
const variants = {
  initial: { opacity: 0, y: 24, scale: 0.995, filter: 'blur(6px)' },
  enter:   { opacity: 1, y: 0,  scale: 1,     filter: 'blur(0px)' },
  exit:    { opacity: 0, y: -16, scale: 0.998, filter: 'blur(4px)' },
}

export default function PageWrapper({ children }) {
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
