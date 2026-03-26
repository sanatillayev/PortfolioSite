'use client'

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { useAppStore } from '@/stores/useAppStore'
import { SCENE } from '@/lib/constants'
import { lerp } from '@/lib/utils'

export default function CameraController() {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const cameraTarget = useAppStore((s) => s.cameraTarget)
  const selectedApp = useAppStore((s) => s.selectedApp)

  const targetPos = useRef(new THREE.Vector3(...SCENE.cameraInitial))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useEffect(() => {
    if (cameraTarget) {
      targetPos.current.set(...cameraTarget.position)
      targetLookAt.current.set(...cameraTarget.lookAt)
      if (controlsRef.current) {
        controlsRef.current.enabled = false
      }
    } else {
      targetPos.current.set(...SCENE.cameraInitial)
      targetLookAt.current.set(0, 0, 0)
      if (controlsRef.current) {
        controlsRef.current.enabled = true
      }
    }
  }, [cameraTarget])

  useFrame(() => {
    const speed = 0.03

    camera.position.x = lerp(camera.position.x, targetPos.current.x, speed)
    camera.position.y = lerp(camera.position.y, targetPos.current.y, speed)
    camera.position.z = lerp(camera.position.z, targetPos.current.z, speed)

    currentLookAt.current.x = lerp(
      currentLookAt.current.x,
      targetLookAt.current.x,
      speed,
    )
    currentLookAt.current.y = lerp(
      currentLookAt.current.y,
      targetLookAt.current.y,
      speed,
    )
    currentLookAt.current.z = lerp(
      currentLookAt.current.z,
      targetLookAt.current.z,
      speed,
    )

    if (selectedApp) {
      camera.lookAt(currentLookAt.current)
    }

    if (controlsRef.current && !selectedApp) {
      controlsRef.current.target.copy(currentLookAt.current)
      controlsRef.current.update()
    }
  })

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={false}
      enablePan={false}
      rotateSpeed={0.3}
      maxPolarAngle={Math.PI * 0.7}
      minPolarAngle={Math.PI * 0.3}
    />
  )
}
