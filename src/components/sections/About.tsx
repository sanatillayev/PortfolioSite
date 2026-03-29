'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import FrostedPanel from '@/components/ui/FrostedPanel'

const stats = [
  { label: 'Apps Shipped', value: 20 },
  { label: 'Years iOS', value: 3, suffix: '+' },
  { label: 'Companies', value: 5 },
  { label: 'On App Store', value: 15 },
]

const archTags = ['MVVM', 'MVVM+C', 'Clean', 'UDF', 'Modular', 'MVP']

function AnimatedCounter({
  value,
  suffix = '',
}: {
  value: number
  suffix?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const startTime = Date.now()

    const tick = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCurrent(Math.round(value * eased))
      if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [inView, value])

  return (
    <span ref={ref} className="text-3xl md:text-4xl font-bold text-gradient">
      {current}
      {suffix}
    </span>
  )
}

export default function About() {
  return (
    <section id="about" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The <span className="text-gradient">Core</span>
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Bio */}
          <FrostedPanel>
            <p className="text-white/70 leading-relaxed mb-4">
              Computer Engineer by training (Turin Polytechnic University +
              Erasmus+ at{' '}
              <span className="text-white/90">Politecnico di Torino</span>{' '}
              <span className="text-white/40">🇮🇹</span>). I build iOS apps
              that feel inevitable — fast, stable, architecturally clean.
            </p>
            <p className="text-white/70 leading-relaxed mb-5">
              20+ apps shipped across fintech, crypto, healthtech, logistics,
              legal tech, and F&B. Currently building at{' '}
              <span className="text-ios-green">OVI Uzbekistan</span>.
            </p>

            {/* Credential chip */}
            <motion.div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-ios-indigo/10 border border-ios-indigo/20 text-xs"
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <span>🎓</span>
              <span className="text-ios-indigo">
                Erasmus+ &middot; Politecnico di Torino
              </span>
            </motion.div>

            {/* Designer origin */}
            <p className="text-white/40 text-sm mt-4 italic">
              Former UI/UX designer — I design what I build.
            </p>
          </FrostedPanel>

          {/* Stats + Architecture */}
          <div className="space-y-6">
            <FrostedPanel delay={0.1}>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FrostedPanel>

            <FrostedPanel delay={0.2}>
              <p className="text-white/40 text-xs font-mono mb-3 uppercase tracking-wider">
                Architecture Patterns
              </p>
              <div className="flex flex-wrap gap-2">
                {archTags.map((tag, i) => (
                  <motion.span
                    key={tag}
                    className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-white/50 border border-white/5"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.05 }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div>
            </FrostedPanel>
          </div>
        </div>
      </div>
    </section>
  )
}
