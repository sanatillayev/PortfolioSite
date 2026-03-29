'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { projects } from '@/data/projects'

export default function ProjectModal() {
  const { projectModalOpen, modalProjectId, closeProjectModal } = useAppStore()
  const project = projects.find((p) => p.id === modalProjectId)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (projectModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [projectModalOpen])

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProjectModal()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [closeProjectModal])

  return (
    <AnimatePresence>
      {projectModalOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          />

          {/* Modal container */}
          <motion.div
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto bg-apple-dark border border-white/10 rounded-2xl p-6 md:p-8"
              initial={{ scale: 0.92, y: 40 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 40 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold shrink-0"
                    style={{
                      backgroundColor: `${project.accentColor}20`,
                      color: project.accentColor,
                    }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-2xl font-bold text-apple-light">
                        {project.name}
                      </h3>
                      {project.isCurrent && (
                        <span className="flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full bg-green-500/15 text-green-400">
                          <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                          active
                        </span>
                      )}
                      {project.notPublished && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400">
                          Coming Soon
                        </span>
                      )}
                    </div>
                    <p className="text-apple-gray text-sm">{project.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={closeProjectModal}
                  className="text-white/30 hover:text-white/60 transition-colors text-2xl p-1 leading-none shrink-0"
                >
                  &times;
                </button>
              </div>

              {/* Meta badges */}
              <div className="flex flex-wrap items-center gap-2 mb-6">
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    color: project.accentColor,
                    backgroundColor: `${project.accentColor}20`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-white/30 text-xs font-mono">
                  {project.employer} &middot; {project.period}
                </span>
                <span className="text-white/20 text-xs font-mono">
                  {project.platform}
                </span>
                {project.role === 'Head of Mobile' && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-warm/15 text-accent-warm">
                    Head of Mobile
                  </span>
                )}
                {project.isWhiteLabel && project.whiteLabelFamily && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/30">
                    {project.whiteLabelFamily}
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-white/70 leading-relaxed mb-6 text-sm">
                {project.description}
              </p>

              {/* Features */}
              {project.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-xs font-bold text-white/40 mb-3 font-mono uppercase tracking-wider">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-sm flex items-start gap-2"
                      >
                        <span
                          className="mt-0.5 shrink-0"
                          style={{ color: project.accentColor }}
                        >
                          &#9656;
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The Hard Part */}
              <div className="bg-black/40 border border-white/5 rounded-xl p-5 mb-6">
                <h4 className="text-sm font-bold text-accent-warm mb-1 font-mono">
                  {'// The Hard Part'}
                </h4>
                <p className="text-white/50 text-[11px] font-mono mb-2">
                  {project.hardPart.title}
                </p>
                <p className="text-white/60 text-sm leading-relaxed mb-3">
                  {project.hardPart.story}
                </p>
                {project.hardPart.codeSnippet && (
                  <pre className="font-mono text-[11px] text-apple-gray/80 bg-black rounded-xl p-4 overflow-x-auto whitespace-pre-wrap">
                    {project.hardPart.codeSnippet}
                  </pre>
                )}
              </div>

              {/* Tech Stack */}
              <div className="mb-6">
                <h4 className="text-xs font-bold text-white/40 mb-3 font-mono uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-white/50 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Store links */}
              <div className="flex flex-wrap gap-3">
                {project.appStoreUrl && (
                  <a
                    href={project.appStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-apple-blue/10 text-apple-blue text-sm font-medium hover:bg-apple-blue/20 transition-colors"
                  >
                    App Store &rarr;
                  </a>
                )}
                {project.playStoreUrl && (
                  <a
                    href={project.playStoreUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 text-green-400 text-sm font-medium hover:bg-green-500/20 transition-colors"
                  >
                    Play Store &rarr;
                  </a>
                )}
                {project.landingUrl && (
                  <a
                    href={project.landingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/5 text-white/50 text-sm font-medium border border-white/10 hover:bg-white/10 transition-colors"
                  >
                    Website &rarr;
                  </a>
                )}
                {project.storeNote && !project.appStoreUrl && !project.playStoreUrl && (
                  <span className="text-white/25 text-xs font-mono self-center">
                    {project.storeNote}
                  </span>
                )}
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
