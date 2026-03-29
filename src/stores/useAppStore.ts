import { create } from 'zustand'
import type { Category } from '@/types'

interface AppState {
  // UI
  isLoading: boolean
  cursorVariant: 'default' | 'hover' | 'click' | 'text'
  activeSection: string
  menuOpen: boolean

  // Projects
  projectFilter: Category | 'All'
  projectModalOpen: boolean
  modalProjectId: string | null

  // UI actions
  setLoading: (loading: boolean) => void
  setCursorVariant: (variant: AppState['cursorVariant']) => void
  setActiveSection: (section: string) => void
  setMenuOpen: (open: boolean) => void

  // Project actions
  setProjectFilter: (filter: Category | 'All') => void
  openProjectModal: (id: string) => void
  closeProjectModal: () => void
}

export const useAppStore = create<AppState>((set) => ({
  // UI initial
  isLoading: true,
  cursorVariant: 'default',
  activeSection: 'hero',
  menuOpen: false,

  // Projects initial
  projectFilter: 'All',
  projectModalOpen: false,
  modalProjectId: null,

  // UI actions
  setLoading: (loading) => set({ isLoading: loading }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),
  setActiveSection: (section) => set({ activeSection: section }),
  setMenuOpen: (open) => set({ menuOpen: open }),

  // Project actions
  setProjectFilter: (filter) => set({ projectFilter: filter }),
  openProjectModal: (id) =>
    set({ projectModalOpen: true, modalProjectId: id }),
  closeProjectModal: () =>
    set({ projectModalOpen: false, modalProjectId: null }),
}))
