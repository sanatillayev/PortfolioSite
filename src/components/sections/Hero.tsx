'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.p
          className="text-ios-blue font-mono text-sm mb-4 tracking-wider"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          iOS Engineer &middot; Swift &middot; SwiftUI &middot; UIKit &middot; Clean Architecture
        </motion.p>
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-4">
          <span className="text-gradient">Bilol</span>{' '}
          <span className="text-white">Sanatillaev</span>
        </h1>
        <p className="text-white/40 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
          Crafting premium iOS experiences across fintech, healthtech, logistics
          & beyond.{' '}
          <span className="text-white/60">
            10+ apps shipped. Millions served.
          </span>
        </p>
      </motion.div>

      {/* Floating instruction */}
      <motion.p
        className="absolute bottom-24 text-white/20 text-xs font-mono"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
      >
        Drag to explore &middot; Click an app &middot; Scroll down
      </motion.p>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-white/30 text-xs font-mono tracking-widest">
          SCROLL TO EXPLORE
        </span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent"
          animate={{ scaleY: [1, 1.5, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
        />
      </motion.div>
    </section>
  )
}
