import { create } from 'zustand'

type RegisterModalStore = {
  isModalOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRegisterModal = create<RegisterModalStore>()(set => ({
  isModalOpen: false,
  onClose: () => set({ isModalOpen: false }),
  onOpen: () => set({ isModalOpen: true }),
}))
