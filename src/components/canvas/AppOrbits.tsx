'use client'

import { useMemo } from 'react'
import * as THREE from 'three'
import { Line } from '@react-three/drei'
import AppNode from './AppNode'
import { projects } from '@/data/projects'
import { SCENE } from '@/lib/constants'

function OrbitRing({ radius }: { radius: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = []
    for (let i = 0; i <= 128; i++) {
      const angle = (i / 128) * Math.PI * 2
      pts.push([Math.cos(angle) * radius, 0, Math.sin(angle) * radius])
    }
    return pts
  }, [radius])

  return (
    <Line
      points={points}
      color="#ffffff"
      transparent
      opacity={0.06}
      lineWidth={1}
    />
  )
}

export default function AppOrbits() {
  return (
    <group>
      {/* Orbit rings */}
      {SCENE.orbitRadii.map((radius) => (
        <OrbitRing key={radius} radius={radius} />
      ))}

      {/* App nodes */}
      {projects.map((project) => (
        <AppNode key={project.id} project={project} />
      ))}
    </group>
  )
}
