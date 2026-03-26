'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'

export default function CoreSphere() {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColor: { value: new THREE.Color('#007AFF') },
    }),
    [],
  )

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.15
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <group>
        {/* Core sphere */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.2, 64, 64]} />
          <shaderMaterial
            uniforms={uniforms}
            vertexShader={`
              varying vec3 vNormal;
              varying vec3 vPosition;
              void main() {
                vNormal = normalize(normalMatrix * normal);
                vPosition = position;
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
              }
            `}
            fragmentShader={`
              uniform float uTime;
              uniform vec3 uColor;
              varying vec3 vNormal;
              varying vec3 vPosition;

              void main() {
                float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
                vec3 baseColor = uColor * 0.3;
                vec3 rimColor = uColor * 1.5;
                vec3 color = mix(baseColor, rimColor, fresnel);

                float pulse = sin(uTime * 1.5) * 0.1 + 0.9;
                color *= pulse;

                float scanline = sin(vPosition.y * 20.0 + uTime * 2.0) * 0.05 + 0.95;
                color *= scanline;

                gl_FragColor = vec4(color, 0.9);
              }
            `}
            transparent
          />
        </mesh>

        {/* Glow */}
        <mesh ref={glowRef} scale={1.8}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshBasicMaterial
            color="#007AFF"
            transparent
            opacity={0.08}
            side={THREE.BackSide}
          />
        </mesh>

        {/* Inner glow ring */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.5, 64]} />
          <meshBasicMaterial
            color="#007AFF"
            transparent
            opacity={0.15}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </Float>
  )
}
