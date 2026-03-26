'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import FrostedPanel from '@/components/ui/FrostedPanel'
import MagneticButton from '@/components/ui/MagneticButton'

const socials = [
  {
    label: 'GitHub',
    href: 'https://github.com/sanatillayev',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/sanatillayev/',
  },
]

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const email = 'sanatillayevbilol@gmail.com'

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Let&apos;s <span className="text-gradient">Connect</span>
        </motion.h2>

        <motion.p
          className="text-white/40 mb-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Open to remote opportunities worldwide
        </motion.p>

        <FrostedPanel className="inline-block mx-auto">
          <div className="flex flex-col items-center gap-6">
            {/* Email */}
            <button
              onClick={copyEmail}
              className="group flex items-center gap-3 transition-colors"
            >
              <span className="text-white/70 group-hover:text-white font-mono text-sm md:text-base transition-colors">
                {email}
              </span>
              <motion.span
                className="text-xs text-ios-blue"
                animate={copied ? { scale: [1, 1.2, 1] } : {}}
              >
                {copied ? 'Copied!' : 'Copy'}
              </motion.span>
            </button>

            <div className="w-full h-px bg-white/10" />

            {/* Social links */}
            <div className="flex items-center gap-4">
              {socials.map((social) => (
                <MagneticButton
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className="glass px-5 py-2.5 text-sm text-white/60 hover:text-white transition-colors"
                >
                  {social.label}
                </MagneticButton>
              ))}
            </div>

            {/* Location */}
            <p className="text-white/20 text-xs font-mono">
              Tashkent, Uzbekistan 🇺🇿 &middot; Remote-first
            </p>
          </div>
        </FrostedPanel>
      </div>

      {/* Footer */}
      <div className="text-center mt-20">
        <p className="text-white/10 text-xs font-mono">
          Designed & built with obsessive attention to detail
        </p>
      </div>
    </section>
  )
}
