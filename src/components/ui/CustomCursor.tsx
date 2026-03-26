'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { lerp } from '@/lib/utils'
import { TIMING } from '@/lib/constants'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const pos = useRef({ x: 0, y: 0 })
  const target = useRef({ x: 0, y: 0 })
  const cursorVariant = useAppStore((s) => s.cursorVariant)

  useEffect(() => {
    // Hide on touch devices
    if ('ontouchstart' in window) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY }
    }

    window.addEventListener('mousemove', handleMouseMove)

    let raf: number
    const animate = () => {
      pos.current.x = lerp(pos.current.x, target.current.x, TIMING.cursorLerp)
      pos.current.y = lerp(pos.current.y, target.current.y, TIMING.cursorLerp)

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${pos.current.x - 16}px, ${pos.current.y - 16}px)`
      }
      if (cursorDotRef.current) {
        cursorDotRef.current.style.transform = `translate(${target.current.x - 4}px, ${target.current.y - 4}px)`
      }

      raf = requestAnimationFrame(animate)
    }
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null

  const sizes = {
    default: 32,
    hover: 48,
    click: 24,
    text: 64,
  }

  const size = sizes[cursorVariant]

  return (
    <>
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-white/30 mix-blend-difference"
        animate={{
          width: size,
          height: size,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
      />
    </>
  )
}
