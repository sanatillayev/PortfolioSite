'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/stores/useAppStore'
import { projects, projectCategories } from '@/data/projects'
import type { ProjectCategory } from '@/types'

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const { openProjectModal, setCursorVariant } = useAppStore()

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, delay: index * 0.04 }}
      className="group glass p-5 cursor-pointer hover:bg-white/[0.08] transition-colors"
      onClick={() => openProjectModal(project.id)}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      style={{ perspective: '1000px' }}
    >
      <div className="flex items-start justify-between mb-3">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold"
          style={{
            backgroundColor: `${project.color}20`,
            color: project.color,
          }}
        >
          {project.name.charAt(0)}
        </div>
        <div className="flex items-center gap-2">
          {project.isCurrent && (
            <span className="w-2 h-2 rounded-full bg-ios-green animate-pulse" />
          )}
          <span
            className="text-[10px] font-mono px-2 py-0.5 rounded-full"
            style={{
              color: project.color,
              backgroundColor: `${project.color}15`,
            }}
          >
            {project.category}
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-white mb-1">{project.name}</h3>
      <p className="text-white/40 text-sm mb-1">{project.tagline}</p>
      <p className="text-white/20 text-[11px] font-mono mb-3">
        {project.employer} &middot; {project.year}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {project.tech.slice(0, 4).map((t) => (
          <span
            key={t}
            className="text-[10px] text-white/30 font-mono px-1.5 py-0.5 bg-white/5 rounded"
          >
            {t}
          </span>
        ))}
        {project.tech.length > 4 && (
          <span className="text-[10px] text-white/20 font-mono px-1.5 py-0.5">
            +{project.tech.length - 4}
          </span>
        )}
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const { projectFilter, setProjectFilter } = useAppStore()

  const filtered =
    projectFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === projectFilter)

  return (
    <section id="projects" className="relative py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          App <span className="text-gradient">Universe</span>
        </motion.h2>

        {/* Filter bar */}
        <div className="flex flex-wrap gap-2 mb-10">
          {projectCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() =>
                setProjectFilter(cat.id as ProjectCategory | 'all')
              }
              className={`text-xs font-mono px-3 py-1.5 rounded-full transition-all ${
                projectFilter === cat.id
                  ? 'bg-ios-blue text-white'
                  : 'bg-white/5 text-white/40 hover:text-white/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
