'use client'

import { useRef, useEffect } from 'react'
import { gsap, ScrollTrigger } from '@/lib/gsap'
import { motion } from 'framer-motion'

/* ── App icons that bloom from the phone ── */
const appIcons = [
  { name: 'OVI', color: '#30D158' },
  { name: 'Pro', color: '#0A84FF' },
  { name: 'Oson', color: '#007AFF' },
  { name: 'X', color: '#F7931A' },
  { name: 'ELD', color: '#FF9F0A' },
  { name: 'BStar', color: '#5AC8FA' },
  { name: 'LaC', color: '#34C759' },
  { name: 'HES', color: '#BF5AF2' },
  { name: '6S', color: '#FF2D55' },
  { name: 'GX', color: '#FF375F' },
  { name: 'SH', color: '#FF6B9D' },
  { name: 'YW', color: '#64D2FF' },
  { name: 'TB', color: '#FFCC00' },
  { name: 'GT', color: '#5856D6' },
  { name: 'WM', color: '#30D158' },
  { name: '7S', color: '#AC8E68' },
]

function IPhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`w-[280px] h-[580px] rounded-[50px] border-[3px] border-white/20 bg-black relative ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[30px] rounded-b-2xl bg-black z-10" />
      <div className="absolute inset-[3px] rounded-[47px] bg-gradient-to-b from-[#1d1d1f] to-black overflow-hidden flex items-center justify-center">
        <span className="text-apple-blue text-4xl font-bold">20+ apps</span>
      </div>
    </div>
  )
}

export default function Hero() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const headlineRef = useRef<HTMLDivElement>(null)
  const phoneRef = useRef<HTMLDivElement>(null)
  const iconsRef = useRef<HTMLDivElement>(null)
  const gradientRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapperRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.5,
          pin: false,
        },
      })

      // 0-15%: Headline fades out with parallax
      tl.fromTo(
        headlineRef.current,
        { opacity: 1, y: 0, scale: 1 },
        { opacity: 0, y: -80, scale: 0.95, ease: 'none' },
        0
      )

      // Gradient orb pulses and shifts
      tl.fromTo(
        gradientRef.current,
        { scale: 1, opacity: 0.4 },
        { scale: 1.5, opacity: 0.1, ease: 'none' },
        0
      )

      // 15-35%: iPhone materializes with rotation
      tl.fromTo(
        phoneRef.current,
        { scale: 0.3, opacity: 0, rotateY: -30 },
        { scale: 1, opacity: 1, rotateY: 0, ease: 'none' },
        0.15
      )

      // 35-50%: iPhone rotates full 360
      tl.to(
        phoneRef.current,
        { rotateY: 360, ease: 'none' },
        0.35
      )

      // 50-65%: iPhone zooms toward viewer
      tl.to(
        phoneRef.current,
        { scale: 1.4, rotateY: 360, ease: 'none' },
        0.5
      )

      // 65-80%: App icons bloom outward
      if (iconsRef.current) {
        const icons = iconsRef.current.children
        tl.fromTo(
          icons,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            stagger: 0.02,
            ease: 'back.out(1.7)',
          },
          0.65
        )
      }

      // 80-100%: Everything settles — phone shrinks, icons form grid
      tl.to(
        phoneRef.current,
        { scale: 0.6, opacity: 0.3, y: -100, ease: 'none' },
        0.8
      )
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" ref={wrapperRef} className="relative" style={{ height: '400vh' }}>
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Animated gradient orb background */}
        <div
          ref={gradientRef}
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(41,151,255,0.15) 0%, transparent 70%)',
          }}
        />

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />

        {/* Headline group */}
        <div ref={headlineRef} className="text-center z-10 px-6">
          <motion.p
            className="text-apple-blue text-sm font-mono tracking-widest uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            iOS Engineer
          </motion.p>
          <motion.h1
            className="headline-xl headline-gradient mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Engineering iOS
            <br />
            experiences.
          </motion.h1>
          <motion.p
            className="text-apple-gray text-lg md:text-xl mb-10 max-w-md mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Tashkent 🇺🇿 &middot; Open to remote
          </motion.p>
          <motion.div
            className="flex items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            <button
              onClick={() => scrollToSection('work')}
              className="group relative px-7 py-3 bg-apple-blue text-white text-sm font-medium rounded-full overflow-hidden transition-all hover:shadow-[0_0_30px_rgba(41,151,255,0.4)]"
            >
              <span className="relative z-10">View Work ↓</span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="px-7 py-3 border border-white/20 text-apple-light text-sm font-medium rounded-full hover:border-white/40 hover:bg-white/5 transition-all"
            >
              Get in Touch →
            </button>
          </motion.div>
        </div>

        {/* iPhone mockup */}
        <div
          ref={phoneRef}
          className="absolute inset-0 flex items-center justify-center"
          style={{ opacity: 0, transformStyle: 'preserve-3d' }}
        >
          <IPhoneMockup />
        </div>

        {/* App icons bloom */}
        <div
          ref={iconsRef}
          className="absolute inset-0 flex flex-wrap items-center justify-center gap-3 pointer-events-none"
          style={{ padding: '20vh 10vw' }}
        >
          {appIcons.map((app) => (
            <div
              key={app.name}
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-[10px] font-bold"
              style={{
                backgroundColor: `${app.color}20`,
                color: app.color,
                border: `1px solid ${app.color}30`,
                opacity: 0,
              }}
            >
              {app.name}
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.div
            className="w-6 h-10 rounded-full border-2 border-white/20 flex items-start justify-center p-2"
            animate={{ opacity: [0.3, 0.8, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <motion.div
              className="w-1 h-2 bg-white/60 rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
