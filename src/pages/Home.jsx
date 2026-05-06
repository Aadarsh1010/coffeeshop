import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Coffee, Award, Leaf, Heart, Star, ArrowRight } from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import Hero from '../components/Hero'
import LazyImage from '../components/LazyImage'
import { useSEO } from '../hooks/useSEO'

const featured = [
  {
    name: 'Espresso Royale',
    desc: 'Bold double-shot espresso with hazelnut undertones.',
    price: '$4.50',
    img: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Caramel Cloud Latte',
    desc: 'Velvety milk, espresso, house caramel & sea salt.',
    price: '$5.75',
    img: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80',
  },
  {
    name: 'Vanilla Cold Brew',
    desc: '14-hour cold brew with Madagascar vanilla.',
    price: '$5.25',
    img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?auto=format&fit=crop&w=800&q=80',
  },
]

const features = [
  { icon: Coffee, title: 'Freshly Roasted', desc: 'Beans roasted in-house every morning for peak flavor.' },
  { icon: Leaf,   title: 'Ethically Sourced', desc: 'Direct trade with small farms across the globe.' },
  { icon: Award,  title: 'Award Winning', desc: 'Voted "Best Café in Brooklyn" three years running.' },
  { icon: Heart,  title: 'Made with Love', desc: 'Every cup is an act of craft, care, and soul.' },
]

const testimonials = [
  { name: 'Sarah K.',   quote: 'The cozy atmosphere and incredible coffee make this my second home.', role: 'Regular since 2021' },
  { name: 'Marcus L.',  quote: 'Best flat white in the city. The baristas are true artists.',         role: 'Coffee Enthusiast' },
  { name: 'Elena R.',   quote: 'I come for the coffee, but stay for the warmth and the people.',     role: 'Local Author' },
]

export default function Home() {
  useSEO({
    title: 'Home',
    description: 'Brew & Soul — premium artisan coffee, hand-roasted daily in Brooklyn. Discover hand-crafted espresso, cold brew, pastries, and a cozy café you\'ll love.',
    keywords: 'coffee shop, brooklyn cafe, artisan coffee, espresso, latte, brew and soul, specialty coffee',
  })

  return (
    <PageWrapper>
      {/* HERO */}
      <Hero />

      {/* FEATURES */}
      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="eyebrow">Why Brew & Soul</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50">
              Crafted with <span className="text-gold-600 dark:text-gold-500 italic">passion</span>, served with care
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                className="card p-7 text-center"
              >
                <div className="inline-flex p-4 rounded-full bg-coffee-800 text-gold-500 mb-5">
                  <f.icon size={26} />
                </div>
                <h3 className="text-xl font-semibold text-coffee-800 dark:text-cream-50 mb-2">{f.title}</h3>
                <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED MENU */}
      <section className="section bg-cream-100 dark:bg-coffee-900">
        <div className="container-px max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
            <div className="max-w-xl">
              <span className="eyebrow">Today's favorites</span>
              <h2 className="heading-lg text-coffee-800 dark:text-cream-50">
                Featured <span className="text-gold-600 dark:text-gold-500 italic">brews</span>
              </h2>
            </div>
            <Link to="/menu" className="btn-outline self-start md:self-auto">
              View Full Menu <ArrowRight size={18} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featured.map((item, i) => (
              <motion.article
                key={item.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="card group"
              >
                <div className="relative">
                  <LazyImage
                    src={item.img}
                    alt={item.name}
                    className="h-64"
                    imgClassName="group-hover:scale-110 transition-transform duration-700"
                  />
                  <span className="absolute top-4 right-4 bg-gold-500 text-coffee-900 px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    {item.price}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold text-coffee-800 dark:text-cream-50 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* STORY / IMAGE SPLIT */}
      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <LazyImage
              src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=900&q=80"
              alt="Barista at work"
              className="rounded-2xl shadow-warm w-full h-[420px] sm:h-[500px]"
            />
            <div className="hidden md:block absolute -bottom-8 -right-8 bg-coffee-800 text-cream-50 p-6 rounded-2xl shadow-warm max-w-[220px]">
              <p className="font-script text-3xl text-gold-500 leading-none mb-1">Since</p>
              <p className="font-serif text-4xl font-bold">2014</p>
              <p className="text-xs uppercase tracking-widest text-cream-200/70 mt-1">
                Brewing happiness
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <span className="eyebrow">Our story</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50 mb-5">
              A passion that began with a <span className="text-gold-600 dark:text-gold-500 italic">single bean</span>
            </h2>
            <p className="text-coffee-700 dark:text-cream-100/80 leading-relaxed mb-4">
              Brew & Soul started in 2014 as a tiny corner shop with a big dream:
              to bring people together over the world's most extraordinary coffee.
              Today, we still roast every bean by hand, in small batches, with an
              obsessive attention to detail.
            </p>
            <p className="text-coffee-600/80 dark:text-cream-200/70 leading-relaxed mb-8">
              From farm to cup, we believe coffee is more than a drink — it's a
              ritual, a moment of pause, a conversation. And we're honored to be
              part of yours.
            </p>
            <Link to="/about" className="btn-outline">
              Learn Our Story <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="section bg-coffee-800 text-cream-50">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block uppercase tracking-[0.25em] text-xs sm:text-sm text-gold-500 font-semibold mb-3">
              Loved by our community
            </span>
            <h2 className="heading-lg">
              Words from our <span className="text-gold-500 italic">regulars</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="bg-coffee-900/60 backdrop-blur p-7 rounded-2xl border border-coffee-700"
              >
                <div className="flex gap-1 mb-4 text-gold-500">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-cream-100/90 italic leading-relaxed mb-5">"{t.quote}"</p>
                <div>
                  <p className="font-semibold text-gold-500">{t.name}</p>
                  <p className="text-xs text-cream-200/70">{t.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-cream-100 dark:bg-coffee-900">
        <div className="container-px max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-coffee-800 rounded-3xl p-10 sm:p-16 text-center relative overflow-hidden"
          >
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gold-500/10 rounded-full blur-2xl" />
            <div className="relative">
              <span className="font-script text-3xl text-gold-500">Visit us</span>
              <h2 className="heading-lg text-cream-50 mt-2 mb-4">
                Your favorite seat is waiting.
              </h2>
              <p className="text-cream-100/80 max-w-xl mx-auto mb-8">
                Reserve your spot today and let us craft a moment you'll remember.
              </p>
              <Link to="/reservations" className="btn-primary">
                Book a Table <ArrowRight size={18} />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
