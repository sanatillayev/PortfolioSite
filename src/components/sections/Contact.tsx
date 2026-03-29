'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'sanatillayevbilol@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <section id="contact" className="relative bg-[#f5f5f7] py-32 px-6 grain overflow-hidden">
      {/* Decorative gradient blobs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-apple-blue/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent-warm/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto text-center relative">
        <motion.h2
          className="headline-lg text-apple-dark mb-8"
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Let&apos;s build something.
        </motion.h2>

        {/* Email */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <button
            onClick={copyEmail}
            className="group inline-flex items-center gap-3 transition-all duration-300 hover:scale-105"
          >
            <span className="text-apple-dark/70 group-hover:text-apple-dark font-mono text-sm md:text-base transition-colors">
              {email}
            </span>
            <motion.span
              className={`text-xs font-mono px-3 py-1 rounded-full transition-all ${
                copied
                  ? 'bg-green-500/10 text-green-600'
                  : 'bg-apple-blue/10 text-apple-blue'
              }`}
              animate={copied ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              {copied ? '✓ Copied' : 'Copy'}
            </motion.span>
          </button>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex items-center justify-center gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <a
            href="https://www.linkedin.com/in/sanatillayev/"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-apple-dark/10 rounded-full px-6 py-3 text-apple-dark/60 hover:text-apple-dark hover:border-apple-dark/30 hover:shadow-lg text-sm font-medium transition-all duration-300 hover:-translate-y-1"
          >
            LinkedIn ↗
          </a>
          <a
            href="https://github.com/sanatillayev"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-apple-dark/10 rounded-full px-6 py-3 text-apple-dark/60 hover:text-apple-dark hover:border-apple-dark/30 hover:shadow-lg text-sm font-medium transition-all duration-300 hover:-translate-y-1"
          >
            GitHub ↗
          </a>
        </motion.div>

        {/* Location */}
        <motion.p
          className="text-apple-dark/40 text-sm"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Tashkent, Uzbekistan 🇺🇿 &middot; Open to remote opportunities worldwide.
        </motion.p>
      </div>

      {/* Footer */}
      <motion.div
        className="text-center mt-24"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-apple-dark/20 text-xs font-mono">
          Built with obsessive attention to detail
        </p>
      </motion.div>
    </section>
  )
}
