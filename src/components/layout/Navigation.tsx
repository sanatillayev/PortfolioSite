'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
]

export default function Navigation() {
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  const handleScroll = useCallback(() => {
    const currentY = window.scrollY
    if (currentY > lastScrollY && currentY > 80) {
      setHidden(true)
    } else {
      setHidden(false)
    }
    setLastScrollY(currentY)
  }, [lastScrollY])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      setMenuOpen(false)
    }
  }

  return (
    <>
      {/* Desktop nav bar */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5"
        animate={{ y: hidden && !menuOpen ? -80 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-12 flex items-center justify-between">
          {/* Left: Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="text-apple-light font-bold text-sm tracking-tight"
          >
            BS
          </button>

          {/* Center: Links (desktop) */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-apple-gray text-xs hover:text-apple-light transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right: LinkedIn (desktop) */}
          <a
            href="https://linkedin.com/in/bilol-sanatillaev"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block text-apple-gray text-xs hover:text-apple-light transition-colors duration-200"
          >
            LinkedIn
          </a>

          {/* Mobile: Hamburger */}
          <button
            className="md:hidden relative w-6 h-6 flex flex-col items-center justify-center"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Toggle menu"
          >
            <motion.span
              className="block w-5 h-px bg-apple-light absolute"
              animate={{
                rotate: menuOpen ? 45 : 0,
                y: menuOpen ? 0 : -4,
              }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-5 h-px bg-apple-light absolute"
              animate={{ opacity: menuOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
            />
            <motion.span
              className="block w-5 h-px bg-apple-light absolute"
              animate={{
                rotate: menuOpen ? -45 : 0,
                y: menuOpen ? 0 : 4,
              }}
              transition={{ duration: 0.2 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-8 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {navLinks.map((link, i) => (
              <motion.button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-apple-light text-2xl font-semibold hover:text-apple-blue transition-colors"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              href="https://linkedin.com/in/bilol-sanatillaev"
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-gray text-lg mt-4 hover:text-apple-light transition-colors"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
            >
              LinkedIn
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
