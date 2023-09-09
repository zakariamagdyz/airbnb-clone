import { create } from 'zustand'

type LoginModalStore = {
  isModalOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useLoginModal = create<LoginModalStore>()(set => ({
  isModalOpen: false,
  onClose: () => set({ isModalOpen: false }),
  onOpen: () => set({ isModalOpen: true }),
}))
