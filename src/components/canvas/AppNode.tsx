'use client'

import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Html } from '@react-three/drei'
import * as THREE from 'three'
import type { Project } from '@/types'
import { useAppStore } from '@/stores/useAppStore'

interface AppNodeProps {
  project: Project
}

export default function AppNode({ project }: AppNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  const { setHoveredApp, setSelectedApp, setCameraTarget, selectedApp } =
    useAppStore()

  const isSelected = selectedApp === project.id
  const color = new THREE.Color(project.color)

  useFrame(({ clock }) => {
    if (!groupRef.current) return

    const t = clock.getElapsedTime() * project.orbitSpeed + project.orbitOffset
    const x = Math.cos(t) * project.orbitRadius
    const z = Math.sin(t) * project.orbitRadius
    const y = Math.sin(t * 0.5) * 0.5

    groupRef.current.position.set(x, y, z)

    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01
      const scale = hovered ? 1.3 : 1
      meshRef.current.scale.lerp(
        new THREE.Vector3(scale, scale, scale),
        0.1,
      )
    }
  })

  const handlePointerOver = () => {
    setHovered(true)
    setHoveredApp(project.id)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    setHoveredApp(null)
    document.body.style.cursor = 'none'
  }

  const handleClick = () => {
    if (isSelected) {
      setSelectedApp(null)
      setCameraTarget(null)
    } else {
      setSelectedApp(project.id)
      if (groupRef.current) {
        const pos = groupRef.current.position
        setCameraTarget({
          position: [pos.x * 0.6, pos.y + 1, pos.z + 3],
          lookAt: [pos.x, pos.y, pos.z],
        })
      }
    }
  }

  return (
    <group ref={groupRef}>
      {/* Node sphere */}
      <mesh
        ref={meshRef}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={hovered ? 0.8 : 0.4}
          metalness={0.3}
          roughness={0.4}
        />
      </mesh>

      {/* Glow */}
      <mesh scale={hovered ? 2.5 : 1.8}>
        <sphereGeometry args={[0.35, 16, 16]} />
        <meshBasicMaterial
          color={project.color}
          transparent
          opacity={hovered ? 0.15 : 0.06}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Label on hover */}
      {hovered && (
        <Html
          position={[0, 0.7, 0]}
          center
          style={{ pointerEvents: 'none' }}
        >
          <div className="glass px-3 py-1.5 whitespace-nowrap">
            <p className="text-xs font-semibold text-white">
              {project.name}
            </p>
            <p className="text-[10px] text-white/50">{project.tagline}</p>
          </div>
        </Html>
      )}
    </group>
  )
}
