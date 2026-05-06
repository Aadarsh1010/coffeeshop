import { useState, useMemo, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ChevronLeft, ChevronRight, ZoomIn, Heart,
  Instagram, MessageCircle, Camera, Sparkles, Sofa, Coffee,
  UtensilsCrossed, PartyPopper, ExternalLink,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import PageHeader from '../components/PageHeader'
import LazyImage from '../components/LazyImage'
import { useSEO } from '../hooks/useSEO'

const categories = [
  { id: 'All',         label: 'All',         icon: Sparkles },
  { id: 'Interior',    label: 'Interior',    icon: Sofa },
  { id: 'Coffee Art',  label: 'Coffee Art',  icon: Coffee },
  { id: 'Food',        label: 'Food',        icon: UtensilsCrossed },
  { id: 'Events',      label: 'Events',      icon: PartyPopper },
]

const photos = [
  { id: 1,  cat: 'Interior',   title: 'Morning glow',          h: 'tall',  src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=900&q=80' },
  { id: 2,  cat: 'Interior',   title: 'The reading nook',      h: 'short', src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80' },
  { id: 3,  cat: 'Interior',   title: 'Behind the bar',        h: 'tall',  src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=900&q=80' },
  { id: 4,  cat: 'Interior',   title: 'Window seats',          h: 'short', src: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80' },
  { id: 5,  cat: 'Interior',   title: 'Hand-roasted, daily',   h: 'short', src: 'https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=900&q=80' },
  { id: 6,  cat: 'Coffee Art', title: 'Tulip pour',            h: 'tall',  src: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&w=900&q=80' },
  { id: 7,  cat: 'Coffee Art', title: 'The first sip',         h: 'short', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&q=80' },
  { id: 8,  cat: 'Coffee Art', title: 'Espresso, neat',        h: 'short', src: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=900&q=80' },
  { id: 9,  cat: 'Coffee Art', title: 'Pour-over ritual',      h: 'tall',  src: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?auto=format&fit=crop&w=900&q=80' },
  { id: 10, cat: 'Coffee Art', title: 'Macchiato moment',      h: 'short', src: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=900&q=80' },
  { id: 11, cat: 'Coffee Art', title: 'Cold-brew sunrise',     h: 'short', src: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=900&q=80' },
  { id: 12, cat: 'Food',       title: 'Almond croissant',      h: 'short', src: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=900&q=80' },
  { id: 13, cat: 'Food',       title: 'Cinnamon mornings',     h: 'tall',  src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=900&q=80' },
  { id: 14, cat: 'Food',       title: 'Brunch on Maple St.',   h: 'short', src: 'https://images.unsplash.com/photo-1603046891744-76e6300f82ef?auto=format&fit=crop&w=900&q=80' },
  { id: 15, cat: 'Food',       title: 'Salmon & dill bagel',   h: 'short', src: 'https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&w=900&q=80' },
  { id: 16, cat: 'Food',       title: 'Babka, freshly torn',   h: 'tall',  src: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=900&q=80' },
  { id: 17, cat: 'Events',     title: 'Open mic night',        h: 'tall',  src: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=900&q=80' },
  { id: 18, cat: 'Events',     title: 'Latte art throwdown',   h: 'short', src: 'https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=80' },
  { id: 19, cat: 'Events',     title: 'Cupping class',         h: 'short', src: 'https://images.unsplash.com/photo-1507133750040-4a8f57021571?auto=format&fit=crop&w=900&q=80' },
  { id: 20, cat: 'Events',     title: 'Saturday acoustic set', h: 'tall',  src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=900&q=80' },
  { id: 21, cat: 'Events',     title: 'Anniversary brunch',    h: 'short', src: 'https://images.unsplash.com/photo-1543007630-9710e4a00a20?auto=format&fit=crop&w=900&q=80' },
]

// Row spans only kick in from `sm:` up (when we have 2+ columns).
// On mobile (single column) every tile is the same uniform height
// so the gallery reads as a clean, predictable vertical scroll.
const heightClasses = {
  short: 'sm:row-span-1',
  tall:  'sm:row-span-2',
  xtall: 'sm:row-span-3',
}

const igFeed = [
  { id: 'ig1', src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80', likes: 1240, comments:  87 },
  { id: 'ig2', src: 'https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&w=600&q=80', likes:  982, comments:  43 },
  { id: 'ig3', src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=600&q=80', likes: 1567, comments: 112 },
  { id: 'ig4', src: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=600&q=80', likes:  743, comments:  29 },
  { id: 'ig5', src: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=600&q=80', likes: 2103, comments: 156 },
  { id: 'ig6', src: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?auto=format&fit=crop&w=600&q=80', likes:  891, comments:  52 },
]

function Tile({ photo, onOpen }) {
  return (
    <motion.button
      layout
      onClick={() => onOpen(photo)}
      initial={{ opacity: 0, y: 30, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-2xl bg-coffee-200 dark:bg-coffee-800
                  cursor-zoom-in shadow-warm hover:shadow-gold transition-shadow
                  duration-300 ${heightClasses[photo.h] || ''}`}
      aria-label={`Open image: ${photo.title}`}
    >
      <LazyImage
        src={photo.src}
        alt={photo.title}
        className="absolute inset-0"
        imgClassName="group-hover:scale-110 transition-transform duration-[900ms] ease-out"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/85 via-coffee-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-cream-50/90 text-coffee-800 backdrop-blur opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
        <ZoomIn size={16} />
      </div>
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-cream-50 translate-y-3 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <span className="inline-block text-[10px] uppercase tracking-[0.3em] text-gold-500 font-semibold mb-1.5">{photo.cat}</span>
        <h3 className="font-serif text-lg sm:text-xl font-bold leading-tight">{photo.title}</h3>
      </div>
    </motion.button>
  )
}

function Lightbox({ photo, onClose, onPrev, onNext, total, index }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape')      onClose()
      if (e.key === 'ArrowLeft')   onPrev()
      if (e.key === 'ArrowRight')  onNext()
    }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, onPrev, onNext])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={onClose}
      className="fixed inset-0 z-[60] bg-coffee-900/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 cursor-zoom-out"
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
    >
      <button onClick={(e) => { e.stopPropagation(); onClose() }} aria-label="Close lightbox"
        className="absolute top-4 right-4 sm:top-6 sm:right-6 p-3 rounded-full bg-coffee-800/80 text-cream-50 hover:bg-gold-500 hover:text-coffee-900 transition-colors z-10 cursor-pointer">
        <X size={22} />
      </button>
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 px-4 py-2 rounded-full bg-coffee-800/80 backdrop-blur text-cream-50 text-sm font-medium z-10">
        <span className="text-gold-500 font-bold">{index + 1}</span><span className="text-cream-200/60"> / {total}</span>
      </div>
      <button onClick={(e) => { e.stopPropagation(); onPrev() }} aria-label="Previous image"
        className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-coffee-800/80 text-cream-50 hover:bg-gold-500 hover:text-coffee-900 transition-colors z-10 cursor-pointer">
        <ChevronLeft size={24} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); onNext() }} aria-label="Next image"
        className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-coffee-800/80 text-cream-50 hover:bg-gold-500 hover:text-coffee-900 transition-colors z-10 cursor-pointer">
        <ChevronRight size={24} />
      </button>
      <motion.div
        key={photo.id}
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-6xl w-full max-h-[85vh] flex flex-col items-center cursor-default"
      >
        <img src={photo.src} alt={photo.title} loading="eager" decoding="async"
          className="max-w-full max-h-[75vh] rounded-2xl shadow-[0_30px_80px_-20px_rgba(0,0,0,0.7)] object-contain" />
        <div className="mt-5 text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-gold-500 font-semibold mb-1">{photo.cat}</span>
          <h3 className="font-serif text-2xl sm:text-3xl font-bold text-cream-50">{photo.title}</h3>
        </div>
      </motion.div>
    </motion.div>
  )
}

function InstaTile({ post, delay }) {
  return (
    <motion.a
      href="https://instagram.com/brewandsoul" target="_blank" rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="group relative aspect-square overflow-hidden rounded-xl bg-cream-200 dark:bg-coffee-800"
    >
      <LazyImage src={post.src} alt="Instagram post" className="absolute inset-0" imgClassName="group-hover:scale-110 transition-transform duration-700" />
      <div className="absolute inset-0 bg-coffee-900/0 group-hover:bg-coffee-900/70 transition-colors duration-300" />
      <div className="absolute inset-0 flex items-center justify-center gap-5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-cream-50 font-semibold text-sm">
        <span className="flex items-center gap-1.5">
          <Heart size={18} fill="currentColor" />
          {post.likes >= 1000 ? `${(post.likes / 1000).toFixed(1)}k` : post.likes}
        </span>
        <span className="flex items-center gap-1.5">
          <MessageCircle size={18} fill="currentColor" />
          {post.comments}
        </span>
      </div>
      <div className="absolute top-2 right-2 p-1.5 rounded-md bg-cream-50/85 backdrop-blur text-coffee-800 opacity-0 group-hover:opacity-100 transition-opacity">
        <Instagram size={14} />
      </div>
    </motion.a>
  )
}

export default function Gallery() {
  useSEO({
    title: 'Gallery',
    description: 'A look inside Brew & Soul. Browse our gallery of café interiors, coffee art, food photography, and event highlights.',
    keywords: 'coffee shop gallery, latte art photos, brooklyn cafe photos, coffee photography, brew and soul interior',
  })

  const [active, setActive] = useState('All')
  const [openIndex, setOpenIndex] = useState(null)

  const filtered = useMemo(
    () => (active === 'All' ? photos : photos.filter((p) => p.cat === active)),
    [active]
  )

  const counts = useMemo(() => {
    const c = { All: photos.length }
    photos.forEach((p) => { c[p.cat] = (c[p.cat] || 0) + 1 })
    return c
  }, [])

  const openAt   = useCallback((photo) => {
    const i = filtered.findIndex((p) => p.id === photo.id)
    setOpenIndex(i >= 0 ? i : 0)
  }, [filtered])
  const close    = useCallback(() => setOpenIndex(null), [])
  const prev     = useCallback(() => setOpenIndex((i) => (i - 1 + filtered.length) % filtered.length), [filtered.length])
  const next     = useCallback(() => setOpenIndex((i) => (i + 1) % filtered.length), [filtered.length])

  useEffect(() => { setOpenIndex(null) }, [active])

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="A look inside"
        title="Gallery"
        subtitle="Moments, mugs, and the magic in between — captured one frame at a time."
        image="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
            {categories.map((c) => {
              const isActive = active === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setActive(c.id)}
                  className={`relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors duration-300
                              ${isActive ? 'text-gold-500' : 'text-coffee-700 dark:text-cream-200 hover:text-coffee-900 dark:hover:text-cream-50'}`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-tab-bg"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-coffee-800 shadow-warm -z-10"
                    />
                  )}
                  {!isActive && (
                    <span className="absolute inset-0 rounded-full bg-cream-100 dark:bg-coffee-800 hover:bg-cream-200 dark:hover:bg-coffee-700 transition-colors -z-10" />
                  )}
                  <c.icon size={15} />
                  <span>{c.label}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-bold
                                   ${isActive ? 'bg-gold-500/25 text-gold-500' : 'bg-coffee-200/60 dark:bg-coffee-700 text-coffee-700 dark:text-cream-200'}`}>
                    {counts[c.id] || 0}
                  </span>
                </button>
              )
            })}
          </div>

          {/*  ────────── RESPONSIVE GRID ──────────
               Phone   →  1 column  (clean vertical stack, ~280px tall tiles)
               Tablet  →  2 columns (with masonry row spans)
               Desktop →  3 columns (with masonry row spans)
          */}
          <motion.div layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                       auto-rows-[280px] sm:auto-rows-[220px] lg:auto-rows-[280px]
                       gap-4 sm:gap-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((photo) => <Tile key={photo.id} photo={photo} onOpen={openAt} />)}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20 text-coffee-600/70">
              <Camera size={36} className="mx-auto mb-3 text-coffee-400" />
              <p>No photos in this category yet — check back soon!</p>
            </motion.div>
          )}
        </div>
      </section>

      <section className="relative section bg-cream-100 dark:bg-coffee-900 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gold-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl" />

        <div className="container-px max-w-7xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gold-500/15 border border-gold-500/30 mb-4"
            >
              <Instagram size={14} className="text-gold-600" />
              <span className="text-xs uppercase tracking-[0.25em] font-semibold text-coffee-800 dark:text-cream-100">Follow our story</span>
            </motion.div>

            <h2 className="heading-lg text-coffee-800 dark:text-cream-50 mb-3">
              <a href="https://instagram.com/brewandsoul" target="_blank" rel="noopener noreferrer"
                 className="text-gold-600 dark:text-gold-500 italic hover:text-gold-700 transition-colors inline-flex items-center gap-2">
                @brewandsoul
                <ExternalLink size={20} className="opacity-70" />
              </a>
            </h2>
            <p className="text-coffee-600/80 dark:text-cream-200/70">
              New brews, behind-the-scenes, and the occasional latte-art masterpiece.
            </p>
          </div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-x-10 gap-y-3 mb-10 text-coffee-700 dark:text-cream-100 text-sm">
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-2xl text-gold-600 dark:text-gold-500">28.4k</span>
              <span className="text-coffee-600/70 dark:text-cream-200/70">followers</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-coffee-300/60 dark:bg-coffee-700 self-center" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-2xl text-gold-600 dark:text-gold-500">1,247</span>
              <span className="text-coffee-600/70 dark:text-cream-200/70">posts</span>
            </div>
            <div className="hidden sm:block w-px h-6 bg-coffee-300/60 dark:bg-coffee-700 self-center" />
            <div className="flex items-baseline gap-2">
              <span className="font-serif font-bold text-2xl text-gold-600 dark:text-gold-500">3.2k</span>
              <span className="text-coffee-600/70 dark:text-cream-200/70">tagged in #brewandsoul</span>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 mb-12">
            {igFeed.map((post, i) => <InstaTile key={post.id} post={post} delay={i * 0.06} />)}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center">
            <p className="font-script text-2xl text-gold-600 dark:text-gold-500 mb-3">Snap a moment? We'd love to see it.</p>
            <p className="text-coffee-700 dark:text-cream-100/80 max-w-md mx-auto mb-7 text-sm sm:text-base">
              Tag us <span className="font-semibold text-coffee-900 dark:text-cream-50">@brewandsoul</span> or use{' '}
              <span className="font-semibold text-coffee-900 dark:text-cream-50">#brewandsoul</span> for a chance to be featured on our feed.
            </p>

            <a href="https://instagram.com/brewandsoul" target="_blank" rel="noopener noreferrer"
              className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full font-semibold text-cream-50 overflow-hidden bg-gradient-to-r from-[#833AB4] via-[#E1306C] to-[#F77737] shadow-[0_15px_35px_-10px_rgba(225,48,108,0.55)] hover:shadow-[0_20px_45px_-10px_rgba(225,48,108,0.7)] hover:-translate-y-0.5 transition-all duration-300">
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700" />
              <Instagram size={18} className="relative" />
              <span className="relative">Tag us on Instagram</span>
            </a>

            <div className="mt-5 text-xs text-coffee-600/60 dark:text-cream-200/60 uppercase tracking-[0.25em]">Featured weekly · Every Sunday</div>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {openIndex !== null && filtered[openIndex] && (
          <Lightbox
            photo={filtered[openIndex]}
            index={openIndex}
            total={filtered.length}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </PageWrapper>
  )
}
