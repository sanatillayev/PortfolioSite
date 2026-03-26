'use client'

import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import { Preload } from '@react-three/drei'
import SpaceEnvironment from './SpaceEnvironment'
import CoreSphere from './CoreSphere'
import AppOrbits from './AppOrbits'
import CameraController from './CameraController'
import { SCENE } from '@/lib/constants'

export default function Scene() {
  return (
    <div className="fixed inset-0 z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{
          fov: SCENE.cameraFov,
          near: SCENE.cameraNear,
          far: SCENE.cameraFar,
          position: SCENE.cameraInitial,
        }}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={['#080808']} />
        <Suspense fallback={null}>
          <SpaceEnvironment />
          <CoreSphere />
          <AppOrbits />
          <CameraController />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  )
}
