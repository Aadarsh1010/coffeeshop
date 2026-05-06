import { useState, useRef, useEffect } from 'react'

/**
 * Performance-optimized image:
 *  - Native `loading="lazy"` + `decoding="async"`
 *  - IntersectionObserver delays setting `src` until near viewport
 *  - Skeleton placeholder with subtle pulse + coffee-cup glyph
 *  - Smooth fade-in once decoded
 */
export default function LazyImage({
  src,
  alt = '',
  className = '',
  imgClassName = '',
  rootMargin = '200px',
  ...rest
}) {
  const ref = useRef(null)
  const [near,   setNear]   = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    if (!ref.current || near) return
    if (typeof IntersectionObserver === 'undefined') {
      setNear(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          io.disconnect()
        }
      },
      { rootMargin }
    )
    io.observe(ref.current)
    return () => io.disconnect()
  }, [near, rootMargin])

  return (
    <div
      ref={ref}
      className={`relative overflow-hidden bg-cream-200 dark:bg-coffee-800 ${className}`}
    >
      {/* Skeleton */}
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center
                        bg-gradient-to-br from-cream-200 to-coffee-200/50
                        dark:from-coffee-800 dark:to-coffee-900 animate-pulse">
          <svg viewBox="0 0 64 64" className="w-10 h-10 text-coffee-400/50 dark:text-coffee-500/40" fill="currentColor">
            <path d="M14 26h30v14a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V26z" />
            <path d="M44 30h4a6 6 0 0 1 0 12h-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      )}

      {near && (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700
                     ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                     ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  )
}
