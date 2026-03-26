'use client'

import { useRef, ReactNode } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { TIMING } from '@/lib/constants'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  href?: string
  target?: string
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  href,
  target,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null)
  const setCursorVariant = useAppStore((s) => s.setCursorVariant)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const springX = useSpring(x, { stiffness: 300, damping: 20 })
  const springY = useSpring(y, { stiffness: 300, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const dx = e.clientX - centerX
    const dy = e.clientY - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < TIMING.magneticThreshold) {
      x.set(dx * TIMING.magneticStrength)
      y.set(dy * TIMING.magneticStrength)
    }
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setCursorVariant('default')
  }

  const handleMouseEnter = () => {
    setCursorVariant('hover')
  }

  const Component = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      <Component
        href={href}
        target={target}
        onClick={onClick}
        className={`inline-flex items-center justify-center ${className}`}
      >
        {children}
      </Component>
    </motion.div>
  )
}
