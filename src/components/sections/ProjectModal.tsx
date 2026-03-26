'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { projects } from '@/data/projects'

export default function ProjectModal() {
  const { projectModalOpen, modalProjectId, closeProjectModal } = useAppStore()

  const project = projects.find((p) => p.id === modalProjectId)

  return (
    <AnimatePresence>
      {projectModalOpen && project && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProjectModal}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[61] flex items-center justify-center p-4 md:p-8 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="glass-strong w-full max-w-2xl max-h-[85vh] overflow-y-auto pointer-events-auto p-6 md:p-8"
              initial={{ scale: 0.9, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 30 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold"
                    style={{
                      backgroundColor: `${project.color}20`,
                      color: project.color,
                    }}
                  >
                    {project.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-2xl font-bold">{project.name}</h3>
                      {project.isCurrent && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ios-green/15 text-ios-green">
                          active
                        </span>
                      )}
                    </div>
                    <p className="text-white/50 text-sm">{project.tagline}</p>
                  </div>
                </div>
                <button
                  onClick={closeProjectModal}
                  className="text-white/30 hover:text-white/60 transition-colors text-xl p-1"
                >
                  &times;
                </button>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 mb-6">
                <span
                  className="text-xs font-mono px-3 py-1 rounded-full"
                  style={{
                    color: project.color,
                    backgroundColor: `${project.color}20`,
                  }}
                >
                  {project.category}
                </span>
                <span className="text-white/20 text-xs font-mono">
                  {project.employer} &middot; {project.year}
                </span>
              </div>

              {/* Description */}
              <p className="text-white/70 leading-relaxed mb-6">
                {project.description}
              </p>

              {/* Features */}
              {project.features.length > 0 && (
                <div className="mb-6">
                  <h4 className="text-sm font-bold text-white/40 mb-3 font-mono uppercase tracking-wider">
                    Key Features
                  </h4>
                  <ul className="space-y-2">
                    {project.features.map((feature, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-sm flex items-start gap-2"
                      >
                        <span style={{ color: project.color }}>&#9656;</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* The Hard Part */}
              <div className="glass p-4 mb-6">
                <h4 className="text-sm font-bold text-ios-orange mb-2 font-mono">
                  {'// The Hard Part'}
                </h4>
                <p className="text-white/60 text-sm leading-relaxed">
                  {project.challenge}
                </p>
              </div>

              {/* Tech stack */}
              <div>
                <h4 className="text-sm font-bold text-white/40 mb-3 font-mono uppercase tracking-wider">
                  Tech Stack
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2.5 py-1 rounded-lg bg-white/5 text-white/50 border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* App Store link */}
              {project.appStoreUrl && (
                <a
                  href={project.appStoreUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-xl bg-ios-blue/15 text-ios-blue text-sm font-medium border border-ios-blue/20 hover:bg-ios-blue/25 transition-colors"
                >
                  View App &rarr;
                </a>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
