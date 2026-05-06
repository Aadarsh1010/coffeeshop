import { useState, useMemo, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const MONTHS = [
  'January','February','March','April','May','June',
  'July','August','September','October','November','December',
]
const DAYS = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const isSameDay = (a, b) =>
  a && b &&
  a.getFullYear() === b.getFullYear() &&
  a.getMonth()    === b.getMonth() &&
  a.getDate()     === b.getDate()

const stripTime = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())
const dateKey   = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`

export default function DatePicker({ value, onChange, minDate = new Date(), maxMonthsAhead = 6 }) {
  const today = stripTime(new Date())
  const min   = stripTime(minDate)
  const max   = (() => {
    const d = new Date(today)
    d.setMonth(d.getMonth() + maxMonthsAhead)
    return d
  })()

  const [view, setView] = useState(() => value
    ? new Date(value.getFullYear(), value.getMonth(), 1)
    : new Date(today.getFullYear(), today.getMonth(), 1))

  const gridRef = useRef(null)

  const days = useMemo(() => {
    const firstOfMonth = new Date(view.getFullYear(), view.getMonth(), 1)
    const startDay     = firstOfMonth.getDay()
    const daysInMonth  = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate()
    const cells = []
    for (let i = 0; i < startDay; i++) cells.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      cells.push(new Date(view.getFullYear(), view.getMonth(), d))
    }
    return cells
  }, [view])

  const canPrev = view > new Date(min.getFullYear(), min.getMonth(), 1)
  const canNext = view < new Date(max.getFullYear(), max.getMonth(), 1)

  const goPrev = () => canPrev && setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
  const goNext = () => canNext && setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))

  // ----- KEYBOARD NAVIGATION (roving focus pattern) -----
  const handleKeyDown = (e, currentDate) => {
    let delta = 0
    if (e.key === 'ArrowRight') delta = 1
    if (e.key === 'ArrowLeft')  delta = -1
    if (e.key === 'ArrowDown')  delta = 7
    if (e.key === 'ArrowUp')    delta = -7
    if (e.key === 'Home')       { e.preventDefault(); focusDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)); return }
    if (e.key === 'End')        {
      e.preventDefault()
      focusDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0))
      return
    }
    if (e.key === 'PageDown')   { e.preventDefault(); goNext(); return }
    if (e.key === 'PageUp')     { e.preventDefault(); goPrev(); return }
    if (delta === 0) return

    e.preventDefault()
    const next = new Date(currentDate)
    next.setDate(currentDate.getDate() + delta)
    if (next < min || next > max) return
    focusDate(next)
  }

  const focusDate = (date) => {
    const sameMonth = date.getMonth() === view.getMonth() && date.getFullYear() === view.getFullYear()
    if (!sameMonth) {
      setView(new Date(date.getFullYear(), date.getMonth(), 1))
      // Wait for re-render to focus
      setTimeout(() => {
        const btn = gridRef.current?.querySelector(`[data-date-key="${dateKey(date)}"]`)
        btn?.focus()
      }, 60)
    } else {
      const btn = gridRef.current?.querySelector(`[data-date-key="${dateKey(date)}"]`)
      btn?.focus()
    }
  }

  // First valid date in current view (used as initial tabbable cell when no value)
  const firstTabbable = useMemo(() => {
    const candidate = value && (value.getMonth() === view.getMonth() && value.getFullYear() === view.getFullYear())
      ? stripTime(value)
      : days.find((d) => d && d >= min)
    return candidate ? dateKey(candidate) : null
  }, [days, value, view, min])

  return (
    <div className="bg-cream-50 dark:bg-coffee-900 rounded-2xl border border-cream-200 dark:border-coffee-700 p-4 sm:p-5 shadow-warm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={goPrev}
          disabled={!canPrev}
          aria-label="Previous month"
          className={`p-2 rounded-full transition-colors ${
            canPrev
              ? 'text-coffee-700 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-coffee-800'
              : 'text-coffee-300 dark:text-coffee-700 cursor-not-allowed'
          }`}
        >
          <ChevronLeft size={18} aria-hidden="true" />
        </button>

        <AnimatePresence mode="wait">
          <motion.h3
            key={`${view.getMonth()}-${view.getFullYear()}`}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="font-serif text-base sm:text-lg font-bold text-coffee-800 dark:text-cream-50"
            aria-live="polite"
          >
            {MONTHS[view.getMonth()]} {view.getFullYear()}
          </motion.h3>
        </AnimatePresence>

        <button
          type="button"
          onClick={goNext}
          disabled={!canNext}
          aria-label="Next month"
          className={`p-2 rounded-full transition-colors ${
            canNext
              ? 'text-coffee-700 dark:text-cream-100 hover:bg-cream-200 dark:hover:bg-coffee-800'
              : 'text-coffee-300 dark:text-coffee-700 cursor-not-allowed'
          }`}
        >
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>

      {/* Day labels */}
      <div className="grid grid-cols-7 gap-1 mb-2" role="row">
        {DAYS.map((d) => (
          <div key={d} role="columnheader"
               className="text-center text-[10px] uppercase tracking-widest font-semibold text-coffee-500 dark:text-cream-200/60">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div ref={gridRef} role="grid" aria-label="Calendar">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${view.getMonth()}-${view.getFullYear()}-grid`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="grid grid-cols-7 gap-1"
          >
            {days.map((date, i) => {
              if (!date) return <div key={`e-${i}`} role="gridcell" />
              const disabled = date < min || date > max
              const selected = isSameDay(date, value)
              const isToday  = isSameDay(date, today)
              const tabbable = dateKey(date) === firstTabbable || selected
              return (
                <button
                  key={date.toISOString()}
                  type="button"
                  role="gridcell"
                  data-date-key={dateKey(date)}
                  disabled={disabled}
                  onClick={() => onChange(date)}
                  onKeyDown={(e) => handleKeyDown(e, date)}
                  tabIndex={tabbable ? 0 : -1}
                  aria-label={date.toDateString()}
                  aria-pressed={selected}
                  aria-current={isToday ? 'date' : undefined}
                  className={`
                    relative aspect-square flex items-center justify-center rounded-lg text-sm font-medium
                    transition-all duration-150
                    ${selected
                      ? 'bg-coffee-800 text-gold-500 shadow-warm scale-105'
                      : disabled
                        ? 'text-coffee-300 dark:text-coffee-700 cursor-not-allowed'
                        : 'text-coffee-700 dark:text-cream-100 hover:bg-gold-500/15 hover:text-coffee-900 dark:hover:text-gold-400'}
                  `}
                >
                  {date.getDate()}
                  {isToday && !selected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-gold-500"
                          aria-hidden="true" />
                  )}
                </button>
              )
            })}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4 mt-4 pt-4 border-t border-cream-200 dark:border-coffee-700 text-[11px] text-coffee-600 dark:text-cream-200/70">
        <span className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-gold-500" aria-hidden="true" /> Today
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-md bg-coffee-800" aria-hidden="true" /> Selected
        </span>
        <span className="ml-auto hidden sm:inline italic text-coffee-500 dark:text-cream-200/50">
          Use arrow keys to navigate
        </span>
      </div>
    </div>
  )
}
