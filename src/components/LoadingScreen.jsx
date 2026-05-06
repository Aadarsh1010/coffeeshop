import { motion } from 'framer-motion'

/**
 * Initial app loading screen with an animated SVG coffee cup that fills up.
 */
export default function LoadingScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center
                 bg-coffee-900 overflow-hidden"
    >
      {/* Ambient gold glows */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-gold-500/15 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-gold-600/15 rounded-full blur-3xl" />

      {/* Subtle noise grain */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-overlay"
           style={{
             backgroundImage:
               "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
           }} />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative text-center mb-10"
      >
        <h1 className="font-serif text-3xl sm:text-4xl text-cream-50 font-bold">
          Brew <span className="text-gold-500 italic">&</span> Soul
        </h1>
        <p className="text-[10px] tracking-[0.4em] uppercase text-cream-200/60 mt-1">
          Artisan Coffee
        </p>
      </motion.div>

      {/* Cup with filling coffee */}
      <div className="relative w-44 h-44 sm:w-52 sm:h-52">
        <svg viewBox="0 0 200 220" className="w-full h-full drop-shadow-[0_20px_30px_rgba(0,0,0,0.5)]">
          <defs>
            <linearGradient id="ls-cup" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"  stopColor="#FAF3E7" />
              <stop offset="55%" stopColor="#E2CDB0" />
              <stop offset="100%" stopColor="#A87E4F" />
            </linearGradient>
            <linearGradient id="ls-gold" x1="0" x2="1">
              <stop offset="0%"   stopColor="#E0C078" />
              <stop offset="100%" stopColor="#9A7209" />
            </linearGradient>
            <linearGradient id="ls-coffee" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"   stopColor="#7A4F2A" />
              <stop offset="100%" stopColor="#2A1A14" />
            </linearGradient>
            {/* Cup body clip */}
            <clipPath id="ls-clip">
              <path d="M40 80 L160 80 L150 195 Q 100 215 50 195 Z" />
            </clipPath>
          </defs>

          {/* Steam */}
          <g opacity="0.85">
            {[
              { x: 80,  delay: 0   },
              { x: 100, delay: 0.5 },
              { x: 120, delay: 1   },
            ].map((s, i) => (
              <motion.circle
                key={i}
                cx={s.x}
                cy="55"
                r="3"
                fill="#FAF3E7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: [0, 0.8, 0], y: [10, -25, -45], scale: [1, 1.4, 1.8] }}
                transition={{ duration: 2.4, repeat: Infinity, delay: s.delay, ease: 'easeOut' }}
              />
            ))}
          </g>

          {/* Saucer */}
          <ellipse cx="100" cy="207" rx="78" ry="11"
                   fill="url(#ls-cup)" stroke="url(#ls-gold)" strokeWidth="1.5" />

          {/* Handle */}
          <path d="M150 110 q 35 -2 35 30 q 0 30 -35 28"
                fill="none" stroke="url(#ls-cup)" strokeWidth="12" strokeLinecap="round" />
          <path d="M150 110 q 35 -2 35 30 q 0 30 -35 28"
                fill="none" stroke="url(#ls-gold)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          {/* Cup body */}
          <path d="M40 80 L160 80 L150 195 Q 100 215 50 195 Z"
                fill="url(#ls-cup)" stroke="url(#ls-gold)" strokeWidth="2" />

          {/* Coffee filling animation */}
          <g clipPath="url(#ls-clip)">
            <motion.rect
              x="0"
              y="80"
              width="200"
              height="135"
              fill="url(#ls-coffee)"
              initial={{ y: 215 }}
              animate={{ y: 90 }}
              transition={{ duration: 2.2, ease: [0.5, 0, 0.5, 1] }}
            />
            {/* Surface ripple */}
            <motion.path
              d="M0 95 Q 50 88, 100 95 T 200 95 V 215 H 0 Z"
              fill="url(#ls-coffee)"
              initial={{ y: 130 }}
              animate={{ y: 0 }}
              transition={{ duration: 2.2, ease: [0.5, 0, 0.5, 1] }}
              style={{ opacity: 0.6 }}
            />
          </g>

          {/* Cup rim accent */}
          <ellipse cx="100" cy="80" rx="60" ry="8"
                   fill="none" stroke="url(#ls-gold)" strokeWidth="2" />
        </svg>
      </div>

      {/* Brewing label */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex flex-col items-center"
      >
        <p className="font-script text-2xl text-gold-500 mb-3">Brewing your experience…</p>
        {/* Progress bar */}
        <div className="w-48 h-1 bg-coffee-800 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 2.2, ease: 'easeInOut' }}
            className="h-full bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 rounded-full"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
