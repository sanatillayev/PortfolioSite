'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { isMobile } from '@/lib/utils'
import { SCENE } from '@/lib/constants'

function Nebula() {
  const meshRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor1: { value: new THREE.Color('#007AFF').multiplyScalar(0.15) },
      uColor2: { value: new THREE.Color('#BF5AF2').multiplyScalar(0.1) },
    }),
    [],
  )

  useFrame((_, delta) => {
    uniforms.uTime.value += delta * 0.1
  })

  return (
    <mesh ref={meshRef} position={[0, 0, -30]}>
      <planeGeometry args={[80, 80]} />
      <shaderMaterial
        transparent
        depthWrite={false}
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying vec2 vUv;

          float noise(vec2 p) {
            return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
          }

          void main() {
            vec2 uv = vUv - 0.5;
            float d = length(uv);
            float n = noise(uv * 3.0 + uTime);
            vec3 color = mix(uColor1, uColor2, n + sin(uTime + d * 3.0) * 0.3);
            float alpha = smoothstep(0.5, 0.1, d) * 0.3 * (0.5 + n * 0.5);
            gl_FragColor = vec4(color, alpha);
          }
        `}
      />
    </mesh>
  )
}

export default function SpaceEnvironment() {
  const mobile = typeof window !== 'undefined' ? isMobile() : false
  const count = mobile ? SCENE.starCountMobile : SCENE.starCount

  return (
    <>
      <ambientLight intensity={0.15} />
      <pointLight position={[0, 0, 0]} intensity={2} color="#007AFF" distance={30} decay={2} />
      <pointLight position={[10, 5, -10]} intensity={0.5} color="#BF5AF2" distance={40} decay={2} />
      <Stars
        radius={100}
        depth={80}
        count={count}
        factor={4}
        saturation={0.2}
        fade
        speed={0.5}
      />
      <Nebula />
    </>
  )
}
