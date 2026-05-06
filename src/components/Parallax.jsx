import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

/**
 * Section with a parallax-scrolling background image.
 * The image scales slightly larger than the container and shifts
 * vertically as the section scrolls through the viewport.
 *
 * Props:
 *  - image: background image URL
 *  - overlay: tailwind classes for the dark overlay (optional)
 *  - speed: 0.0 – 1.0, how strongly the bg moves (default 0.3)
 *  - className: extra wrapper classes
 *  - children: section content (rendered above the bg)
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

  // Background moves opposite scroll direction, creating depth
  const y = useTransform(scrollYProgress, [0, 1], [`-${speed * 100}%`, `${speed * 100}%`])

  return (
    <section
      ref={ref}
      className={`relative isolate overflow-hidden ${className}`}
    >
      {/* Parallax background layer */}
      <motion.div
        style={{ y, backgroundImage: `url(${image})` }}
        className="absolute inset-x-0 -top-[20%] -bottom-[20%] -z-20
                   bg-cover bg-center will-change-transform"
      />
      {/* Overlay */}
      <div className={`absolute inset-0 -z-10 ${overlay}`} />
      {children}
    </section>
  )
}
