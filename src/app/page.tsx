'use client'

import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/ui/LoadingScreen'
import CustomCursor from '@/components/ui/CustomCursor'
import ScrollProgress from '@/components/ui/ScrollProgress'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import Experience from '@/components/sections/Experience'
import Projects from '@/components/sections/Projects'
import ProjectModal from '@/components/sections/ProjectModal'
import Engineering from '@/components/sections/Engineering'
import Architecture from '@/components/sections/Architecture'
import Contact from '@/components/sections/Contact'

const Scene = dynamic(() => import('@/components/canvas/Scene'), {
  ssr: false,
})

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <Scene />

      <div className="relative z-10">
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Engineering />
        <Architecture />
        <Contact />
      </div>

      <ProjectModal />
    </>
  )
}
