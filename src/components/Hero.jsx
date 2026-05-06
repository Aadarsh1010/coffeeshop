import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowRight, Calendar, ChevronDown, Star } from 'lucide-react'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden: { opacity: 0 },
  show:   { opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } },
}

function FloatingCup({ reduceMotion }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85, rotate: -6 }}
      animate={{ opacity: 1, scale: 1, rotate: 0 }}
      transition={{ duration: 0.3, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-4 sm:right-10 lg:right-20 top-1/2 -translate-y-1/2
                 w-40 sm:w-56 lg:w-72 xl:w-80 hidden md:block pointer-events-none
                 drop-shadow-[0_25px_45px_rgba(0,0,0,0.55)]"
      style={{ willChange: 'transform, opacity' }}
      aria-hidden="true"
    >
      <motion.div
        animate={reduceMotion ? {} : { y: [0, -14, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        style={{ willChange: 'transform' }}
      >
        <svg viewBox="0 0 200 240" className="w-full h-auto">
          <defs>
            <linearGradient id="cup" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%"   stopColor="#FAF3E7" />
              <stop offset="55%"  stopColor="#E2CDB0" />
              <stop offset="100%" stopColor="#A87E4F" />
            </linearGradient>
            <radialGradient id="coffee" cx="0.5" cy="0.4" r="0.7">
              <stop offset="0%"   stopColor="#7A4F2A" />
              <stop offset="60%"  stopColor="#4E342E" />
              <stop offset="100%" stopColor="#2A1A14" />
            </radialGradient>
            <linearGradient id="gold" x1="0" x2="1">
              <stop offset="0%"   stopColor="#E0C078" />
              <stop offset="50%"  stopColor="#C9A961" />
              <stop offset="100%" stopColor="#9A7209" />
            </linearGradient>
            <filter id="soft" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.5" />
            </filter>
          </defs>

          <g filter="url(#soft)" opacity="0.85">
            {[
              { d: 'M85 60 C 78 40, 95 30, 88 10',  delay: 0   },
              { d: 'M100 60 C 108 38, 92 28, 100 8', delay: 0.6 },
              { d: 'M115 60 C 122 40, 105 30, 112 10', delay: 1.2 },
            ].map((s, i) => (
              <motion.path
                key={i}
                d={s.d}
                stroke="#FAF3E7"
                strokeWidth="6"
                strokeLinecap="round"
                fill="none"
                initial={{ opacity: 0, y: 15 }}
                animate={reduceMotion ? { opacity: 0.4 } : { opacity: [0, 0.7, 0], y: [15, -25, -45] }}
                transition={{ duration: 3, repeat: Infinity, delay: s.delay, ease: 'easeOut' }}
                style={{ willChange: 'transform, opacity' }}
              />
            ))}
          </g>

          <ellipse cx="100" cy="215" rx="78" ry="10" fill="#2A1A14" opacity="0.45" />
          <ellipse cx="100" cy="208" rx="78" ry="14" fill="url(#cup)" stroke="url(#gold)" strokeWidth="1.5" />
          <ellipse cx="100" cy="206" rx="50" ry="6"  fill="#A87E4F" opacity="0.4" />

          <path d="M150 130 q 35 -2 35 30 q 0 30 -35 28"
                fill="none" stroke="url(#cup)" strokeWidth="12" strokeLinecap="round" />
          <path d="M150 130 q 35 -2 35 30 q 0 30 -35 28"
                fill="none" stroke="url(#gold)" strokeWidth="2" strokeLinecap="round" opacity="0.7" />

          <path d="M40 100 L160 100 L150 195 Q 100 215 50 195 Z"
                fill="url(#cup)" stroke="url(#gold)" strokeWidth="2" />

          <ellipse cx="100" cy="100" rx="60" ry="10" fill="url(#coffee)" />
          <ellipse cx="100" cy="98"  rx="55" ry="7"  fill="#3E2723" opacity="0.6" />
          <ellipse cx="85"  cy="96"  rx="18" ry="2"  fill="#C9A77A" opacity="0.5" />

          <ellipse cx="100" cy="100" rx="60" ry="10"
                   fill="none" stroke="url(#gold)" strokeWidth="2" />
          <line x1="55" y1="170" x2="145" y2="170" stroke="url(#gold)" strokeWidth="1" opacity="0.6" />
        </svg>
      </motion.div>
    </motion.div>
  )
}

export default function Hero() {
  const reduceMotion = useReducedMotion()

  return (
    <section
      className="relative min-h-[100svh] w-full flex items-center overflow-hidden isolate bg-coffee-900"
      aria-label="Welcome to Brew & Soul"
    >
      <motion.div
        initial={{ scale: reduceMotion ? 1 : 1.05, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 -z-10 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80')",
          willChange: 'transform, opacity',
        }}
        aria-hidden="true"
      />

      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-coffee-900/85 via-coffee-900/75 to-coffee-900/95" aria-hidden="true" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-coffee-900/90 via-coffee-900/45 to-transparent" aria-hidden="true" />

      <motion.div variants={fadeIn} initial="hidden" animate="show" aria-hidden="true"
        className="absolute -z-10 top-1/3 -left-20 w-[28rem] h-[28rem] bg-gold-500/15 rounded-full blur-[120px]" />
      <motion.div variants={fadeIn} initial="hidden" animate="show" aria-hidden="true"
        className="absolute -z-10 bottom-0 right-0 w-[34rem] h-[34rem] bg-gold-600/10 rounded-full blur-[140px]" />

      <div
        className="absolute inset-0 -z-10 opacity-[0.07] mix-blend-overlay pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <FloatingCup reduceMotion={reduceMotion} />

      <div className="container-px max-w-7xl mx-auto w-full relative z-10 pt-28 sm:pt-32 pb-24">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-3xl text-center md:text-left"
        >
          <motion.div
            variants={fadeUp}
            className="flex items-center gap-3 justify-center md:justify-start mb-5 sm:mb-6"
          >
            <span className="h-px w-8 sm:w-10 bg-gold-500/60" aria-hidden="true" />
            <div className="flex items-center gap-1.5 text-gold-500">
              <Star size={13} fill="currentColor" aria-hidden="true" />
              <span className="uppercase tracking-[0.32em] text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                Premium Artisan Coffee
              </span>
              <Star size={13} fill="currentColor" aria-hidden="true" />
            </div>
            <span className="h-px w-8 sm:w-10 bg-gold-500/60" aria-hidden="true" />
          </motion.div>

          <motion.h1
            variants={fadeUp}
            className="font-serif font-bold text-cream-50 leading-[1.05]
                       text-[2.25rem] xs:text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem]
                       tracking-tight"
          >
            Where Every Sip
            <br />
            <span className="relative inline-block mt-2">
              <span className="font-script font-normal italic text-gold-500
                               text-[2.75rem] xs:text-[3.2rem] sm:text-7xl lg:text-8xl xl:text-9xl
                               leading-none">
                Tells a Story
              </span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5, ease: 'easeInOut' }}
                viewBox="0 0 300 12"
                className="absolute -bottom-2 sm:-bottom-3 left-0 w-full"
                aria-hidden="true"
              >
                <motion.path
                  d="M5 6 Q 75 0, 150 6 T 295 6"
                  fill="none"
                  stroke="#C9A961"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="mt-7 sm:mt-8 text-cream-100/90 text-sm sm:text-base lg:text-lg xl:text-xl
                       max-w-xl leading-relaxed mx-auto md:mx-0"
          >
            Hand-roasted beans, masterful baristas, and a warm corner of the world
            waiting for you. Discover coffee that lingers — in your cup, and in your memory.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-center
                       gap-3 sm:gap-4 justify-center md:justify-start"
          >
            <Link
              to="/menu"
              className="group relative inline-flex items-center justify-center gap-2
                         rounded-full bg-gold-500 text-coffee-900 font-semibold
                         px-7 py-3.5 sm:px-8 sm:py-4
                         shadow-[0_15px_40px_-10px_rgba(201,169,97,0.6)]
                         hover:bg-gold-400 hover:shadow-[0_20px_45px_-10px_rgba(201,169,97,0.8)]
                         hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                         transition-all duration-300 overflow-hidden"
            >
              <span aria-hidden="true" className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                               transition-transform duration-500 ease-out
                               bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative">Explore Menu</span>
              <ArrowRight size={18} className="relative group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </Link>

            <Link
              to="/reservations"
              className="group inline-flex items-center justify-center gap-2
                         rounded-full border-2 border-cream-100/40 backdrop-blur-sm
                         bg-white/5 text-cream-50 font-semibold
                         px-7 py-3.5 sm:px-8 sm:py-4
                         hover:bg-cream-50 hover:text-coffee-900 hover:border-cream-50
                         hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                         transition-all duration-300"
            >
              <Calendar size={18} className="group-hover:rotate-12 transition-transform" aria-hidden="true" />
              Reserve a Table
            </Link>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="mt-10 sm:mt-12 flex flex-wrap items-center gap-x-6 sm:gap-x-8 gap-y-3
                       justify-center md:justify-start text-cream-100/70 text-xs sm:text-sm"
          >
            <div className="flex items-center gap-2">
              <span className="text-gold-500 font-bold text-base">4.9★</span>
              <span>1,200+ reviews</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-cream-100/25" aria-hidden="true" />
            <div>Voted <span className="text-gold-500">Best Café</span> 3 years running</div>
            <div className="hidden md:block w-px h-4 bg-cream-100/25" aria-hidden="true" />
            <div>Roasted <span className="text-gold-500">daily</span> on-site</div>
          </motion.div>
        </motion.div>
      </div>

      <motion.a
        href="#main-content"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
        className="absolute bottom-5 sm:bottom-10 left-1/2 -translate-x-1/2
                   flex flex-col items-center gap-2 text-cream-100/75
                   hover:text-gold-500 transition-colors group z-20"
        aria-label="Scroll down"
      >
        <span className="uppercase tracking-[0.3em] text-[10px] sm:text-xs font-medium">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-current/60
                        flex justify-center pt-2 group-hover:border-current transition-colors">
          <motion.span
            animate={reduceMotion ? {} : { y: [0, 12, 0], opacity: [1, 0.2, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-gold-500"
            aria-hidden="true"
          />
        </div>
        <motion.div
          animate={reduceMotion ? {} : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.a>
    </section>
  )
}
