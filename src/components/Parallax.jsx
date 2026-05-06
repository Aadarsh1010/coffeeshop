import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Section with a parallax-scrolling background image.
 * Now uses willChange + GPU-only transforms for smooth 60fps scroll.
 */
export default function Parallax({
  image,
  overlay = 'bg-gradient-to-b from-coffee-900/85 via-coffee-900/75 to-coffee-900/90',
  speed = 0.3,
  className = '',
  children,
}) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden ${className}`}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y, backgroundImage: `url(${image})`, willChange: 'transform' }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] -z-20
                   bg-cover bg-center"
      />
      {/* Overlay */}
      <div className={`absolute inset-0 -z-10 ${overlay}`} />
      {children}
    </section>
  )
}
