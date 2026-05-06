import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Coffee, Instagram, Facebook, Twitter, Youtube,
  MapPin, Phone, Mail, Clock, Send, CheckCircle2,
  ArrowRight, Heart, ExternalLink, AlertCircle,
} from 'lucide-react'

/* ------------------------------------------------------------------ */
/*  NEWSLETTER                                                        */
/* ------------------------------------------------------------------ */
function Newsletter() {
  const [email,      setEmail]      = useState('')
  const [error,      setError]      = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted,  setSubmitted]  = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return

    if (!email.trim()) {
      setError('Please enter your email.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    setError('')
    setSubmitting(true)

    // Simulated API call
    setTimeout(() => {
      setSubmitting(false)
      setSubmitted(true)
      setEmail('')
      setTimeout(() => setSubmitted(false), 6000)
    }, 900)
  }

  return (
    <div className="relative bg-gradient-to-br from-coffee-800 to-coffee-900 rounded-3xl
                    p-6 sm:p-10 lg:p-12 border border-coffee-700/50 overflow-hidden">
      <div className="absolute -top-20 -right-20 w-64 h-64 bg-gold-500/15 rounded-full blur-3xl" aria-hidden="true" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gold-600/10 rounded-full blur-3xl" aria-hidden="true" />

      <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
        <div>
          <span className="inline-block uppercase tracking-[0.3em] text-xs text-gold-500 font-semibold mb-3">
            Stay in the loop
          </span>
          <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-cream-50 leading-tight mb-3">
            Coffee notes, <span className="text-gold-500 italic">delivered</span>
          </h3>
          <p className="text-cream-100/80 text-sm leading-relaxed max-w-md">
            Join our newsletter for new beans, secret menu drops, and the occasional
            love letter from our barista. No spam — just good coffee energy.
          </p>
        </div>

        <div>
          <form onSubmit={handleSubmit} className="space-y-3" noValidate>
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                <Mail size={18} aria-hidden="true"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500 pointer-events-none" />
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => { setEmail(e.target.value); setError('') }}
                  placeholder="your@email.com"
                  disabled={submitting}
                  aria-label="Email address"
                  aria-invalid={!!error}
                  aria-describedby={error ? 'nl-error' : 'nl-help'}
                  className={`w-full pl-12 pr-4 py-3.5 sm:py-4 rounded-full bg-cream-50 text-coffee-900
                              placeholder-coffee-400 outline-none border-2 transition
                              focus:ring-2 focus:ring-gold-500/30 disabled:opacity-70
                              ${error ? 'border-red-400 focus:border-red-500'
                                      : 'border-transparent focus:border-gold-500'}`}
                />
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3.5 sm:py-4 rounded-full
                           bg-gold-500 hover:bg-gold-400 text-coffee-900 font-semibold
                           shadow-[0_15px_35px_-10px_rgba(201,169,97,0.55)]
                           hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]
                           transition-all duration-300 overflow-hidden relative whitespace-nowrap
                           disabled:opacity-70 disabled:cursor-wait disabled:hover:translate-y-0"
              >
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full
                                 bg-gradient-to-r from-transparent via-white/40 to-transparent
                                 transition-transform duration-700 pointer-events-none" />
                {submitting ? (
                  <>
                    <span className="btn-spinner relative" />
                    <span className="relative">Subscribing…</span>
                  </>
                ) : (
                  <>
                    <span className="relative">Subscribe</span>
                    <Send size={16} className="relative group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
                  </>
                )}
              </button>
            </div>

            <div role="status" aria-live="polite" className="min-h-[1.25rem]">
              <AnimatePresence mode="wait">
                {error && !submitted && (
                  <motion.p key="err" id="nl-error"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-1.5 text-red-300 text-xs font-medium"
                  >
                    <AlertCircle size={13} aria-hidden="true" /> {error}
                  </motion.p>
                )}
                {submitted && (
                  <motion.div key="ok"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2 text-green-300 text-xs font-medium"
                  >
                    <CheckCircle2 size={14} aria-hidden="true" />
                    You're in! Check your inbox to confirm your subscription.
                  </motion.div>
                )}
                {!error && !submitted && (
                  <motion.p key="hint" id="nl-help"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-cream-200/60 text-xs"
                  >
                    By subscribing you agree to our privacy policy. Unsubscribe anytime.
                  </motion.p>
                )}
              </AnimatePresence>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  FOOTER DATA                                                       */
/* ------------------------------------------------------------------ */
const quickLinks = [
  { label: 'Home',         to: '/' },
  { label: 'Menu',         to: '/menu' },
  { label: 'About Us',     to: '/about' },
  { label: 'Gallery',      to: '/gallery' },
  { label: 'Reservations', to: '/reservations' },
  { label: 'Contact',      to: '/contact' },
]

const more = [
  { label: 'Order Online',  to: '/menu' },
  { label: 'Gift Cards',    to: '/contact' },
  { label: 'Catering',      to: '/contact' },
  { label: 'Careers',       to: '/contact' },
  { label: 'Press & Media', to: '/contact' },
  { label: 'FAQ',           to: '/contact' },
]

const socials = [
  { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com/brewandsoul' },
  { Icon: Facebook,  label: 'Facebook',  href: '#' },
  { Icon: Twitter,   label: 'Twitter',   href: '#' },
  { Icon: Youtube,   label: 'YouTube',   href: '#' },
]

const hours = [
  ['Mon – Fri',  '7:00 AM – 9:00 PM'],
  ['Saturday',   '8:00 AM – 10:00 PM'],
  ['Sunday',     '8:00 AM – 8:00 PM'],
]

export default function Footer() {
  return (
    <footer className="relative bg-coffee-900 text-cream-100 mt-auto overflow-hidden">
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none mix-blend-overlay"
        aria-hidden="true"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
      <div className="h-1 bg-gradient-to-r from-transparent via-gold-500 to-transparent" aria-hidden="true" />

      <div className="container-px max-w-7xl mx-auto pt-14 pb-8 sm:pt-16 sm:pb-10 relative">
        <Newsletter />

        <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-12 gap-y-10 gap-x-8">
          {/* BRAND */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4">
            <Link to="/" className="flex items-center gap-2.5 mb-5 group w-fit">
              <div className="p-2.5 rounded-full bg-gold-500/15 text-gold-500 ring-1 ring-gold-500/30
                              group-hover:bg-gold-500 group-hover:text-coffee-900 transition-colors">
                <Coffee size={22} aria-hidden="true" />
              </div>
              <div className="leading-tight">
                <h3 className="font-serif text-xl text-cream-50 font-bold">
                  Brew <span className="text-gold-500 italic">&</span> Soul
                </h3>
                <p className="text-[10px] tracking-[0.32em] uppercase text-cream-200/70 mt-0.5">
                  Artisan Coffee
                </p>
              </div>
            </Link>

            <p className="text-cream-200/80 text-sm leading-relaxed mb-6 max-w-sm">
              Hand-roasted beans, masterful baristas, and a warm corner of the world.
              Crafting the perfect cup in a cozy, soulful atmosphere since 2018.
            </p>

            <ul className="space-y-2.5 text-sm">
              <li>
                <a href="https://maps.google.com/?q=142+Maple+St+Brooklyn+NY+11201"
                   target="_blank" rel="noopener noreferrer"
                   className="flex items-start gap-3 text-cream-200/85 hover:text-gold-500 transition-colors group">
                  <MapPin size={16} className="text-gold-500 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>142 Maple Street, Brooklyn, NY 11201</span>
                </a>
              </li>
              <li>
                <a href="tel:+15552347891"
                   className="flex items-center gap-3 text-cream-200/85 hover:text-gold-500 transition-colors">
                  <Phone size={16} className="text-gold-500 shrink-0" aria-hidden="true" />
                  +1 (555) 234-7891
                </a>
              </li>
              <li>
                <a href="mailto:hello@brewandsoul.com"
                   className="flex items-center gap-3 text-cream-200/85 hover:text-gold-500 transition-colors">
                  <Mail size={16} className="text-gold-500 shrink-0" aria-hidden="true" />
                  hello@brewandsoul.com
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <p className="text-[10px] uppercase tracking-[0.3em] text-cream-200/60 font-semibold mb-3">
                Follow our story
              </p>
              <div className="flex gap-2.5">
                {socials.map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group p-2.5 rounded-full bg-coffee-800 hover:bg-gold-500
                               text-cream-100 hover:text-coffee-900 transition-all duration-300
                               hover:-translate-y-1 active:translate-y-0
                               hover:shadow-[0_10px_20px_-5px_rgba(201,169,97,0.4)]"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* QUICK LINKS */}
          <nav aria-label="Quick links" className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="font-serif text-base font-bold mb-5 text-gold-500 relative inline-block">
              Quick Links
              <span className="absolute -bottom-1.5 left-0 w-8 h-px bg-gold-500" aria-hidden="true" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              {quickLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-cream-200/80 hover:text-gold-500 transition-colors"
                  >
                    <ArrowRight size={12} aria-hidden="true"
                      className="-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* MORE */}
          <nav aria-label="Discover" className="col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="font-serif text-base font-bold mb-5 text-gold-500 relative inline-block">
              Discover
              <span className="absolute -bottom-1.5 left-0 w-8 h-px bg-gold-500" aria-hidden="true" />
            </h4>
            <ul className="space-y-2.5 text-sm">
              {more.map((l) => (
                <li key={l.label}>
                  <Link
                    to={l.to}
                    className="group inline-flex items-center gap-1.5 text-cream-200/80 hover:text-gold-500 transition-colors"
                  >
                    <ArrowRight size={12} aria-hidden="true"
                      className="-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300" />
                    <span className="group-hover:translate-x-0.5 transition-transform">{l.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* HOURS + MAP */}
          <div className="col-span-2 md:col-span-4 lg:col-span-4 space-y-6">
            <div>
              <h4 className="font-serif text-base font-bold mb-5 text-gold-500 relative inline-block">
                Opening Hours
                <span className="absolute -bottom-1.5 left-0 w-8 h-px bg-gold-500" aria-hidden="true" />
              </h4>
              <ul className="space-y-2 text-sm">
                {hours.map(([day, hrs]) => (
                  <li key={day} className="flex items-center justify-between gap-3 py-1.5 border-b border-coffee-800/70 last:border-0">
                    <span className="flex items-center gap-2 text-cream-200/80">
                      <Clock size={13} className="text-gold-500/70" aria-hidden="true" />
                      {day}
                    </span>
                    <span className="font-semibold text-cream-50">{hrs}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30">
                <span className="relative flex w-2 h-2" aria-hidden="true">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                <span className="text-xs font-semibold text-green-300">Open now</span>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border border-coffee-800 group relative">
              <div className="h-40 relative">
                <iframe
                  title="Brew & Soul location on map"
                  src="https://www.google.com/maps?q=brooklyn+brewery+brooklyn+ny&output=embed"
                  className="absolute inset-0 w-full h-full grayscale-[0.4] contrast-110"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <a
                  href="https://maps.google.com/?q=142+Maple+St+Brooklyn+NY+11201"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Open directions in Google Maps"
                  className="absolute inset-0 flex items-center justify-center
                             bg-coffee-900/0 group-hover:bg-coffee-900/70 group-focus:bg-coffee-900/70
                             transition-colors duration-300"
                >
                  <span className="opacity-0 group-hover:opacity-100 group-focus:opacity-100 transition-opacity duration-300
                                    inline-flex items-center gap-2 px-4 py-2 rounded-full
                                    bg-gold-500 text-coffee-900 text-sm font-semibold">
                    Get directions <ExternalLink size={14} aria-hidden="true" />
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-12 pt-8 border-t border-coffee-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-cream-200/70 text-center md:text-left">
            © {new Date().getFullYear()} <span className="text-gold-500 font-semibold">Brew & Soul</span>. All rights reserved.
          </p>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-cream-200/70">
            {['Privacy Policy', 'Terms of Service', 'Cookie Settings', 'Accessibility', 'Sitemap'].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-gold-500 transition-colors">{l}</a>
              </li>
            ))}
          </ul>

          <p className="flex items-center gap-1.5 text-cream-200/70">
            Crafted with <Heart size={11} fill="currentColor" className="text-gold-500" aria-hidden="true" />
            and freshly roasted beans
          </p>
        </div>
      </div>
    </footer>
  )
}
