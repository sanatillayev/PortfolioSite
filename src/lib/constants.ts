export const COLORS = {
  void: '#080808',
  blue: '#007AFF',
  orange: '#FF6B35',
  green: '#30D158',
  purple: '#BF5AF2',
  red: '#FF453A',
  yellow: '#FFD60A',
  teal: '#64D2FF',
  indigo: '#5E5CE6',
  pink: '#FF375F',
} as const

export const SCENE = {
  orbitRadii: [5, 8, 11] as const,
  starCount: 8000,
  starCountMobile: 2000,
  cameraNear: 0.1,
  cameraFar: 1000,
  cameraFov: 60,
  cameraInitial: [0, 2, 20] as [number, number, number],
} as const

export const TIMING = {
  loadingMinDuration: 1500,
  cameraTransition: 1.2,
  sectionReveal: 0.8,
  cursorLerp: 0.15,
  magneticThreshold: 80,
  magneticStrength: 0.3,
} as const

export const SECTIONS = [
  'hero',
  'about',
  'experience',
  'projects',
  'engineering',
  'architecture',
  'contact',
] as const

export type SectionId = (typeof SECTIONS)[number]
