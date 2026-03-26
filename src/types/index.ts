export interface Project {
  id: string
  name: string
  tagline: string
  description: string
  challenge: string
  category: ProjectCategory
  color: string
  tech: string[]
  features: string[]
  employer: string
  year: string
  appStoreUrl?: string
  isCurrent?: boolean
  orbitRadius: number
  orbitSpeed: number
  orbitOffset: number
}

export type ProjectCategory =
  | 'fintech'
  | 'crypto'
  | 'healthtech'
  | 'logistics'
  | 'f&b'
  | 'marketplace'
  | 'personal'

export interface Company {
  id: string
  name: string
  role: string
  period: string
  industry: string
  description: string
  highlights: string[]
  apps?: string[]
  color: string
  emoji: string
  isCurrent?: boolean
  isOrigin?: boolean
}

export interface Skill {
  id: string
  name: string
  category: SkillCategory
  level: number // 0-1
  x: number
  y: number
  connections: string[] // ids of connected skills
}

export type SkillCategory =
  | 'language'
  | 'framework'
  | 'tool'
  | 'architecture'
  | 'platform'

export interface CameraTarget {
  position: [number, number, number]
  lookAt: [number, number, number]
}
