import { motion } from 'framer-motion'
import {
  Leaf, Coffee, Home as HomeIcon, Croissant,
  Instagram, Twitter, Linkedin, Quote,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import PageHeader from '../components/PageHeader'
import Parallax from '../components/Parallax'
import LazyImage from '../components/LazyImage'
import { useCountUp } from '../hooks/useCountUp'
import { useSEO } from '../hooks/useSEO'

const timeline = [
  { year: '2018', title: 'A dream is brewed', desc:  'Founder Maya Hart roasts her first batch of beans in a tiny Brooklyn basement — a 5kg drum, one rule: never serve a cup you wouldn\'t be proud of.' },
  { year: '2019', title: 'Doors open',        desc:  'Brew & Soul opens on Maple Street with 12 seats, a single espresso machine, and a line out the door by week two.' },
  { year: '2020', title: 'Community first',   desc:  'During the lockdown, we deliver coffee and pastries by bike to neighbors and frontline workers — over 4,000 cups, free of charge.' },
  { year: '2021', title: 'Direct trade journey', desc: 'Maya travels to farms in Ethiopia, Colombia, and Guatemala to forge direct-trade partnerships with smallholder growers.' },
  { year: '2022', title: 'In-house roasting', desc:  'We move our roastery on-site so guests can watch — and smell — the magic happen every morning.' },
  { year: '2023', title: 'Award winning',     desc:  'Voted "Best Café in Brooklyn" — a recognition we owe entirely to our incredible community of regulars.' },
  { year: '2024', title: 'A new chapter',     desc:  'We expand the seating, launch our pastry program with chef Sofia Reyes, and welcome you to the next chapter.' },
]

const reasons = [
  { icon: Leaf,    title: 'Ethically Sourced Beans', desc: 'We partner directly with smallholder farms and pay above fair-trade prices for traceable, single-origin coffee.' },
  { icon: Coffee,  title: 'Expert Baristas',         desc: 'Every barista on our team is SCA-certified and trained for 90+ hours before they pull their first paid shot.' },
  { icon: HomeIcon, title: 'Cozy Atmosphere',        desc: 'Warm lighting, soft music, real plants, comfortable seating — designed to make you want to stay a while.' },
  { icon: Croissant, title: 'Fresh Daily Bakes',     desc: 'Our pastry chef arrives at 4 AM so the croissants, scones, and babka are still warm when our doors open.' },
]

const team = [
  { name:  'Maya Hart',   role:  'Founder & Head Roaster', bio: 'A Q-grader and ten-year veteran of the specialty coffee world. Maya tastes every roast before it leaves the building.', img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80', quote: 'Coffee is the most generous beverage on earth — it asks for so little and gives back so much.', socials: { instagram: '#', twitter: '#', linkedin: '#' } },
  { name:  'James Olsen', role:  'Lead Barista',           bio: 'Two-time regional latte-art finalist. James designed our signature Caramel Cloud Latte and runs our barista training program.', img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80', quote: 'Every cup is a 30-second conversation. Make it a good one.', socials: { instagram: '#', twitter: '#', linkedin: '#' } },
  { name:  'Sofia Reyes', role:  'Head Pastry Chef',       bio: 'Trained in Lyon and Brooklyn. Sofia laminates her own butter, mills her own flour blends, and never measures anything by eye.', img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80', quote: 'A great pastry should make you close your eyes on the first bite.', socials: { instagram: '#', twitter: '#', linkedin: '#' } },
]

const stats = [
  { value: 50000, suffix: '+', label: 'Cups Served',       format: 'thousand' },
  { value: 15,    suffix: '+', label: 'Bean Origins'                          },
  { value: 6,     suffix: '',  label: 'Years of Excellence'                   },
  { value: 4.9,   suffix: '★', label: 'Average Rating',     decimals: 1       },
]

function formatNumber(n, opts = {}) {
  if (opts.decimals != null) return n.toFixed(opts.decimals)
  if (opts.format === 'thousand') return Math.floor(n).toLocaleString('en-US')
  return Math.floor(n).toString()
}

function StatCounter({ value, suffix, label, decimals, format, delay = 0 }) {
  const [current, ref] = useCountUp(value, 2200)
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="text-center"
    >
      <div className="font-serif font-bold text-gold-500 leading-none text-4xl sm:text-5xl lg:text-6xl tabular-nums tracking-tight">
        {formatNumber(current, { decimals, format })}
        <span className="text-gold-500/90">{suffix}</span>
      </div>
      <div className="mt-3 h-px w-12 bg-gold-500/40 mx-auto" />
      <div className="mt-3 text-cream-100/80 text-xs sm:text-sm uppercase tracking-[0.25em] font-medium">{label}</div>
    </motion.div>
  )
}

function TimelineItem({ entry, index }) {
  const isLeft = index % 2 === 0
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6 }}
      className="relative md:grid md:grid-cols-9 md:gap-6 items-center pb-12 last:pb-0"
    >
      <div className={`md:col-span-4 md:text-right ${isLeft ? '' : 'md:order-3 md:text-left'} pl-12 md:pl-0`}>
        <div className={`bg-cream-50 dark:bg-coffee-800/60 border border-cream-200 dark:border-coffee-700 rounded-2xl p-6 shadow-warm hover:shadow-gold transition-shadow duration-300 ${isLeft ? 'md:mr-4' : 'md:ml-4'}`}>
          <span className="font-script text-2xl text-gold-600 dark:text-gold-500 leading-none">Chapter {index + 1}</span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-coffee-800 dark:text-cream-50 mt-1 mb-2">{entry.title}</h3>
          <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm leading-relaxed">{entry.desc}</p>
        </div>
      </div>

      <div className="absolute left-0 top-2 md:static md:col-span-1 md:flex md:justify-center">
        <div className="relative flex md:flex-col items-center gap-3">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 250 }}
            className="relative z-10 w-6 h-6 rounded-full bg-gold-500 border-4 border-cream-50 dark:border-coffee-950 shadow-[0_0_0_3px_rgba(201,169,97,0.35)]"
          >
            <span className="absolute inset-0 rounded-full bg-gold-500/40 animate-ping" />
          </motion.div>
          <div className="hidden md:block absolute md:relative md:mt-3 bg-coffee-800 text-gold-500 px-4 py-1.5 rounded-full font-serif font-bold text-sm shadow-warm">
            {entry.year}
          </div>
        </div>
      </div>

      <div className="md:hidden absolute left-12 -top-1">
        <span className="inline-block bg-coffee-800 text-gold-500 px-3 py-1 rounded-full font-serif font-bold text-xs shadow-warm">{entry.year}</span>
      </div>

      {isLeft ? <div className="hidden md:block md:col-span-4" /> : null}
    </motion.div>
  )
}

function TeamCard({ member, delay }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      whileHover={{ y: -8 }}
      className="group bg-cream-50 dark:bg-coffee-800/60 rounded-3xl overflow-hidden border border-cream-200 dark:border-coffee-700 shadow-warm hover:shadow-gold transition-shadow duration-300"
    >
      <div className="relative h-80 sm:h-96 overflow-hidden">
        <LazyImage src={member.img} alt={member.name} className="absolute inset-0" imgClassName="group-hover:scale-110 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-coffee-900/80 via-transparent to-transparent" />
        <div className="absolute inset-0 flex items-end p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay + 0.3 }}
            className="text-cream-50"
          >
            <Quote size={20} className="text-gold-500 mb-2" />
            <p className="font-serif italic text-sm sm:text-base leading-snug">"{member.quote}"</p>
          </motion.div>
        </div>
      </div>

      <div className="p-6 sm:p-7">
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-coffee-800 dark:text-cream-50">{member.name}</h3>
        <p className="text-xs uppercase tracking-[0.25em] text-gold-600 dark:text-gold-500 font-semibold mt-1">{member.role}</p>
        <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm leading-relaxed mt-4">{member.bio}</p>
        <div className="flex items-center gap-2 mt-5 pt-5 border-t border-cream-200 dark:border-coffee-700">
          {[
            { Icon: Instagram, href: member.socials.instagram, label: 'Instagram' },
            { Icon: Twitter,   href: member.socials.twitter,   label: 'Twitter'   },
            { Icon: Linkedin,  href: member.socials.linkedin,  label: 'LinkedIn'  },
          ].map(({ Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={`${member.name} on ${label}`}
              className="p-2 rounded-full bg-cream-100 dark:bg-coffee-700 text-coffee-700 dark:text-cream-100 hover:bg-gold-500 hover:text-coffee-900 transition-colors"
            >
              <Icon size={15} />
            </a>
          ))}
        </div>
      </div>
    </motion.article>
  )
}

function ReasonCard({ reason, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.55 }}
      whileHover={{ y: -6 }}
      className="group relative bg-cream-50 dark:bg-coffee-800/60 rounded-2xl p-7 border border-cream-200 dark:border-coffee-700 shadow-warm hover:shadow-gold transition-shadow duration-300 overflow-hidden"
    >
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold-500/10 rounded-full blur-2xl group-hover:bg-gold-500/25 transition-colors duration-500" />
      <span className="absolute top-5 right-5 font-serif font-bold text-5xl text-coffee-200/60 dark:text-coffee-700/80 group-hover:text-gold-500/40 transition-colors">0{index + 1}</span>
      <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-coffee-800 text-gold-500 mb-5 group-hover:bg-gold-500 group-hover:text-coffee-900 transition-colors duration-300 shadow-warm">
        <reason.icon size={26} />
      </div>
      <h3 className="font-serif text-xl font-bold text-coffee-800 dark:text-cream-50 mb-2 relative">{reason.title}</h3>
      <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm leading-relaxed relative">{reason.desc}</p>
    </motion.div>
  )
}

export default function About() {
  useSEO({
    title: 'About Us',
    description: 'Meet Brew & Soul — a Brooklyn café roasting ethically sourced coffee since 2018. Discover our story, team, and values.',
    keywords: 'about brew and soul, brooklyn coffee roaster, coffee shop story, specialty coffee team, ethically sourced coffee',
  })

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Our story"
        title="About Brew & Soul"
        subtitle="From a single roaster in a Brooklyn basement to your favorite neighborhood café."
        image="https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative grid grid-cols-2 gap-4">
                <LazyImage src="https://images.unsplash.com/photo-1453614512568-c4024d13c247?auto=format&fit=crop&w=600&q=80" alt="Barista" className="rounded-2xl h-56 sm:h-72 w-full shadow-warm" />
                <LazyImage src="https://images.unsplash.com/photo-1442975631115-c4f7b05b8a2c?auto=format&fit=crop&w=600&q=80" alt="Latte art" className="rounded-2xl h-56 sm:h-72 w-full shadow-warm mt-8" />
              </div>
              <div className="hidden sm:block absolute -bottom-6 -left-6 bg-coffee-800 text-cream-50 p-5 rounded-2xl shadow-warm border border-coffee-700">
                <p className="font-script text-2xl text-gold-500 leading-none">Est.</p>
                <p className="font-serif text-3xl font-bold leading-none mt-1">2018</p>
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
                Six years of pouring our <span className="text-gold-600 dark:text-gold-500 italic">soul</span> into every cup
              </h2>
              <p className="text-coffee-700 dark:text-cream-100/80 leading-relaxed mb-4">
                Brew & Soul began with a single belief: that great coffee is more than a beverage — it's a moment, a ritual, and a reason to gather. From a tiny Brooklyn basement in 2018 to the warm corner café you know today, every chapter of our story has been written one cup at a time.
              </p>
              <p className="text-coffee-600/80 dark:text-cream-200/70 leading-relaxed">
                We're a small team obsessed with the craft. We roast in micro-batches, pull every shot with intention, and bake everything fresh that morning. And we'd be honored to share a cup with you.
              </p>
            </motion.div>
          </div>

          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">2018 → 2024</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50">
              Our <span className="text-gold-600 dark:text-gold-500 italic">journey</span> so far
            </h2>
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="absolute left-3 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-gold-500/40 to-transparent md:-translate-x-1/2" />
            {timeline.map((entry, i) => (
              <TimelineItem key={entry.year} entry={entry} index={i} />
            ))}
          </div>
        </div>
      </section>

      <Parallax
        image="https://images.unsplash.com/photo-1559925393-8be0ec4767c8?auto=format&fit=crop&w=2000&q=80"
        overlay="bg-gradient-to-b from-cream-50 via-cream-100/95 to-cream-50 dark:from-coffee-950 dark:via-coffee-900/95 dark:to-coffee-950"
        speed={0.25}
        className="section"
      >
        <div className="container-px max-w-7xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Why choose us</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50">
              Reasons our regulars keep <span className="text-gold-600 dark:text-gold-500 italic">coming back</span>
            </h2>
            <p className="mt-4 text-coffee-600/80 dark:text-cream-200/70">Four small obsessions that add up to one really good cup of coffee.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {reasons.map((r, i) => <ReasonCard key={r.title} reason={r} index={i} />)}
          </div>
        </div>
      </Parallax>

      <Parallax
        image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=2000&q=80"
        overlay="bg-gradient-to-r from-coffee-900/95 via-coffee-900/90 to-coffee-900/95"
        speed={0.4}
        className="py-20 sm:py-28"
      >
        <div className="absolute top-1/2 -left-20 w-72 h-72 bg-gold-500/15 rounded-full blur-3xl -translate-y-1/2" />
        <div className="absolute top-1/2 -right-20 w-72 h-72 bg-gold-600/10 rounded-full blur-3xl -translate-y-1/2" />

        <div className="container-px max-w-7xl mx-auto relative">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="inline-block uppercase tracking-[0.3em] text-xs sm:text-sm text-gold-500 font-semibold mb-3">By the numbers</span>
            <h2 className="heading-lg text-cream-50">
              A few things we're <span className="text-gold-500 italic">proud of</span>
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
            {stats.map((s, i) => <StatCounter key={s.label} {...s} delay={i * 0.1} />)}
          </div>
        </div>
      </Parallax>

      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <span className="eyebrow">Behind the bar</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50">
              Meet the <span className="text-gold-600 dark:text-gold-500 italic">team</span>
            </h2>
            <p className="mt-4 text-coffee-600/80 dark:text-cream-200/70">The hands, hearts, and obsessions behind every cup we serve.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {team.map((member, i) => <TeamCard key={member.name} member={member} delay={i * 0.12} />)}
          </div>
        </div>
      </section>

      <section className="section bg-cream-100 dark:bg-coffee-900">
        <div className="container-px max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="font-script text-4xl text-gold-600 dark:text-gold-500">— ❦ —</span>
            <h2 className="heading-lg text-coffee-800 dark:text-cream-50 mt-3 mb-5">Come write the next chapter with us</h2>
            <p className="text-coffee-700 dark:text-cream-100/80 max-w-xl mx-auto mb-8 leading-relaxed">
              Your favorite seat is waiting. Stop by, stay a while, and let us brew you something memorable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/reservations" className="btn-primary">Reserve a Table</a>
              <a href="/menu"          className="btn-outline">Explore the Menu</a>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
