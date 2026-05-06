import { motion } from 'framer-motion'

export default function PageHeader({ eyebrow, title, subtitle, image }) {
  return (
    <section
      className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-28 overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(rgba(42,26,20,0.72), rgba(42,26,20,0.88)), url(${image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="container-px max-w-5xl mx-auto text-center relative z-10">
        {eyebrow && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block uppercase tracking-[0.3em] text-[11px] sm:text-xs text-gold-500 font-semibold mb-4"
          >
            {eyebrow}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="font-serif text-[2.25rem] sm:text-5xl lg:text-6xl font-bold text-cream-50 mb-4 leading-[1.1]"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-cream-100/85 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  )
}
