'use client'

import { ReactNode } from 'react'
import { motion, type Variants } from 'framer-motion'

interface FrostedPanelProps {
  children: ReactNode
  className?: string
  delay?: number
}

const panelVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
}

export default function FrostedPanel({
  children,
  className = '',
  delay = 0,
}: FrostedPanelProps) {
  return (
    <motion.div
      className={`glass p-6 ${className}`}
      variants={panelVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      custom={delay}
    >
      {children}
    </motion.div>
  )
}
