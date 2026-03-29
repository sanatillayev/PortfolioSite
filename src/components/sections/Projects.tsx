'use client'

import { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { projects, categories } from '@/data/projects'
import type { Category } from '@/types'

/* ──────────────────────────────────────────────
   Featured Panel: Pilot ELD
   ────────────────────────────────────────────── */
function FeaturedPilotELD() {
  return (
    <div className="min-h-screen flex items-center bg-black py-24 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center w-full">
        {/* Left: text */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3 className="headline-lg text-apple-light mb-4">
            Hardware meets iOS.
          </h3>
          <p className="text-apple-gray text-lg mb-8">
            Core Bluetooth &middot; Swift Charts &middot; Critical Alerts
          </p>
          <ul className="space-y-3 text-apple-gray/80 text-sm mb-8">
            <li className="flex items-start gap-2">
              <span className="text-[#FF9F0A] mt-0.5">&#9656;</span>
              Built from scratch to App Store in SwiftUI
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF9F0A] mt-0.5">&#9656;</span>
              PT30 &amp; iOSX ELD hardware via Core Bluetooth
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF9F0A] mt-0.5">&#9656;</span>
              Real-time telemetry: speed, fuel, odometer over BLE
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF9F0A] mt-0.5">&#9656;</span>
              Offline-first with Core Data sync on reconnect
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#FF9F0A] mt-0.5">&#9656;</span>
              Critical Alerts entitlement — approved by App Store review
            </li>
          </ul>
          <a
            href="https://apps.apple.com/uz/app/pilot-eld/id6502953800"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-apple-blue/10 text-apple-blue rounded-full px-6 py-2 text-sm font-medium hover:bg-apple-blue/20 transition-colors"
          >
            App Store &rarr;
          </a>
        </motion.div>

        {/* Right: iPhone mockup */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="relative w-[240px] h-[500px] rounded-[44px] border-2 border-white/15 bg-black overflow-hidden shadow-2xl">
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[120px] h-[28px] bg-black rounded-b-2xl z-10" />
            {/* Screen */}
            <div className="absolute inset-[3px] rounded-[40px] bg-gradient-to-b from-[#FF9F0A]/20 via-black to-[#FF9F0A]/5 flex flex-col items-center justify-center p-6">
              <div className="text-[#FF9F0A] text-4xl font-bold mb-2">ELD</div>
              <div className="text-white/40 text-xs font-mono text-center">
                Hours of Service
              </div>
              <div className="mt-6 w-full h-px bg-white/10" />
              <div className="mt-4 grid grid-cols-2 gap-3 w-full">
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-[10px] text-white/30 font-mono">SPEED</div>
                  <div className="text-white/70 text-lg font-bold">67</div>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <div className="text-[10px] text-white/30 font-mono">FUEL</div>
                  <div className="text-white/70 text-lg font-bold">82%</div>
                </div>
              </div>
              <div className="mt-3 w-full bg-white/5 rounded-xl p-3">
                <div className="text-[10px] text-white/30 font-mono">STATUS</div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-white/60 text-xs">Connected &middot; PT30</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Featured Panel: laCafe Ecosystem
   ────────────────────────────────────────────── */
function FeaturedLaCafe() {
  const ecosystemApps = [
    'LaCourier', 'LaCollector', 'Gumma Xonim', 'Yewoo',
    'Strawberry House', 'Trend Bakery', 'Giotto', 'Giotto Menu',
  ]

  return (
    <div className="min-h-screen flex items-center bg-apple-dark py-24 px-6">
      <div className="max-w-5xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3 className="headline-lg text-apple-light mb-4">
            One codebase. Six apps. Six brands.
          </h3>
          <p className="text-apple-gray text-lg mb-10">
            White-label platform built from LaCourier&apos;s SPM foundation.
          </p>

          <ul className="space-y-3 text-apple-gray/80 text-sm mb-10 max-w-2xl">
            <li className="flex items-start gap-2">
              <span className="text-accent-warm mt-0.5">&#9656;</span>
              Shared SPM packages: networking, UI, services, domain
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-warm mt-0.5">&#9656;</span>
              Backend-driven UI: brand config delivered at launch
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-warm mt-0.5">&#9656;</span>
              Per-brand xcconfig: bundle ID, assets, API environment
            </li>
            <li className="flex items-start gap-2">
              <span className="text-accent-warm mt-0.5">&#9656;</span>
              New brand = new xcconfig + assets. Zero code changes.
            </li>
          </ul>

          <div className="flex flex-wrap gap-3">
            {ecosystemApps.map((app) => (
              <span
                key={app}
                className="text-xs font-mono px-4 py-2 rounded-full bg-white/5 text-white/50 border border-white/10"
              >
                {app}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Featured Panel: OsonX / Oson Audit
   ────────────────────────────────────────────── */
function FeaturedOsonX() {
  return (
    <div className="min-h-screen flex items-center bg-black py-24 px-6">
      <div className="max-w-3xl mx-auto text-center w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h3 className="headline-lg text-apple-light mb-4">
            Race conditions. Fixed.
          </h3>
          <p className="text-apple-gray text-lg mb-10">
            Full technical audit. Native networking. Zero Alamofire.
          </p>

          <ul className="space-y-3 text-apple-gray/80 text-sm mb-10 text-left max-w-lg mx-auto">
            <li className="flex items-start gap-2">
              <span className="text-[#F7931A] mt-0.5">&#9656;</span>
              Simultaneous refresh-token race condition eliminated
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F7931A] mt-0.5">&#9656;</span>
              Replaced Alamofire + ObjectMapper with native URLSession/Codable
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F7931A] mt-0.5">&#9656;</span>
              Memory leak audit: all major screens cleaned
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F7931A] mt-0.5">&#9656;</span>
              Redundant backend calls identified and removed
            </li>
            <li className="flex items-start gap-2">
              <span className="text-[#F7931A] mt-0.5">&#9656;</span>
              Binary size reduced by removing two third-party dependencies
            </li>
          </ul>

          <a
            href="https://osonx.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white/5 text-white/60 rounded-full px-6 py-2 text-sm font-medium border border-white/10 hover:bg-white/10 hover:text-white/80 transition-colors"
          >
            osonx.com &rarr;
          </a>
        </motion.div>
      </div>
    </div>
  )
}

/* ──────────────────────────────────────────────
   Project Card
   ────────────────────────────────────────────── */
function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const { openProjectModal } = useAppStore()
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    })
  }, [])

  return (
    <motion.div
      ref={cardRef}
      layout
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.05, ease: [0.25, 0.1, 0.25, 1] }}
      className="group cursor-pointer relative bg-apple-dark/50 border border-white/5 rounded-2xl p-5 transition-all duration-500 overflow-hidden"
      style={{
        transform: hovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        boxShadow: hovered
          ? `0 20px 60px ${project.accentColor}20, 0 0 0 1px ${project.accentColor}40`
          : '0 0 0 0 transparent',
        borderColor: hovered ? `${project.accentColor}30` : undefined,
      }}
      onClick={() => openProjectModal(project.id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Spotlight glow that follows cursor */}
      {hovered && (
        <div
          className="absolute pointer-events-none transition-opacity duration-300"
          style={{
            width: 200,
            height: 200,
            left: mousePos.x - 100,
            top: mousePos.y - 100,
            background: `radial-gradient(circle, ${project.accentColor}15 0%, transparent 70%)`,
            borderRadius: '50%',
          }}
        />
      )}

      {/* Header row */}
      <div className="relative flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center text-lg font-bold transition-transform duration-300"
          style={{
            backgroundColor: `${project.accentColor}20`,
            color: project.accentColor,
            transform: hovered ? 'scale(1.1)' : 'scale(1)',
          }}
        >
          {project.name.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          {project.isCurrent && (
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          )}
          {project.role === 'Head of Mobile' && (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-accent-warm/15 text-accent-warm">
              Head of Mobile
            </span>
          )}
        </div>
      </div>

      {/* Name & tagline */}
      <h3 className="relative text-lg font-bold text-apple-light mb-1">{project.name}</h3>
      <p className="relative text-apple-gray/60 text-sm mb-2">{project.tagline}</p>

      {/* Category badge */}
      <div className="relative flex items-center gap-2 mb-3">
        <span
          className="text-[10px] font-mono px-2 py-0.5 rounded-full"
          style={{
            color: project.accentColor,
            backgroundColor: `${project.accentColor}15`,
          }}
        >
          {project.category}
        </span>
        <span className="text-[10px] text-white/25 font-mono">{project.platform}</span>
      </div>

      {/* White-label chip */}
      {project.isWhiteLabel && (
        <div className="relative mb-3">
          <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/30">
            laCafe Ecosystem
          </span>
        </div>
      )}

      {/* Tech chips */}
      <div className="relative flex flex-wrap gap-1.5">
        {project.techStack.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] text-white/30 font-mono px-1.5 py-0.5 bg-white/5 rounded"
          >
            {t}
          </span>
        ))}
        {project.techStack.length > 4 && (
          <span className="text-[10px] text-white/20 font-mono px-1.5 py-0.5">
            +{project.techStack.length - 4}
          </span>
        )}
      </div>
    </motion.div>
  )
}

/* ──────────────────────────────────────────────
   Main Projects Section
   ────────────────────────────────────────────── */
export default function Projects() {
  const { projectFilter, setProjectFilter } = useAppStore()

  const filtered =
    projectFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === projectFilter)

  return (
    <section id="work">
      {/* Part A: Three Featured Panels */}
      <FeaturedPilotELD />
      <FeaturedLaCafe />
      <FeaturedOsonX />

      {/* Part B: Full 20-App Grid */}
      <div className="bg-black py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.h2
            className="headline-lg headline-gradient mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            All Apps
          </motion.h2>
          <motion.p
            className="text-apple-gray text-sm mb-10 font-mono"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            20+ apps &middot; 15 on App Store &middot; 5 verticals
          </motion.p>

          {/* Filter bar */}
          <div className="flex flex-wrap gap-2 mb-10">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setProjectFilter(cat as Category | 'All')}
                className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all ${
                  projectFilter === cat
                    ? 'bg-apple-blue text-white'
                    : 'bg-white/5 text-white/40 hover:text-white/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Grid */}
          <motion.div
            layout
            className="grid md:grid-cols-3 gap-4"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
