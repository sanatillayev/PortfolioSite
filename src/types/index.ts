export type Category =
  | 'HealthTech' | 'Fintech' | 'Crypto' | 'Logistics' | 'LegalTech'
  | 'F&B' | 'F&B Ops' | 'F&B Menu' | 'E-Commerce' | 'Car Wash'

export type Platform = 'iOS' | 'iPadOS' | 'iOS + iPadOS' | 'iOS + Android (KMP)'
export type Role = 'Engineer' | 'Head of Mobile'

export interface Project {
  id: string
  name: string
  tagline: string
  category: Category
  platform: Platform
  employer: string
  period: string
  role: Role
  accentColor: string
  appStoreUrl?: string
  playStoreUrl?: string
  landingUrl?: string
  storeNote?: string
  description: string
  features: string[]
  techStack: string[]
  hardPart: {
    title: string
    story: string
    codeHint?: string
    codeSnippet?: string
  }
  isWhiteLabel?: boolean
  whiteLabelFamily?: string
  isCurrent?: boolean
  notPublished?: boolean
}

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
