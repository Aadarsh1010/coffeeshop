import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart, Star, Flame, Snowflake, UtensilsCrossed, Cake, Sparkles, Award } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import PageHeader from '../components/PageHeader'
import { useSEO } from '../hooks/useSEO'

/* ------------------------------------------------------------------ */
/*  DATA                                                              */
/* ------------------------------------------------------------------ */

const categories = [
  { id: 'All',      label: 'All',         icon: Sparkles },
  { id: 'Hot',      label: 'Hot Drinks',  icon: Flame },
  { id: 'Cold',     label: 'Cold Drinks', icon: Snowflake },
  { id: 'Food',     label: 'Food',        icon: UtensilsCrossed },
  { id: 'Desserts', label: 'Desserts',    icon: Cake },
]

const featured = {
  id: 'caramel-cloud',
  name: 'Caramel Cloud Latte',
  category: 'Hot',
  price: 5.75,
  desc: 'Our signature double-shot espresso layered with steamed milk, ribbons of house-made salted caramel, and a cloud of vanilla foam. A guest favorite — and the drink that started it all.',
  rating: 4.9,
  reviews: 327,
  img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=1200&q=80',
}

const items = [
  { id: 'espresso',        name: 'Espresso',            category: 'Hot',  price: 3.50, desc: 'A bold, concentrated shot of single-origin Ethiopian beans with bright, floral notes.', img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80' },
  { id: 'cappuccino',      name: 'Cappuccino',          category: 'Hot',  price: 4.50, desc: 'Espresso topped with steamed milk and a generous crown of velvety microfoam.',         img: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?auto=format&fit=crop&w=800&q=80', tag: 'Classic' },
  { id: 'matcha-latte',    name: 'Matcha Latte',        category: 'Hot',  price: 5.50, desc: 'Ceremonial-grade Japanese matcha whisked into silky steamed oat milk.',               img: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=800&q=80' },
  { id: 'flat-white',      name: 'Flat White',          category: 'Hot',  price: 4.75, desc: 'A double-ristretto base with thin, glossy steamed milk — strong yet smooth.',          img: 'https://images.unsplash.com/photo-1577968897966-3d4325b36b61?auto=format&fit=crop&w=800&q=80' },
  { id: 'cold-brew',       name: 'Cold Brew',           category: 'Cold', price: 5.00, desc: 'Slow-steeped for 14 hours, our cold brew is smooth, low-acid, and refreshingly bold.', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80', tag: 'Bestseller' },
  { id: 'iced-mocha',      name: 'Iced Mocha',          category: 'Cold', price: 5.50, desc: 'Dark Belgian cocoa, espresso, and milk poured over crystal-clear ice.',                img: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?auto=format&fit=crop&w=800&q=80' },
  { id: 'nitro',           name: 'Nitro Coffee',        category: 'Cold', price: 5.75, desc: 'Cold brew infused with nitrogen for a creamy, cascading pour like a stout.',           img: 'https://images.unsplash.com/photo-1592318951566-bc26eef13b8c?auto=format&fit=crop&w=800&q=80' },
  { id: 'croissant',       name: 'Croissant',           category: 'Food', price: 3.00, desc: 'Flaky, golden, and buttery. Laminated with French butter and baked fresh daily.',      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80' },
  { id: 'avocado-toast',   name: 'Avocado Toast',       category: 'Food', price: 9.50, desc: 'Sourdough toast topped with smashed avocado, chili flakes, lime, and sea salt.',       img: 'https://images.unsplash.com/photo-1603046891744-76e6300f82ef?auto=format&fit=crop&w=800&q=80' },
  { id: 'salmon-bagel',    name: 'Smoked Salmon Bagel', category: 'Food', price: 12.00, desc: 'Toasted bagel with cream cheese, smoked salmon, capers, dill and red onion.',          img: 'https://images.unsplash.com/photo-1592424002053-21f369ad7fdb?auto=format&fit=crop&w=800&q=80' },
  { id: 'cheesecake',      name: 'Cheesecake',          category: 'Desserts', price: 6.00, desc: 'New York-style cheesecake with a buttery graham crust and house berry compote.',  img: 'https://images.unsplash.com/photo-1567171466295-4afa63d45416?auto=format&fit=crop&w=800&q=80', tag: 'House favorite' },
  { id: 'cinnamon-roll',   name: 'Cinnamon Roll',       category: 'Desserts', price: 4.75, desc: 'Warm, gooey, hand-rolled cinnamon swirl topped with cream cheese frosting.',      img: 'https://images.unsplash.com/photo-1509365465985-25d11c17e812?auto=format&fit=crop&w=800&q=80' },
  { id: 'chocolate-babka', name: 'Chocolate Babka',     category: 'Desserts', price: 5.25, desc: 'Slow-proofed sourdough babka braided with rich dark chocolate ganache.',          img: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?auto=format&fit=crop&w=800&q=80' },
]

const grid = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const card = {
  hidden: { opacity: 0, y: 30, scale: 0.96 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } },
  exit:   { opacity: 0, y: -20, scale: 0.96, transition: { duration: 0.25, ease: 'easeIn' } },
}

function MenuImage({ src, alt, className = '' }) {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className={`relative overflow-hidden bg-cream-200 dark:bg-coffee-800 ${className}`}>
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-cream-200 to-coffee-200/50 dark:from-coffee-800 dark:to-coffee-900 animate-pulse">
          <svg viewBox="0 0 64 64" className="w-12 h-12 text-coffee-400/60" fill="currentColor">
            <path d="M14 26h30v14a10 10 0 0 1-10 10H24a10 10 0 0 1-10-10V26z" />
            <path d="M44 30h4a6 6 0 0 1 0 12h-4" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
          </svg>
        </div>
      )}
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        onLoad={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-all duration-700
                   ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-105'}
                   group-hover:scale-110`}
      />
    </div>
  )
}

function FavoriteButton({ isFav, onClick, label }) {
  return (
    <motion.button
      onClick={onClick}
      whileTap={{ scale: 0.9 }}
      aria-pressed={isFav}
      aria-label={isFav ? `Remove ${label} from favorites` : `Add ${label} to favorites`}
      className={`relative inline-flex items-center gap-2 px-4 py-2 rounded-full
                  text-sm font-medium border-2 transition-all duration-300 overflow-hidden
                  ${isFav
                    ? 'bg-gold-500 border-gold-500 text-coffee-900 shadow-[0_8px_20px_-6px_rgba(201,169,97,0.55)]'
                    : 'bg-transparent border-coffee-200 dark:border-coffee-700 text-coffee-700 dark:text-cream-200 hover:border-gold-500 hover:text-gold-600'}`}
    >
      <motion.span
        key={isFav ? 'on' : 'off'}
        initial={{ scale: 0.6, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 380, damping: 14 }}
        className="relative"
      >
        <Heart size={16} fill={isFav ? 'currentColor' : 'none'} />
        <AnimatePresence>
          {isFav && (
            <motion.span
              initial={{ scale: 0, opacity: 0.6 }}
              animate={{ scale: 2.5, opacity: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 rounded-full bg-gold-500/40"
            />
          )}
        </AnimatePresence>
      </motion.span>
      <span>{isFav ? 'Favorited' : 'Add to Favorites'}</span>
    </motion.button>
  )
}

function ItemCard({ item, isFav, onToggleFav }) {
  return (
    <motion.article
      layout
      variants={card}
      exit="exit"
      whileHover={{ y: -6 }}
      className="group bg-cream-50 dark:bg-coffee-800/60 rounded-2xl overflow-hidden border border-cream-200 dark:border-coffee-700
                 shadow-warm hover:shadow-gold transition-shadow duration-300 flex flex-col"
    >
      <div className="relative">
        <MenuImage src={item.img} alt={item.name} className="h-56 sm:h-60" />
        <span className="absolute top-4 left-4 bg-coffee-900/80 backdrop-blur text-cream-50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-semibold">
          {item.category === 'Hot'  && 'Hot Drink'}
          {item.category === 'Cold' && 'Cold Drink'}
          {item.category === 'Food' && 'Food'}
          {item.category === 'Desserts' && 'Dessert'}
        </span>
        {item.tag && (
          <span className="absolute top-4 right-4 bg-gold-500 text-coffee-900 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest font-bold">
            {item.tag}
          </span>
        )}
        <div className="absolute -bottom-5 right-5 bg-coffee-800 text-gold-500 px-4 py-2 rounded-full font-serif font-bold text-lg shadow-warm border-2 border-cream-50 dark:border-coffee-900">
          ${item.price.toFixed(2)}
        </div>
      </div>
      <div className="p-6 pt-7 flex flex-col flex-grow">
        <h3 className="font-serif text-xl sm:text-2xl font-semibold text-coffee-800 dark:text-cream-50 mb-2">{item.name}</h3>
        <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm leading-relaxed mb-5 flex-grow">{item.desc}</p>
        <div className="flex items-center justify-between gap-3 pt-4 border-t border-cream-200 dark:border-coffee-700">
          <FavoriteButton isFav={isFav} onClick={onToggleFav} label={item.name} />
          <span className="text-xs text-coffee-500 dark:text-cream-200/60 italic">Freshly made</span>
        </div>
      </div>
    </motion.article>
  )
}

function FeaturedCard({ isFav, onToggleFav }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-3xl overflow-hidden bg-coffee-900 text-cream-50
                 shadow-[0_30px_60px_-20px_rgba(42,26,20,0.6)] border border-coffee-700/60"
    >
      <div className="absolute -top-20 -right-20 w-80 h-80 bg-gold-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-20 w-80 h-80 bg-gold-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="grid grid-cols-1 lg:grid-cols-2 relative">
        <div className="relative h-72 sm:h-96 lg:h-[520px] overflow-hidden">
          <MenuImage src={featured.img} alt={featured.name} className="absolute inset-0 group" />
          <div className="absolute inset-0 lg:hidden bg-gradient-to-t from-coffee-900 via-coffee-900/40 to-transparent" />

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ delay: 0.4, type: 'spring', stiffness: 200, damping: 15 }}
            className="absolute top-6 left-6 sm:top-8 sm:left-8"
          >
            <div className="relative">
              <motion.div
                animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeOut' }}
                className="absolute inset-0 rounded-full bg-gold-500/40 blur-md"
              />
              <div className="relative inline-flex items-center gap-2 bg-gold-500 text-coffee-900 px-4 py-2 rounded-full shadow-[0_10px_25px_-5px_rgba(201,169,97,0.7)] font-bold text-xs sm:text-sm uppercase tracking-widest">
                <Award size={16} /> Chef's Pick
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative p-8 sm:p-10 lg:p-14 flex flex-col justify-center">
          <span className="inline-block uppercase tracking-[0.3em] text-xs text-gold-500 font-semibold mb-4">Featured this week</span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-5">{featured.name}</h2>
          <div className="flex items-center gap-3 mb-5">
            <div className="flex gap-0.5 text-gold-500">{[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}</div>
            <span className="text-sm text-cream-200/80"><span className="font-bold text-gold-500">{featured.rating}</span> · {featured.reviews} reviews</span>
          </div>
          <p className="text-cream-100/85 leading-relaxed mb-8 max-w-md">{featured.desc}</p>
          <div className="flex flex-wrap items-center gap-5">
            <div className="flex items-baseline gap-1"><span className="font-serif text-5xl font-bold text-gold-500">${featured.price.toFixed(2)}</span></div>
            <motion.button
              onClick={onToggleFav}
              whileTap={{ scale: 0.94 }}
              aria-pressed={isFav}
              className={`relative inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 overflow-hidden
                          ${isFav ? 'bg-gold-500 text-coffee-900 hover:bg-gold-400' : 'bg-cream-50 text-coffee-900 hover:bg-gold-500'}`}
            >
              <Heart size={18} fill={isFav ? 'currentColor' : 'none'} />
              {isFav ? 'Favorited' : 'Add to Favorites'}
            </motion.button>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default function Menu() {
  useSEO({
    title: 'Menu',
    description: 'Explore the Brew & Soul menu — espresso, cappuccino, cold brew, matcha latte, fresh pastries, and more. Hand-crafted, freshly made daily.',
    keywords: 'coffee menu, espresso, cappuccino, cold brew, matcha latte, croissant, cheesecake, brooklyn coffee shop',
  })

  const [active, setActive] = useState('All')
  const [favorites, setFavorites] = useState(new Set())

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev)
      next.has(id) ? next.delete(id) : next.add(id)
      return next
    })
  }

  const filtered = useMemo(
    () => (active === 'All' ? items : items.filter((i) => i.category === active)),
    [active]
  )

  const counts = useMemo(() => {
    const c = { All: items.length }
    items.forEach((i) => { c[i.category] = (c[i.category] || 0) + 1 })
    return c
  }, [])

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Our offerings"
        title="The Menu"
        subtitle="From single-origin espresso to slow-baked pastries — every item is crafted with intention and served with soul."
        image="https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="bg-cream-50 dark:bg-coffee-950 pt-16 sm:pt-20 lg:pt-24">
        <div className="container-px max-w-7xl mx-auto">
          <FeaturedCard
            isFav={favorites.has(featured.id)}
            onToggleFav={() => toggleFavorite(featured.id)}
          />
        </div>
      </section>

      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="eyebrow">Browse the full menu</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50">
              Find your next <span className="text-gold-600 dark:text-gold-500 italic">favorite</span>
            </h2>
          </div>

          <div className="flex justify-center mb-8">
            <AnimatePresence>
              {favorites.size > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gold-500/15 text-coffee-800 dark:text-cream-100 text-sm font-medium border border-gold-500/40"
                >
                  <Heart size={14} fill="currentColor" className="text-gold-600" />
                  {favorites.size} {favorites.size === 1 ? 'favorite' : 'favorites'} saved
                </motion.div>
              )}
            </AnimatePresence>
          </div>

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
                      layoutId="tab-bg"
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

          <motion.div
            layout
            variants={grid}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <ItemCard
                  key={item.id}
                  item={item}
                  isFav={favorites.has(item.id)}
                  onToggleFav={() => toggleFavorite(item.id)}
                />
              ))}
            </AnimatePresence>
          </motion.div>

          <div className="mt-16 text-center max-w-2xl mx-auto">
            <p className="text-coffee-600/80 dark:text-cream-200/70 italic">
              We accommodate dietary preferences — ask about our oat, almond, soy, and lactose-free options. Allergens? Just let us know. ❤
            </p>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
