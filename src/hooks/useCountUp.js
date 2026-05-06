import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

/**
 * Animates a number from 0 to `end` once the element scrolls into view.
 *
 * @param {number} end       Final number
 * @param {number} duration  Animation duration in ms (default 2000)
 * @returns {[number, React.RefObject]} [currentValue, refToAttach]
 */
export function useCountUp(end, duration = 2000) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf
    const start = performance.now()

    const tick = (now) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // easeOutCubic for a satisfying decel curve
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(end * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
      else setValue(end)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, duration])

  return [value, ref]
}
