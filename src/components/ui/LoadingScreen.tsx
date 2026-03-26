'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { TIMING } from '@/lib/constants'

const swiftCode = [
  'import SwiftUI',
  '',
  'let bilol = iOSEngineer(',
  '    skills: [.swift, .swiftUI, .uiKit],',
  '    architecture: .clean,',
  '    appsShipped: 10',
  ')',
  '',
  'bilol.load() // ...',
  '',
  '// Compiling 10+ shipped apps...',
  '// Linking experience data...',
  '// Initializing universe...',
]

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [visibleLines, setVisibleLines] = useState(0)
  const [buildSucceeded, setBuildSucceeded] = useState(false)
  const { isLoading, setLoading, sceneReady } = useAppStore()
  const startTime = useRef(Date.now())

  useEffect(() => {
    const lineInterval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= swiftCode.length) {
          clearInterval(lineInterval)
          return prev
        }
        return prev + 1
      })
    }, 120)

    return () => clearInterval(lineInterval)
  }, [])

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        const increment = sceneReady ? 8 : 3
        return Math.min(prev + increment, 100)
      })
    }, 80)

    return () => clearInterval(progressInterval)
  }, [sceneReady])

  useEffect(() => {
    if (progress >= 100) {
      const elapsed = Date.now() - startTime.current
      const remaining = Math.max(0, TIMING.loadingMinDuration - elapsed)

      setTimeout(() => {
        setBuildSucceeded(true)
        setTimeout(() => setLoading(false), 600)
      }, remaining)
    }
  }, [progress, setLoading])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-void"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Code block */}
          <div className="w-full max-w-lg px-6 mb-8">
            <div className="glass-strong p-4 rounded-xl font-mono text-xs leading-relaxed">
              <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-2 text-white/30 text-[10px]">
                  PortfolioApp.swift
                </span>
              </div>
              <div className="min-h-[280px]">
                {swiftCode.slice(0, visibleLines).map((line, i) => (
                  <div key={i} className="flex">
                    <span className="w-6 text-right mr-3 text-white/20 select-none">
                      {i + 1}
                    </span>
                    <span
                      className={
                        line.startsWith('import')
                          ? 'text-ios-purple'
                          : line.startsWith('//')
                            ? 'text-ios-green/60'
                            : line.includes('struct') || line.includes('var')
                              ? 'text-ios-pink'
                              : line.includes('@')
                                ? 'text-ios-orange'
                                : 'text-white/80'
                      }
                    >
                      {line}
                    </span>
                  </div>
                ))}
                {visibleLines < swiftCode.length && (
                  <span className="inline-block w-2 h-4 bg-ios-blue animate-pulse ml-9" />
                )}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full max-w-lg px-6">
            <div className="flex justify-between text-xs text-white/40 mb-2 font-mono">
              <span>
                {buildSucceeded ? 'Build Succeeded' : 'Compiling...'}
              </span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="h-1 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-ios-blue to-ios-teal rounded-full"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>
          </div>

          {/* Build succeeded flash */}
          <AnimatePresence>
            {buildSucceeded && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-20 text-ios-green font-mono text-sm font-bold"
              >
                Build Succeeded
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
