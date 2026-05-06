import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  MapPin, Phone, Mail, Clock, Send, CheckCircle2, AlertCircle,
  Instagram, Facebook, Twitter,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import PageHeader from '../components/PageHeader'
import { useSEO } from '../hooks/useSEO'

const initialForm = { name: '', email: '', subject: '', message: '' }

export default function Contact() {
  useSEO({
    title: 'Contact',
    description: 'Get in touch with Brew & Soul. Visit us at 142 Maple St, Brooklyn NY, call +1 (555) 234-7891, or send us a message.',
    keywords: 'contact brew and soul, brooklyn coffee shop contact, cafe phone email, coffee shop address brooklyn',
  })

  const [form,       setForm]       = useState(initialForm)
  const [errors,     setErrors]     = useState({})
  const [submitting, setSubmitting] = useState(false)
  const [sent,       setSent]       = useState(false)

  const handleChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
    setErrors((er) => ({ ...er, [e.target.name]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Please enter your full name (min 2 characters).'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address.'
    if (!form.subject.trim()) e.subject = 'Please add a subject.'
    if (!form.message.trim() || form.message.trim().length < 10)
      e.message = 'Please write at least 10 characters.'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return
    const errs = validate()
    setErrors(errs)
    if (Object.keys(errs).length > 0) return

    setSubmitting(true)
    setTimeout(() => {
      setSubmitting(false)
      setSent(true)
      setForm(initialForm)
      setTimeout(() => setSent(false), 6000)
    }, 1100)
  }

  const contact = [
    { icon: MapPin, title: 'Visit us', lines: ['142 Maple Street', 'Brooklyn, NY 11201'] },
    { icon: Phone,  title: 'Call us',  lines: ['+1 (555) 234-7891', 'Mon–Sun, 8am–8pm'] },
    { icon: Mail,   title: 'Email us', lines: ['hello@brewandsoul.com', 'careers@brewandsoul.com'] },
    { icon: Clock,  title: 'Open',     lines: ['Mon–Fri: 7AM – 9PM', 'Sat–Sun: 8AM – 10PM'] },
  ]

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Say hello"
        title="Get in Touch"
        subtitle="Questions, feedback, partnership ideas, or just to say hi — we'd love to hear from you."
        image="https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-cream-50 dark:bg-coffee-950 !pb-8 sm:!pb-12">
        <div className="container-px max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {contact.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="card p-6 sm:p-7 text-center"
            >
              <div className="inline-flex p-4 rounded-full bg-coffee-800 text-gold-500 mb-4">
                <c.icon size={22} aria-hidden="true" />
              </div>
              <h3 className="font-serif text-lg font-semibold text-coffee-800 dark:text-cream-50 mb-2">{c.title}</h3>
              {c.lines.map((line) => (
                <p key={line} className="text-sm text-coffee-700 dark:text-cream-200/75">{line}</p>
              ))}
            </motion.div>
          ))}
        </div>
      </section>

      <section className="section !pt-8 sm:!pt-12 bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          <motion.form
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-cream-100 dark:bg-coffee-900 rounded-3xl p-6 sm:p-10 shadow-warm border border-cream-200 dark:border-coffee-700"
          >
            <span className="eyebrow">Drop us a line</span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-coffee-800 dark:text-cream-50 mb-6">
              Send a message
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <Input name="name"  label="Your name" value={form.name}  onChange={handleChange} error={errors.name}  required disabled={submitting} />
              <Input name="email" label="Email"     value={form.email} onChange={handleChange} error={errors.email} required disabled={submitting} type="email" />
            </div>
            <div className="mt-5">
              <Input name="subject" label="Subject" value={form.subject} onChange={handleChange} error={errors.subject} required disabled={submitting} />
            </div>
            <div className="mt-5">
              <label htmlFor="contact-message"
                     className="block text-sm font-medium text-coffee-800 dark:text-cream-100 mb-2">
                Message <span className="text-gold-600 dark:text-gold-500">*</span>
              </label>
              <textarea
                id="contact-message"
                name="message"
                value={form.message}
                onChange={handleChange}
                rows={6}
                disabled={submitting}
                placeholder="Tell us what's on your mind..."
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? 'msg-error' : undefined}
                className={`w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-coffee-800 border-2
                            text-coffee-800 dark:text-cream-50 placeholder-coffee-400
                            focus:ring-2 focus:ring-gold-500/20 outline-none transition resize-none
                            disabled:opacity-70
                            ${errors.message
                              ? 'border-red-400 focus:border-red-500'
                              : 'border-cream-200 dark:border-coffee-700 focus:border-gold-500'}`}
              />
              <AnimatePresence>
                {errors.message && (
                  <motion.p id="msg-error"
                    initial={{ opacity: 0, y: -5, height: 0 }}
                    animate={{ opacity: 1, y: 0,  height: 'auto' }}
                    exit={{ opacity: 0, y: -5, height: 0 }}
                    className="flex items-center gap-1.5 mt-2 text-xs text-red-600 dark:text-red-400 font-medium overflow-hidden"
                  >
                    <AlertCircle size={13} aria-hidden="true" /> {errors.message}
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full mt-6">
              {submitting ? (
                <>
                  <span className="btn-spinner" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message <Send size={18} aria-hidden="true" />
                </>
              )}
            </button>

            <div role="status" aria-live="polite" className="min-h-[1px]">
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-5 flex items-center gap-3 p-4 rounded-xl bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/30 text-green-800 dark:text-green-300"
                  >
                    <CheckCircle2 size={20} aria-hidden="true" />
                    <p className="text-sm font-medium">Thanks! We'll get back to you within 24 hours.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6"
          >
            <div className="rounded-3xl overflow-hidden shadow-warm border border-cream-200 dark:border-coffee-700 h-64 sm:h-80 lg:h-96">
              <iframe
                title="Brew & Soul location on map"
                src="https://www.google.com/maps?q=brooklyn+brewery+brooklyn+ny&output=embed"
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="bg-coffee-800 rounded-3xl p-6 sm:p-8 text-cream-100">
              <h3 className="font-serif text-xl sm:text-2xl font-semibold mb-2">Follow our story</h3>
              <p className="text-cream-200/85 text-sm mb-5">
                New brews, behind-the-scenes, and the occasional latte art masterpiece.
              </p>
              <div className="flex gap-3">
                {[
                  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/brewandsoul' },
                  { icon: Facebook,  label: 'Facebook',  href: '#' },
                  { icon: Twitter,   label: 'Twitter',   href: '#' },
                ].map(({ icon: Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    aria-label={`${label} (opens in new tab)`}
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-coffee-700
                               hover:bg-gold-500 hover:text-coffee-900 transition-colors text-sm font-medium"
                  >
                    <Icon size={18} aria-hidden="true" /> <span className="hidden xs:inline">{label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}

function Input({ name, label, value, onChange, error, type = 'text', required, disabled }) {
  return (
    <div>
      <label htmlFor={`contact-${name}`}
             className="block text-sm font-medium text-coffee-800 dark:text-cream-100 mb-2">
        {label} {required && <span className="text-gold-600 dark:text-gold-500">*</span>}
      </label>
      <input
        id={`contact-${name}`}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        className={`w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-coffee-800 border-2
                    text-coffee-800 dark:text-cream-50 placeholder-coffee-400
                    focus:ring-2 focus:ring-gold-500/20 outline-none transition disabled:opacity-70
                    ${error
                      ? 'border-red-400 focus:border-red-500'
                      : 'border-cream-200 dark:border-coffee-700 focus:border-gold-500'}`}
      />
      <AnimatePresence>
        {error && (
          <motion.p id={`${name}-error`}
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0,  height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="flex items-center gap-1.5 mt-2 text-xs text-red-600 dark:text-red-400 font-medium overflow-hidden"
          >
            <AlertCircle size={13} aria-hidden="true" /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}
