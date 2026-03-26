'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { SECTIONS } from '@/lib/constants'
import MagneticButton from './MagneticButton'

const navItems = SECTIONS.filter((s) => s !== 'hero').map((s) => ({
  id: s,
  label: s.charAt(0).toUpperCase() + s.slice(1),
}))

export default function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [lastScroll, setLastScroll] = useState(0)
  const { activeSection, menuOpen, setMenuOpen } = useAppStore()

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY
      setHidden(currentScroll > lastScroll && currentScroll > 100)
      setLastScroll(currentScroll)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScroll])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      <motion.nav
        className="fixed top-4 left-1/2 -translate-x-1/2 z-40 glass px-6 py-3 hidden md:flex items-center gap-6"
        animate={{ y: hidden ? -80 : 0, opacity: hidden ? 0 : 1 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => scrollTo('hero')}
          className="text-sm font-bold text-gradient"
        >
          BS
        </button>
        <div className="w-px h-4 bg-white/10" />
        {navItems.map((item) => (
          <MagneticButton key={item.id} onClick={() => scrollTo(item.id)}>
            <span
              className={`text-sm transition-colors ${
                activeSection === item.id
                  ? 'text-ios-blue'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {item.label}
            </span>
          </MagneticButton>
        ))}
      </motion.nav>

      {/* Mobile hamburger */}
      <button
        className="fixed top-4 right-4 z-50 md:hidden glass p-3"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <div className="w-5 flex flex-col gap-1.5">
          <motion.div
            className="h-px bg-white"
            animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 4 : 0 }}
          />
          <motion.div
            className="h-px bg-white"
            animate={{ opacity: menuOpen ? 0 : 1 }}
          />
          <motion.div
            className="h-px bg-white"
            animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -4 : 0 }}
          />
        </div>
      </button>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-void/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => scrollTo(item.id)}
                className="text-2xl font-semibold text-white/70 hover:text-white transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
