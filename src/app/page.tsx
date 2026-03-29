'use client'

import Loading from '@/components/sections/Loading'
import Navigation from '@/components/layout/Navigation'
import Hero from '@/components/sections/Hero'
import Identity from '@/components/sections/Identity'
import Timeline from '@/components/sections/Timeline'
import Projects from '@/components/sections/Projects'
import ProjectModal from '@/components/sections/ProjectModal'
import Contact from '@/components/sections/Contact'

export default function Home() {
  return (
    <>
      <Loading />
      <Navigation />

      <main>
        <Hero />
        <Identity />
        <Timeline />
        <Projects />
        <Contact />
      </main>

      <ProjectModal />
    </>
  )
}
