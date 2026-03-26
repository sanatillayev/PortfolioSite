'use client'

import { motion } from 'framer-motion'
import FrostedPanel from '@/components/ui/FrostedPanel'
import { companies } from '@/data/experience'

export default function Experience() {
  return (
    <section id="experience" className="relative py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          The <span className="text-gradient">Journey</span>
        </motion.h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-ios-blue/50 via-ios-purple/50 to-transparent" />

          <div className="space-y-12">
            {companies.map((company, i) => (
              <FrostedPanel
                key={company.id}
                delay={i * 0.12}
                className="ml-6 md:ml-16 relative"
              >
                {/* Timeline dot */}
                <div
                  className="absolute -left-[30px] md:-left-[38px] top-8 w-3 h-3 rounded-full border-2"
                  style={{
                    borderColor: company.color,
                    backgroundColor: `${company.color}33`,
                  }}
                />

                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{company.emoji}</span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xl font-bold text-white">
                          {company.name}
                        </h3>
                        {company.isCurrent && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ios-green/15 text-ios-green border border-ios-green/20">
                            currently crafting
                          </span>
                        )}
                        {company.isOrigin && (
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-ios-purple/15 text-ios-purple border border-ios-purple/20">
                            origin story
                          </span>
                        )}
                      </div>
                      <p
                        className="text-sm font-medium"
                        style={{ color: company.color }}
                      >
                        {company.role}
                      </p>
                    </div>
                  </div>
                  <div className="text-right mt-2 md:mt-0">
                    <span className="text-white/30 text-sm font-mono">
                      {company.period}
                    </span>
                    <p className="text-white/20 text-xs">{company.industry}</p>
                  </div>
                </div>

                <p className="text-white/60 text-sm mb-4 leading-relaxed">
                  {company.description}
                </p>

                {/* Highlights */}
                <ul className="space-y-2 mb-4">
                  {company.highlights.map((highlight, j) => (
                    <li
                      key={j}
                      className="text-white/50 text-sm flex items-start gap-2"
                    >
                      <span style={{ color: company.color }}>&#9656;</span>
                      {highlight}
                    </li>
                  ))}
                </ul>

                {/* Apps shipped at this company */}
                {company.apps && company.apps.length > 0 && (
                  <div className="pt-3 border-t border-white/5">
                    <p className="text-white/25 text-[10px] font-mono uppercase tracking-wider mb-2">
                      Apps shipped
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {company.apps.map((app) => (
                        <span
                          key={app}
                          className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/40"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </FrostedPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
