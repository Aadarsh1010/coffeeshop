import { useState, useEffect } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu as MenuIcon, X, Coffee, ShoppingBag, Phone, MapPin, Clock } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

const links = [
  { to: '/',             label: 'Home' },
  { to: '/menu',         label: 'Menu' },
  { to: '/about',        label: 'About' },
  { to: '/gallery',      label: 'Gallery' },
  { to: '/reservations', label: 'Reservations' },
  { to: '/contact',      label: 'Contact' },
]

const drawer = {
  closed: { x: '100%' },
  open:   { x: 0, transition: { type: 'tween', ease: [0.22, 1, 0.36, 1], duration: 0.3 } },
}
// Reduced stagger: 0.06 → 0.04 with shorter delay for snappier drawer reveal
const drawerStagger = {
  open:   { transition: { staggerChildren: 0.04, delayChildren: 0.1 } },
  closed: { transition: { staggerChildren: 0.02, staggerDirection: -1 } },
}
const drawerItem = {
  closed: { opacity: 0, x: 16 },
  open:   { opacity: 1, x: 0, transition: { duration: 0.3, ease: 'easeOut' } },
}

function TopBar({ visible }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="hidden md:block bg-coffee-900 text-cream-100/85 text-xs overflow-hidden border-b border-coffee-800"
        >
          <div className="container-px max-w-7xl mx-auto py-2 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-1.5">
                <Clock size={12} className="text-gold-500" aria-hidden="true" />
                Open today · 7 AM – 9 PM
              </span>
              <span className="flex items-center gap-1.5">
                <MapPin size={12} className="text-gold-500" aria-hidden="true" />
                142 Maple St, Brooklyn NY
              </span>
            </div>
            <a href="tel:+15552347891"
               className="flex items-center gap-1.5 hover:text-gold-500 transition-colors">
              <Phone size={12} className="text-gold-500" aria-hidden="true" />
              +1 (555) 234-7891
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function Navbar() {
  const [open,     setOpen]     = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location.pathname])

  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <TopBar visible={!scrolled} />

      <div
        className={`border-b transition-[background-color,backdrop-filter,padding,box-shadow,border-color] duration-300 ease-out
                    ${scrolled
                      ? 'bg-coffee-900/95 backdrop-blur-md shadow-[0_8px_30px_-10px_rgba(0,0,0,0.4)] border-coffee-800/50 py-3'
                      : 'bg-transparent backdrop-blur-0 border-transparent py-4 sm:py-[18px]'}`}
      >
        <nav
          aria-label="Main navigation"
          className="container-px max-w-7xl mx-auto flex items-center justify-between gap-3"
        >
          <Link to="/" className="flex items-center gap-2 sm:gap-2.5 group shrink-0 min-w-0"
                aria-label="Brew & Soul home">
            <motion.div
              whileHover={{ rotate: -12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 380, damping: 18 }}
              className="relative p-2 sm:p-2.5 rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30
                         group-hover:bg-gold-500 group-hover:text-coffee-900 transition-colors shrink-0"
            >
              <Coffee size={20} strokeWidth={2.2} aria-hidden="true" />
              <span className="absolute -top-1 left-2 w-1 h-1 bg-gold-500/60 rounded-full animate-pulse" aria-hidden="true" />
              <span className="absolute -top-2 left-3.5 w-1 h-1 bg-gold-500/40 rounded-full animate-pulse"
                    style={{ animationDelay: '0.3s' }} aria-hidden="true" />
            </motion.div>
            <div className="leading-tight min-w-0">
              <h1 className="font-serif text-lg sm:text-xl lg:text-[1.4rem] text-cream-50 font-bold tracking-tight truncate">
                Brew <span className="text-gold-500 italic">&</span> Soul
              </h1>
              <p className="hidden sm:block text-[10px] tracking-[0.32em] uppercase text-cream-200/75 font-medium">
                Artisan Coffee
              </p>
            </div>
          </Link>

          <ul className="hidden lg:flex items-center gap-0.5">
            {links.map((l) => (
              <li key={l.to}>
                <NavLink
                  to={l.to}
                  className={({ isActive }) =>
                    `relative px-4 py-2 text-sm font-medium tracking-wide transition-colors duration-300
                     ${isActive ? 'text-gold-500' : 'text-cream-100 hover:text-gold-400'}`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {l.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-underline"
                          transition={{ type: 'spring', stiffness: 500, damping: 36 }}
                          className="absolute left-3 right-3 -bottom-0.5 h-0.5 bg-gold-500 rounded-full"
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <ThemeToggle />

            <Link
              to="/menu"
              className="group hidden sm:inline-flex relative items-center gap-2 px-4 lg:px-5 py-2 lg:py-2.5
                         rounded-full bg-gold-500 hover:bg-gold-400 text-coffee-900 font-semibold text-sm
                         shadow-[0_8px_25px_-8px_rgba(201,169,97,0.7)]
                         hover:shadow-[0_12px_30px_-8px_rgba(201,169,97,0.9)]
                         hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                         transition-all duration-300 overflow-hidden"
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                               bg-gradient-to-r from-transparent via-white/40 to-transparent
                               transition-transform duration-500 ease-out pointer-events-none" />
              <ShoppingBag size={15} className="relative" aria-hidden="true" />
              <span className="relative">Order Now</span>
            </Link>

            <button
              onClick={() => setOpen((o) => !o)}
              className="lg:hidden p-2 rounded-full text-cream-50 hover:text-gold-500
                         hover:bg-coffee-800/50 transition-colors"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              aria-controls="mobile-drawer"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? 'x' : 'menu'}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0,   opacity: 1 }}
                  exit={{   rotate: 90,  opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="block"
                >
                  {open ? <X size={24} aria-hidden="true" /> : <MenuIcon size={24} aria-hidden="true" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
              className="lg:hidden fixed inset-0 bg-coffee-900/70 backdrop-blur-sm z-40"
              aria-hidden="true"
            />

            <motion.aside
              id="mobile-drawer"
              variants={drawer}
              initial="closed"
              animate="open"
              exit="closed"
              role="dialog"
              aria-label="Mobile navigation"
              aria-modal="true"
              style={{ willChange: 'transform' }}
              className="lg:hidden fixed top-0 right-0 bottom-0 z-50 w-[88%] max-w-sm
                         bg-coffee-900 border-l border-coffee-800 shadow-2xl
                         flex flex-col"
            >
              <div className="flex items-center justify-between p-4 sm:p-5 border-b border-coffee-800 shrink-0">
                <Link to="/" onClick={() => setOpen(false)} className="flex items-center gap-2 min-w-0">
                  <div className="p-2 rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30 shrink-0">
                    <Coffee size={18} aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif text-base sm:text-lg text-cream-50 font-bold leading-none truncate">
                      Brew <span className="text-gold-500 italic">&</span> Soul
                    </h2>
                    <p className="text-[9px] tracking-[0.3em] uppercase text-cream-200/60 mt-1">
                      Artisan Coffee
                    </p>
                  </div>
                </Link>
                <div className="flex items-center gap-1 shrink-0">
                  <ThemeToggle />
                  <button
                    onClick={() => setOpen(false)}
                    aria-label="Close menu"
                    className="p-2 rounded-full text-cream-100 hover:text-gold-500 hover:bg-coffee-800 transition-colors"
                  >
                    <X size={22} aria-hidden="true" />
                  </button>
                </div>
              </div>

              <motion.div
                variants={drawerStagger}
                initial="closed"
                animate="open"
                exit="closed"
                className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-4 sm:p-5
                           [-webkit-overflow-scrolling:touch]"
              >
                <ul className="space-y-1">
                  {links.map((l) => (
                    <motion.li key={l.to} variants={drawerItem}>
                      <NavLink
                        to={l.to}
                        onClick={() => setOpen(false)}
                        className={({ isActive }) =>
                          `group flex items-center justify-between px-4 py-3.5 rounded-xl text-base font-medium
                           transition-all duration-200
                           ${isActive
                             ? 'bg-gold-500/10 text-gold-500 border border-gold-500/30'
                             : 'text-cream-100 hover:bg-coffee-800 hover:text-gold-400 border border-transparent'}`
                        }
                      >
                        <span>{l.label}</span>
                        <span className="text-gold-500 opacity-0 group-hover:opacity-100 transition-opacity"
                              aria-hidden="true">→</span>
                      </NavLink>
                    </motion.li>
                  ))}
                </ul>

                <motion.div
                  variants={drawerItem}
                  className="mt-6 pt-5 border-t border-coffee-800 space-y-3 text-sm text-cream-200/80"
                >
                  <a href="tel:+15552347891"
                     className="flex items-center gap-3 hover:text-gold-500 transition-colors">
                    <Phone size={14} className="text-gold-500" aria-hidden="true" />
                    +1 (555) 234-7891
                  </a>
                  <div className="flex items-center gap-3">
                    <MapPin size={14} className="text-gold-500" aria-hidden="true" />
                    142 Maple St, Brooklyn NY
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock size={14} className="text-gold-500" aria-hidden="true" />
                    Open today · 7 AM – 9 PM
                  </div>
                  <p className="font-script text-2xl text-gold-500 pt-2 text-center">
                    See you soon ☕
                  </p>
                </motion.div>
              </motion.div>

              <motion.div
                variants={drawerItem}
                initial="closed"
                animate="open"
                exit="closed"
                className="shrink-0 p-4 sm:p-5 border-t border-coffee-800
                           bg-coffee-900
                           pb-[calc(1rem+env(safe-area-inset-bottom))]
                           sm:pb-[calc(1.25rem+env(safe-area-inset-bottom))]"
              >
                <Link
                  to="/menu"
                  onClick={() => setOpen(false)}
                  className="flex items-center justify-center gap-2 w-full px-5 py-3.5 rounded-full
                             bg-gold-500 hover:bg-gold-400 active:scale-[0.98]
                             text-coffee-900 font-semibold
                             shadow-[0_10px_25px_-8px_rgba(201,169,97,0.7)] transition-all"
                >
                  <ShoppingBag size={18} aria-hidden="true" />
                  Order Now
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
