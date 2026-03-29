'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'

/* ── Slide data (hardcoded per spec) ── */
interface TimelineSlide {
  id: string
  company: string
  headline: string
  role: string
  period: string
  color: string
  isCurrent?: boolean
  bullets?: string[]
  apps?: string[]
  note?: string
}

const slides: TimelineSlide[] = [
  {
    id: 'ovi',
    company: 'OVI Uzbekistan',
    headline: 'HealthTech · Building Now',
    role: 'iOS Engineer',
    period: 'Mar 2026 – Present',
    color: '#30D158',
    isCurrent: true,
    bullets: [
      'Developing HealthTech iOS application from the ground up',
      'Swift + SwiftUI + Combine stack',
    ],
    apps: ['OVI (patient)', 'Ovi Pro (doctor)'],
  },
  {
    id: 'oson',
    company: 'OSON',
    headline: 'Fintech at Scale',
    role: 'iOS Engineer',
    period: 'Oct 2025 – Feb 2026',
    color: '#007AFF',
    bullets: [
      'Code reviews and mentoring for junior iOS devs — hands-on feedback on architecture and code quality',
      'Co-led new architecture adoption with Team Lead — committed to implementation and migration plan',
      'Native URLSession/Codable layer replacing Alamofire + ObjectMapper — zero third-party networking',
      'Implemented separate build schemes and xcconfig for EasyPay 🇹🇯 brand — no codebase duplication',
      'Created SPM module with reusable UI components adopted across company projects to speed up development',
      'Token refresh race condition fix using serial DispatchQueue with request suspension and replay',
    ],
    apps: ['Oson / EasyPay', 'OsonX'],
  },
  {
    id: 'mimsoft',
    company: 'Mimsoft / laCafe',
    headline: '16 Apps. 2 Years. Every Domain.',
    role: 'iOS Developer · Head of Mobile',
    period: 'Mar 2024 – Feb 2026',
    color: '#FF9F0A',
    bullets: [
      '16 apps shipped across 5 verticals in under 2 years',
      'Head of Mobile on 6Sekund (KMP) — technical leadership across iOS and Android',
      'Core Bluetooth: PT30/iOSX ELD hardware pairing with background reconnection',
      'laCafe white-label platform: 6 App Store apps from a single codebase',
      'Modular Domain + UI layer separation via SPM — scalable across iOS, iPadOS, and watchOS',
      'Optimized reusable packages: networking, UI components, services shared across all apps',
      'Critical Alerts entitlement approved by App Store Review',
    ],
  },
  {
    id: 'wellmate',
    company: 'Wellmate Inc.',
    headline: 'AI-Powered Health, SwiftUI-First',
    role: 'iOS Developer',
    period: 'Aug 2022 – Feb 2024',
    color: '#30D158',
    bullets: [
      'SwiftUI + UDF + Async/Await architecture from day one',
      'Modular SPM architecture — scalable and maintainable across a growing codebase',
      'In-App Purchases and subscription paywall with StoreKit',
      'Collaborated with 4 iOS devs, QA, PM, and design teams in a cross-functional workflow',
      '3+ major releases delivered on schedule',
    ],
  },
  {
    id: '7saber',
    company: '7Saber LLC',
    headline: 'Production Code, Four Countries',
    role: 'iOS Engineer (Contract)',
    period: 'Jan – Mar 2025',
    color: '#AC8E68',
    bullets: [
      'Performance profiling with Instruments (Time Profiler + Allocations)',
      'App load time reduced by 10%',
      'Smooth interactive animations on key screens',
      'Payment method updates and fixes',
      '99% crash-free rate maintained',
    ],
  },
  {
    id: 'novalab',
    company: 'Novalab Tech',
    headline: 'Where It Started: Design',
    role: 'UI/UX Designer',
    period: 'Aug 2021 – Feb 2022',
    color: '#BF5AF2',
    note: 'Before I wrote Swift, I designed interfaces. That background lives in every app I build.',
  },
]

/* ══════════════════════════════════════════
   Timeline Section
   ══════════════════════════════════════════ */
export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      const track = trackRef.current!
      const totalScroll = track.scrollWidth - window.innerWidth

      gsap.to(track, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => `+=${track.scrollWidth}`,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`
            }
          },
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative overflow-hidden bg-black"
    >
      {/* Section heading — visible before horizontal scroll kicks in */}
      <div className="timeline-track flex" ref={trackRef} style={{ width: `${(slides.length + 1) * 100}vw` }}>
        {/* First "slide" is the heading */}
        <div className="w-screen h-screen flex-shrink-0 flex items-center justify-center px-12">
          <motion.h2
            className="headline-lg headline-gradient text-center"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            The Journey
          </motion.h2>
        </div>

        {/* Company slides */}
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="timeline-slide w-screen h-screen flex-shrink-0 flex items-center justify-center px-12"
          >
            <div className="max-w-2xl mx-auto flex gap-8">
              {/* Color accent bar with glow */}
              <div className="relative flex-shrink-0 mt-2">
                <div
                  className="w-1 h-24 rounded-full"
                  style={{ backgroundColor: slide.color }}
                />
                <div
                  className="absolute inset-0 w-1 h-24 rounded-full blur-md glow-pulse"
                  style={{ backgroundColor: slide.color }}
                />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                {/* Current badge */}
                {slide.isCurrent && (
                  <div className="flex items-center gap-2 mb-4">
                    <span className="relative flex h-2.5 w-2.5">
                      <span
                        className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                        style={{ backgroundColor: slide.color }}
                      />
                      <span
                        className="relative inline-flex h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: slide.color }}
                      />
                    </span>
                    <span
                      className="text-xs font-medium tracking-wide uppercase"
                      style={{ color: slide.color }}
                    >
                      Currently Here
                    </span>
                  </div>
                )}

                {/* Company name */}
                <p className="text-apple-gray text-sm mb-1">{slide.company}</p>

                {/* Headline */}
                <h3 className="headline-lg text-apple-light mb-3 leading-tight">
                  {slide.headline}
                </h3>

                {/* Role / period */}
                <p className="font-mono text-xs text-apple-gray/60 mb-6">
                  {slide.role} · {slide.period}
                </p>

                {/* Bullets */}
                {slide.bullets && (
                  <ul className="space-y-2 mb-6">
                    {slide.bullets.map((b, i) => (
                      <li key={i} className="text-apple-gray text-sm flex gap-2">
                        <span className="text-apple-gray/40 mt-0.5 flex-shrink-0">—</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Note (for Novalab) */}
                {slide.note && (
                  <p className="text-apple-gray/80 text-sm italic leading-relaxed">
                    {slide.note}
                  </p>
                )}

                {/* Apps */}
                {slide.apps && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {slide.apps.map((app) => (
                      <span
                        key={app}
                        className="text-xs px-3 py-1 rounded-full border"
                        style={{
                          color: slide.color,
                          borderColor: `${slide.color}33`,
                          backgroundColor: `${slide.color}0D`,
                        }}
                      >
                        {app}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Progress indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48 h-px bg-white/10 rounded-full overflow-hidden">
        <div
          ref={progressRef}
          className="h-full bg-apple-blue rounded-full transition-none"
          style={{ width: '0%' }}
        />
      </div>
    </section>
  )
}
