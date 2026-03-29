'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

/* ── Animated counter hook ── */
function useCountUp(target: number, duration = 1500, inView: boolean) {
  const [count, setCount] = useState(0)
  const hasAnimated = useRef(false)

  useEffect(() => {
    if (!inView || hasAnimated.current) return
    hasAnimated.current = true

    const start = performance.now()
    const step = (now: number) => {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [inView, target, duration])

  return count
}

/* ── Stat card ── */
function StatCard({
  value,
  label,
  subscript,
  suffix,
  index,
}: {
  value: number
  label: string
  subscript?: string
  suffix?: string
  index: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const count = useCountUp(value, 1400, inView)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* horizontal rule draws in */}
      <motion.div
        className="h-px bg-apple-dark/10 mb-6"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
        style={{ transformOrigin: 'left' }}
      />

      <div className="flex items-baseline gap-3">
        <span className="headline-lg text-apple-dark font-bold leading-none">
          {count}{count === value && suffix ? suffix : ''}
        </span>
        <span className="text-apple-dark/50 text-lg font-medium">{label}</span>
      </div>

      {subscript && (
        <p className="text-apple-dark/40 text-sm mt-1 ml-0.5">{subscript}</p>
      )}
    </motion.div>
  )
}

/* ── Credential chip ── */
function Chip({
  emoji,
  text,
  index,
}: {
  emoji: string
  text: string
  index: number
}) {
  return (
    <motion.span
      className="inline-flex items-center gap-2 bg-apple-dark/5 border border-apple-dark/10 rounded-full px-4 py-2 text-sm text-apple-dark/60"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: 0.4 + index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      <span>{emoji}</span>
      {text}
    </motion.span>
  )
}

/* ── Stats data ── */
const stats = [
  { value: 20, label: 'Apps', displaySuffix: '+' },
  { value: 3, label: 'Years', displaySuffix: '+' },
  { value: 5, label: 'Companies' },
  { value: 3, label: 'Platforms', subscript: 'iOS · iPadOS · KMP' },
]

/* ── Bio paragraphs ── */
const bio = [
  'I build iOS apps that feel inevitable — fast, stable, and architecturally clean.',
  'Computer Engineer. Erasmus+ at Politecnico di Torino.',
  'Former UI/UX designer — I design what I build.',
  'Currently building at OVI Uzbekistan — HealthTech. Open to remote roles.',
]

/* ── Chips ── */
const chips = [
  { emoji: '🎓', text: 'Erasmus+ · Politecnico di Torino' },
  { emoji: '🎨', text: 'UI/UX Background' },
  { emoji: '📱', text: 'iOS + iPadOS + KMP' },
]

/* ══════════════════════════════════════════
   Identity Section
   ══════════════════════════════════════════ */
export default function Identity() {
  return (
    <section
      id="about"
      className="relative bg-[#f5f5f7] py-32 md:py-40 grain overflow-hidden"
    >
      {/* Decorative gradient accent */}
      <div className="absolute -top-20 left-0 right-0 h-40 bg-gradient-to-b from-black to-transparent pointer-events-none z-10" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-apple-blue/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="mx-auto max-w-6xl px-6 relative">
        {/* ── Two-column grid ── */}
        <div className="grid gap-16 md:grid-cols-2 md:gap-20">
          {/* LEFT — Stats */}
          <div className="grid grid-cols-2 gap-8">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                value={s.value}
                label={s.label}
                subscript={s.subscript}
                suffix={s.displaySuffix}
                index={i}
              />
            ))}
          </div>

          {/* RIGHT — Bio */}
          <div className="flex flex-col justify-center space-y-6">
            {bio.map((paragraph, i) => (
              <motion.p
                key={i}
                className="text-lg leading-relaxed text-apple-dark/70"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>

        {/* ── Credential chips ── */}
        <div className="mt-16 flex flex-wrap gap-3">
          {chips.map((chip, i) => (
            <Chip key={chip.text} emoji={chip.emoji} text={chip.text} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
