import { create } from 'zustand'
import type { CameraTarget, ProjectCategory } from '@/types'

interface AppState {
  // UI
  isLoading: boolean
  cursorVariant: 'default' | 'hover' | 'click' | 'text'
  activeSection: string
  menuOpen: boolean

  // Scene
  selectedApp: string | null
  hoveredApp: string | null
  cameraTarget: CameraTarget | null
  sceneReady: boolean

  // Projects
  projectFilter: ProjectCategory | 'all'
  projectModalOpen: boolean
  modalProjectId: string | null

  // UI actions
  setLoading: (loading: boolean) => void
  setCursorVariant: (variant: AppState['cursorVariant']) => void
  setActiveSection: (section: string) => void
  setMenuOpen: (open: boolean) => void

  // Scene actions
  setSelectedApp: (id: string | null) => void
  setHoveredApp: (id: string | null) => void
  setCameraTarget: (target: CameraTarget | null) => void
  setSceneReady: (ready: boolean) => void

  // Project actions
  setProjectFilter: (filter: ProjectCategory | 'all') => void
  openProjectModal: (id: string) => void
  closeProjectModal: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // UI initial
  isLoading: true,
  cursorVariant: 'default',
  activeSection: 'hero',
  menuOpen: false,

  // Scene initial
  selectedApp: null,
  hoveredApp: null,
  cameraTarget: null,
  sceneReady: false,

  // Projects initial
  projectFilter: 'all',
  projectModalOpen: false,
  modalProjectId: null,

  // UI actions
  setLoading: (loading) => set({ isLoading: loading }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  setActiveSection: (section) => set({ activeSection: section }),
  setMenuOpen: (open) => set({ menuOpen: open }),

  // Scene actions
  setSelectedApp: (id) => set({ selectedApp: id }),
  setHoveredApp: (id) => set({ hoveredApp: id }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setSceneReady: (ready) => set({ sceneReady: ready }),

  // Project actions
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  openProjectModal: (id) =>
    set({ projectModalOpen: true, modalProjectId: id }),
  closeProjectModal: () =>
    set({ projectModalOpen: false, modalProjectId: null }),
}))
