'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'

export default function Loading() {
  const { isLoading, setLoading } = useAppStore()
  const [progress, setProgress] = useState(0)
  const [statusText, setStatusText] = useState('Compiling Bilol.swift...')
  const startTime = useRef(Date.now())
  const svgRef = useRef<SVGSVGElement>(null)

  // Animate the SVG stroke on mount
  useEffect(() => {
    const paths = svgRef.current?.querySelectorAll('path')
    if (!paths) return
    paths.forEach((path) => {
      const length = path.getTotalLength()
      path.style.strokeDasharray = `${length}`
      path.style.strokeDashoffset = `${length}`
      path.animate(
        [
          { strokeDashoffset: `${length}` },
          { strokeDashoffset: '0' },
        ],
        {
          duration: 2000,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          fill: 'forwards',
        }
      )
    })
  }, [])

  // Progress bar
  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        // Speed up towards end
        const increment = prev < 50 ? 2 : prev < 80 ? 4 : 6
        return Math.min(prev + increment, 100)
      })
    }, 60)
    return () => clearInterval(interval)
  }, [])

  // When progress hits 100, wait for minimum 2s, then done
  useEffect(() => {
    if (progress < 100) return
    setStatusText('Done.')
    const elapsed = Date.now() - startTime.current
    const remaining = Math.max(0, 2000 - elapsed)
    const timer = setTimeout(() => {
      setLoading(false)
    }, remaining + 400) // extra 400ms to show "Done."
    return () => clearTimeout(timer)
  }, [progress, setLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* BS Monogram SVG */}
          <svg
            ref={svgRef}
            width="120"
            height="120"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-10"
          >
            {/* Letter B */}
            <path
              d="M20 95V25h22c6 0 11 1.5 14.5 4.5S60 35 60 40c0 4-1 7.2-3 9.5s-4.8 3.8-8 4.5v.5c4 .7 7.2 2.5 9.5 5.5S62 66.5 62 71c0 6-2 10.8-5.5 14S49 90 42 90H20"
              stroke="#f5f5f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Letter S */}
            <path
              d="M75 72c0 5.5 3.5 9 10 9s10.5-3 10.5-7.5c0-4-2.5-6.5-8-8.5l-5-1.8c-7-2.5-10.5-6.5-10.5-13 0-4 1.5-7.3 4.5-9.8S83.5 37 88 37c5 0 9 1.5 12 4.5s4.5 6.8 4.5 11"
              stroke="#f5f5f7"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>

          {/* Progress section */}
          <div className="w-full max-w-xs px-6">
            <p className="text-apple-gray text-xs font-mono mb-3 text-center">
              {statusText}
            </p>
            <div className="h-[3px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-apple-blue rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.08 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
