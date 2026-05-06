import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Calendar, Clock, Users, User, Mail, Phone, MessageSquare,
  CheckCircle2, MapPin, ChevronLeft, ChevronRight, AlertCircle,
  Coffee, PartyPopper, Download, CalendarPlus, Sparkles, ExternalLink,
} from 'lucide-react'
import PageWrapper from '../components/PageWrapper'
import PageHeader from '../components/PageHeader'
import DatePicker from '../components/DatePicker'
import { useSEO } from '../hooks/useSEO'

const generateSlots = () => {
  const slots = []
  for (let h = 9; h <= 21; h++) {
    slots.push({ h, m:  0 })
    if (h !== 21) slots.push({ h, m: 30 })
  }
  return slots.map(({ h, m }) => {
    const period = h >= 12 ? 'PM' : 'AM'
    const hr     = h > 12 ? h - 12 : h
    return `${hr}:${m === 0 ? '00' : '30'} ${period}`
  })
}
const TIME_SLOTS = generateSlots()
const GUEST_OPTIONS = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const stepVariants = {
  enter:  (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:   (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
}

function Stepper({ step }) {
  const steps = ['Details', 'Confirm', 'Success']
  return (
    <div className="flex items-center justify-center gap-3 sm:gap-5 mb-10">
      {steps.map((label, i) => {
        const idx       = i + 1
        const isActive  = step === idx
        const isDone    = step > idx
        return (
          <div key={label} className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2.5">
              <motion.div
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isDone || isActive ? '#C9A961' : '#F5E6D3',
                  color:           isDone || isActive ? '#2A1A14' : '#A87E4F',
                }}
                transition={{ duration: 0.3 }}
                className="relative w-9 h-9 rounded-full flex items-center justify-center font-serif font-bold text-sm shadow-warm"
              >
                {isDone ? <CheckCircle2 size={18} /> : idx}
                {isActive && <span className="absolute inset-0 rounded-full bg-gold-500/40 animate-ping" />}
              </motion.div>
              <span className={`hidden sm:inline text-sm font-semibold
                              ${isActive ? 'text-coffee-900 dark:text-cream-50' : isDone ? 'text-gold-600 dark:text-gold-500' : 'text-coffee-500 dark:text-cream-200/60'}`}>
                {label}
              </span>
            </div>
            {idx < steps.length && (
              <div className="relative w-8 sm:w-12 h-0.5 bg-cream-200 dark:bg-coffee-700 overflow-hidden rounded-full">
                <motion.div
                  initial={{ width: '0%' }}
                  animate={{ width: isDone ? '100%' : '0%' }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="absolute inset-y-0 left-0 bg-gold-500"
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

function Field({ icon: Icon, name, type, label, value, onChange, placeholder, error, required }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-coffee-800 dark:text-cream-100 mb-2">
        {label} {required && <span className="text-gold-600 dark:text-gold-500">*</span>}
      </label>
      <div className="relative">
        {Icon && (
          <Icon size={18} className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${error ? 'text-red-500' : 'text-coffee-500'}`} />
        )}
        <input
          id={name} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
          className={`w-full ${Icon ? 'pl-12' : 'pl-4'} pr-4 py-3 rounded-xl bg-cream-50 dark:bg-coffee-900
                      border-2 text-coffee-800 dark:text-cream-50 placeholder-coffee-400
                      focus:ring-2 focus:ring-gold-500/20 outline-none transition
                      ${error ? 'border-red-400 focus:border-red-500' : 'border-cream-200 dark:border-coffee-700 focus:border-gold-500'}`}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -5, height: 0 }}
            animate={{ opacity: 1, y: 0,  height: 'auto' }}
            exit={{ opacity: 0, y: -5, height: 0 }}
            className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-medium overflow-hidden"
          >
            <AlertCircle size={13} /> {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  )
}

function Step1({ form, setForm, errors, onNext }) {
  const update = (key) => (val) => setForm((f) => ({ ...f, [key]: val }))
  const onInput = (e) => setForm((f) => ({ ...f, [e.target.name]: e.target.value }))

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold text-coffee-800 dark:text-cream-100 mb-3">
            <Calendar size={16} className="text-gold-600 dark:text-gold-500" />
            Choose a date <span className="text-gold-600 dark:text-gold-500">*</span>
          </label>
          <DatePicker value={form.date} onChange={update('date')} />
          <AnimatePresence>
            {errors.date && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-medium"
              >
                <AlertCircle size={13} /> {errors.date}
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="space-y-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-coffee-800 dark:text-cream-100 mb-3">
              <Clock size={16} className="text-gold-600 dark:text-gold-500" />
              Pick a time <span className="text-gold-600 dark:text-gold-500">*</span>
            </label>
            <div className="bg-cream-50 dark:bg-coffee-900 rounded-2xl border border-cream-200 dark:border-coffee-700 p-4 shadow-warm max-h-[260px] overflow-y-auto">
              <div className="grid grid-cols-3 gap-2">
                {TIME_SLOTS.map((t) => {
                  const selected = form.time === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => update('time')(t)}
                      className={`px-2 py-2.5 rounded-lg text-sm font-medium transition-all
                                 ${selected
                                   ? 'bg-coffee-800 text-gold-500 shadow-warm scale-[1.02]'
                                   : 'bg-cream-100 dark:bg-coffee-800 text-coffee-700 dark:text-cream-200 hover:bg-gold-500/15 hover:text-coffee-900 dark:hover:text-gold-400'}`}
                    >
                      {t}
                    </button>
                  )
                })}
              </div>
            </div>
            <AnimatePresence>
              {errors.time && (
                <motion.p
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-1.5 mt-2 text-xs text-red-600 font-medium"
                >
                  <AlertCircle size={13} /> {errors.time}
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-coffee-800 dark:text-cream-100 mb-3">
              <Users size={16} className="text-gold-600 dark:text-gold-500" />
              How many guests? <span className="text-gold-600 dark:text-gold-500">*</span>
            </label>
            <div className="bg-cream-50 dark:bg-coffee-900 rounded-2xl border border-cream-200 dark:border-coffee-700 p-4 shadow-warm">
              <div className="grid grid-cols-5 gap-2">
                {GUEST_OPTIONS.map((n) => {
                  const selected = form.guests === n
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => update('guests')(n)}
                      className={`relative aspect-square rounded-xl font-bold text-base transition-all duration-200
                                  ${selected ? 'bg-coffee-800 text-gold-500 shadow-warm scale-105' : 'bg-cream-100 dark:bg-coffee-800 text-coffee-700 dark:text-cream-200 hover:bg-gold-500/15'}`}
                    >
                      {n}
                    </button>
                  )
                })}
              </div>
              <p className="text-[11px] text-coffee-500 dark:text-cream-200/60 mt-3 text-center">
                Parties of 8+ — please call us at <span className="text-gold-600 font-semibold">+1 (555) 234-7891</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-serif text-lg font-bold text-coffee-800 dark:text-cream-50 mb-4 flex items-center gap-2">
          <User size={18} className="text-gold-600 dark:text-gold-500" /> Your details
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <Field icon={User}  name="name"  type="text"  label="Full name"    value={form.name}  onChange={onInput} placeholder="Jane Doe"           error={errors.name} required />
          <Field icon={Mail}  name="email" type="email" label="Email address" value={form.email} onChange={onInput} placeholder="jane@example.com"   error={errors.email} required />
          <Field icon={Phone} name="phone" type="tel"   label="Phone number"  value={form.phone} onChange={onInput} placeholder="+1 (555) 000-0000"  error={errors.phone} required />
          <div>
            <label className="block text-sm font-semibold text-coffee-800 dark:text-cream-100 mb-2">
              Special occasion <span className="text-coffee-500 font-normal text-xs">(optional)</span>
            </label>
            <div className="relative">
              <PartyPopper size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-500" />
              <select
                name="occasion" value={form.occasion} onChange={onInput}
                className="w-full pl-12 pr-4 py-3 rounded-xl bg-cream-50 dark:bg-coffee-900 border-2 border-cream-200 dark:border-coffee-700 text-coffee-800 dark:text-cream-50 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition appearance-none cursor-pointer"
              >
                <option value="">— None —</option>
                <option value="Birthday">Birthday</option>
                <option value="Anniversary">Anniversary</option>
                <option value="Date">Date night</option>
                <option value="Business">Business meeting</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm font-semibold text-coffee-800 dark:text-cream-100 mb-2 flex items-center gap-2">
          <MessageSquare size={16} className="text-gold-600 dark:text-gold-500" />
          Special requests
          <span className="text-coffee-500 font-normal text-xs ml-1">(optional)</span>
        </label>
        <div className="relative">
          <textarea
            name="notes" value={form.notes} onChange={onInput} rows={4} maxLength={500}
            placeholder="Allergies, accessibility needs, window seat, surprise dessert…"
            className="w-full px-4 py-3 rounded-xl bg-cream-50 dark:bg-coffee-900 border-2 border-cream-200 dark:border-coffee-700 text-coffee-800 dark:text-cream-50 placeholder-coffee-400 focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 outline-none transition resize-none"
          />
          <span className="absolute bottom-3 right-4 text-xs text-coffee-400">{form.notes.length}/500</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
        <p className="text-xs text-coffee-500 dark:text-cream-200/60 italic">
          We hold your table for 15 min past the reservation time.
        </p>
        <button
          type="button"
          onClick={onNext}
          className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-coffee-900 font-semibold shadow-[0_15px_35px_-10px_rgba(201,169,97,0.55)] hover:shadow-[0_20px_45px_-10px_rgba(201,169,97,0.75)] hover:-translate-y-0.5 transition-all duration-300"
        >
          Review reservation <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}

function Step2({ form, onBack, onConfirm, submitting }) {
  const formattedDate = form.date?.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })

  const summary = [
    { label: 'Name',   value: form.name,             icon: User     },
    { label: 'Email',  value: form.email,            icon: Mail     },
    { label: 'Phone',  value: form.phone,            icon: Phone    },
    { label: 'Date',   value: formattedDate,         icon: Calendar },
    { label: 'Time',   value: form.time,             icon: Clock    },
    { label: 'Guests', value: `${form.guests} ${form.guests === 1 ? 'person' : 'people'}`, icon: Users },
    ...(form.occasion ? [{ label: 'Occasion', value: form.occasion, icon: PartyPopper }] : []),
  ]

  return (
    <div className="space-y-8">
      <div className="text-center">
        <span className="font-script text-3xl text-gold-600 dark:text-gold-500">Almost there</span>
        <h2 className="font-serif text-3xl font-bold text-coffee-800 dark:text-cream-50 mt-1">Please review your reservation</h2>
        <p className="text-coffee-600/80 dark:text-cream-200/70 text-sm mt-2">
          Double-check the details below — we'll send a confirmation to your email.
        </p>
      </div>

      <div className="relative bg-gradient-to-br from-cream-100 to-cream-50 dark:from-coffee-800 dark:to-coffee-900 rounded-2xl p-6 sm:p-8 border-2 border-gold-500/30 shadow-warm overflow-hidden">
        <Coffee size={120} className="absolute -top-6 -right-6 text-gold-500/10" />
        <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5">
          {summary.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-gold-500/15 text-gold-600 dark:text-gold-500 shrink-0">
                <item.icon size={16} />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] uppercase tracking-widest text-coffee-500 dark:text-cream-200/60 font-semibold mb-0.5">{item.label}</div>
                <div className="text-coffee-900 dark:text-cream-50 font-semibold break-words">{item.value}</div>
              </div>
            </div>
          ))}
        </div>

        {form.notes && (
          <div className="mt-6 pt-6 border-t border-gold-500/20">
            <div className="text-[10px] uppercase tracking-widest text-coffee-500 dark:text-cream-200/60 font-semibold mb-1.5">Special requests</div>
            <p className="text-coffee-800 dark:text-cream-100 text-sm italic leading-relaxed">"{form.notes}"</p>
          </div>
        )}
      </div>

      <div className="bg-coffee-800 text-cream-100 p-5 rounded-2xl text-sm flex gap-3">
        <Sparkles size={18} className="text-gold-500 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-cream-200/90">
          By confirming, you agree to our friendly cancellation policy: please give us a heads up at least <span className="font-semibold text-gold-500">2 hours in advance</span> if your plans change. ❤
        </p>
      </div>

      <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-4">
        <button
          type="button" onClick={onBack} disabled={submitting}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full border-2 border-coffee-300 dark:border-coffee-700 text-coffee-700 dark:text-cream-100 hover:bg-coffee-100 dark:hover:bg-coffee-800 font-semibold transition-colors disabled:opacity-50"
        >
          <ChevronLeft size={18} /> Back to edit
        </button>
        <button
          type="button" onClick={onConfirm} disabled={submitting}
          className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-gold-500 hover:bg-gold-400 text-coffee-900 font-semibold shadow-[0_15px_35px_-10px_rgba(201,169,97,0.55)] hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-70 disabled:cursor-wait"
        >
          {submitting ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-coffee-900 border-t-transparent animate-spin" />
              Confirming…
            </>
          ) : (<>Confirm reservation <CheckCircle2 size={18} /></>)}
        </button>
      </div>
    </div>
  )
}

function Step3({ form, bookingId, onReset }) {
  const formattedDate = form.date?.toLocaleDateString('en-US', {
    weekday: 'long', month: 'long', day: 'numeric', year: 'numeric',
  })

  return (
    <div className="text-center">
      <motion.div
        initial={{ scale: 0, rotate: -45 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 16, delay: 0.1 }}
        className="relative mx-auto w-24 h-24 rounded-full bg-gold-500 flex items-center justify-center shadow-[0_20px_45px_-10px_rgba(201,169,97,0.6)] mb-6"
      >
        <CheckCircle2 size={48} className="text-coffee-900" strokeWidth={2.5} />
        <span className="absolute inset-0 rounded-full bg-gold-500/40 animate-ping" />
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <motion.span
              key={i}
              initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
              animate={{ scale: [0, 1, 0], opacity: [1, 1, 0], x: Math.cos(angle) * 70, y: Math.sin(angle) * 70 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="absolute w-2 h-2 rounded-full bg-gold-500"
            />
          )
        })}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <span className="font-script text-3xl text-gold-600 dark:text-gold-500">You're all set!</span>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-coffee-800 dark:text-cream-50 mt-1 mb-3">Reservation confirmed</h2>
        <p className="text-coffee-600/80 dark:text-cream-200/70 max-w-md mx-auto leading-relaxed">
          Thanks, <span className="font-semibold text-coffee-800 dark:text-cream-50">{form.name.split(' ')[0]}</span>!
          We've sent a confirmation to <span className="font-semibold text-coffee-800 dark:text-cream-50">{form.email}</span>.
          Your favorite seat will be waiting.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 mx-auto max-w-md bg-cream-100 dark:bg-coffee-800 rounded-2xl p-6 border-2 border-gold-500/30 shadow-warm text-left"
      >
        <div className="flex items-center justify-between pb-4 border-b border-dashed border-coffee-300 dark:border-coffee-700">
          <span className="text-xs uppercase tracking-widest text-coffee-500 dark:text-cream-200/60 font-semibold">Booking ID</span>
          <span className="font-mono font-bold text-coffee-900 dark:text-cream-50">{bookingId}</span>
        </div>

        <div className="py-4 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-coffee-600 dark:text-cream-200/70 flex items-center gap-2"><Calendar size={14} /> Date</span>
            <span className="font-semibold text-coffee-900 dark:text-cream-50">{formattedDate}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-coffee-600 dark:text-cream-200/70 flex items-center gap-2"><Clock size={14} /> Time</span>
            <span className="font-semibold text-coffee-900 dark:text-cream-50">{form.time}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-coffee-600 dark:text-cream-200/70 flex items-center gap-2"><Users size={14} /> Guests</span>
            <span className="font-semibold text-coffee-900 dark:text-cream-50">{form.guests} {form.guests === 1 ? 'person' : 'people'}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-coffee-600 dark:text-cream-200/70 flex items-center gap-2"><MapPin size={14} /> Location</span>
            <span className="font-semibold text-coffee-900 dark:text-cream-50 text-right">142 Maple St,<br/>Brooklyn NY</span>
          </div>
        </div>

        <div className="relative -mx-6 mt-2">
          <div className="border-t-2 border-dashed border-coffee-300 dark:border-coffee-700" />
          <span className="absolute -left-2 -top-2 w-4 h-4 rounded-full bg-cream-50 dark:bg-coffee-950" />
          <span className="absolute -right-2 -top-2 w-4 h-4 rounded-full bg-cream-50 dark:bg-coffee-950" />
        </div>

        <div className="pt-4 text-center">
          <p className="font-script text-xl text-gold-600 dark:text-gold-500">See you soon ☕</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-coffee-800 text-cream-50 hover:bg-coffee-900 font-semibold transition-colors text-sm">
          <CalendarPlus size={16} /> Add to calendar
        </button>
        <button className="inline-flex items-center gap-2 px-5 py-3 rounded-full border-2 border-coffee-300 dark:border-coffee-700 text-coffee-700 dark:text-cream-100 hover:bg-cream-100 dark:hover:bg-coffee-800 font-semibold transition-colors text-sm">
          <Download size={16} /> Download receipt
        </button>
        <button onClick={onReset}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-full text-coffee-700 dark:text-cream-100 hover:text-coffee-900 dark:hover:text-cream-50 font-semibold transition-colors text-sm">
          Make another booking <ChevronRight size={16} />
        </button>
      </motion.div>
    </div>
  )
}

function SidePanel() {
  return (
    <aside className="space-y-6 lg:sticky lg:top-28 self-start">
      <div className="bg-coffee-800 text-cream-100 rounded-2xl p-6 shadow-warm">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={18} className="text-gold-500" />
          <h3 className="font-serif text-lg font-bold">Opening Hours</h3>
        </div>
        <ul className="space-y-2 text-sm">
          {[
            ['Monday – Friday', '7:00 AM – 9:00 PM'],
            ['Saturday',        '8:00 AM – 10:00 PM'],
            ['Sunday',          '8:00 AM – 8:00 PM'],
          ].map(([day, hrs]) => (
            <li key={day} className="flex items-center justify-between gap-3 py-1.5 border-b border-coffee-700/50 last:border-0">
              <span className="text-cream-200/80">{day}</span>
              <span className="font-semibold text-gold-500">{hrs}</span>
            </li>
          ))}
        </ul>
        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/15 border border-green-500/30">
          <span className="relative flex w-2 h-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75 animate-ping" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
          </span>
          <span className="text-xs font-semibold text-green-300">Open now</span>
        </div>
      </div>

      <div className="bg-cream-50 dark:bg-coffee-800 rounded-2xl border border-cream-200 dark:border-coffee-700 shadow-warm overflow-hidden">
        <div className="h-56 relative">
          <iframe
            title="Brew & Soul location"
            src="https://www.google.com/maps?q=brooklyn+brewery+brooklyn+ny&output=embed"
            className="absolute inset-0 w-full h-full grayscale-[0.2]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        <div className="p-5">
          <div className="flex items-start gap-2 mb-3">
            <MapPin size={18} className="text-gold-600 dark:text-gold-500 mt-0.5 shrink-0" />
            <div>
              <h3 className="font-serif font-bold text-coffee-800 dark:text-cream-50">Visit our café</h3>
              <p className="text-sm text-coffee-600/80 dark:text-cream-200/70 mt-0.5">142 Maple Street<br/>Brooklyn, NY 11201</p>
            </div>
          </div>
          <a href="https://maps.google.com/?q=142+Maple+St+Brooklyn+NY+11201" target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-gold-600 dark:text-gold-500 hover:text-gold-700 transition-colors">
            Get directions <ExternalLink size={13} />
          </a>
        </div>
      </div>

      <div className="bg-cream-100 dark:bg-coffee-800 rounded-2xl border border-cream-200 dark:border-coffee-700 p-6 shadow-warm">
        <h3 className="font-serif text-lg font-bold text-coffee-800 dark:text-cream-50 mb-4">Need help booking?</h3>
        <div className="space-y-3 text-sm">
          <a href="tel:+15552347891" className="flex items-center gap-3 p-3 rounded-xl bg-cream-50 dark:bg-coffee-900 hover:bg-gold-500/10 transition-colors group">
            <div className="p-2 rounded-lg bg-coffee-800 text-gold-500 group-hover:bg-gold-500 group-hover:text-coffee-900 transition-colors">
              <Phone size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-coffee-500 dark:text-cream-200/60 font-semibold">Call us</div>
              <div className="font-semibold text-coffee-900 dark:text-cream-50">+1 (555) 234-7891</div>
            </div>
          </a>
          <a href="mailto:hello@brewandsoul.com" className="flex items-center gap-3 p-3 rounded-xl bg-cream-50 dark:bg-coffee-900 hover:bg-gold-500/10 transition-colors group">
            <div className="p-2 rounded-lg bg-coffee-800 text-gold-500 group-hover:bg-gold-500 group-hover:text-coffee-900 transition-colors">
              <Mail size={16} />
            </div>
            <div>
              <div className="text-[10px] uppercase tracking-widest text-coffee-500 dark:text-cream-200/60 font-semibold">Email us</div>
              <div className="font-semibold text-coffee-900 dark:text-cream-50">hello@brewandsoul.com</div>
            </div>
          </a>
        </div>
        <p className="font-script text-2xl text-gold-600 dark:text-gold-500 mt-5 text-center">Can't wait to host you!</p>
      </div>
    </aside>
  )
}

export default function Reservations() {
  useSEO({
    title: 'Reservations',
    description: 'Reserve a table at Brew & Soul. Pick your date, time, and party size for a cozy café experience in Brooklyn.',
    keywords: 'reservations, book a table, brooklyn coffee shop reservation, brew and soul booking, cafe reservation',
  })

  const [step,       setStep]       = useState(1)
  const [direction,  setDirection]  = useState(1)
  const [submitting, setSubmitting] = useState(false)
  const [bookingId,  setBookingId]  = useState(null)
  const [errors,     setErrors]     = useState({})

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    date: null, time: '', guests: 2,
    occasion: '', notes: '',
  })

  const validate = () => {
    const e = {}
    if (!form.name.trim() || form.name.trim().length < 2)
      e.name = 'Please enter your full name (min 2 characters).'
    if (!form.email.trim()) e.email = 'Email is required.'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = 'Please enter a valid email address.'
    if (!form.phone.trim()) e.phone = 'Phone number is required.'
    else if (!/^[\d\s+()-]{7,}$/.test(form.phone))
      e.phone = 'Please enter a valid phone number.'
    if (!form.date) e.date = 'Please choose a date for your visit.'
    if (!form.time) e.time = 'Please pick a time slot.'
    return e
  }

  const handleNext = () => {
    const e = validate()
    setErrors(e)
    if (Object.keys(e).length === 0) {
      setDirection(1)
      setStep(2)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleBack = () => { setDirection(-1); setStep(1) }

  const handleConfirm = () => {
    setSubmitting(true)
    setTimeout(() => {
      const id = 'BS-' + Math.random().toString(36).slice(2, 8).toUpperCase()
      setBookingId(id)
      setSubmitting(false)
      setDirection(1)
      setStep(3)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }, 1400)
  }

  const handleReset = () => {
    setForm({ name: '', email: '', phone: '', date: null, time: '', guests: 2, occasion: '', notes: '' })
    setErrors({}); setBookingId(null); setDirection(-1); setStep(1)
  }

  return (
    <PageWrapper>
      <PageHeader
        eyebrow="Save your seat"
        title="Reservations"
        subtitle="Whether it's a quiet morning or an evening with friends — book the perfect spot."
        image="https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=1920&q=80"
      />

      <section className="section bg-cream-50 dark:bg-coffee-950">
        <div className="container-px max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
          <div className="lg:col-span-2">
            <div className="bg-cream-100 dark:bg-coffee-900 rounded-3xl p-6 sm:p-10 border border-cream-200 dark:border-coffee-700 shadow-warm relative overflow-hidden">
              <div className="absolute -top-32 -right-32 w-64 h-64 bg-gold-500/10 rounded-full blur-3xl pointer-events-none" />

              <div className="relative">
                <Stepper step={step} />

                <div className="relative overflow-hidden">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={step}
                      custom={direction}
                      variants={stepVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    >
                      {step === 1 && <Step1 form={form} setForm={setForm} errors={errors} onNext={handleNext} />}
                      {step === 2 && <Step2 form={form} onBack={handleBack} onConfirm={handleConfirm} submitting={submitting} />}
                      {step === 3 && <Step3 form={form} bookingId={bookingId} onReset={handleReset} />}
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>

          <SidePanel />
        </div>
      </section>
    </PageWrapper>
  )
}
