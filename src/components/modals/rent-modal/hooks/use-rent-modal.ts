import { create } from 'zustand'

type RentModalStore = {
  isModalOpen: boolean
  onOpen: () => void
  onClose: () => void
}

export const useRentModal = create<RentModalStore>()(set => ({
  isModalOpen: false,
  onClose: () => set({ isModalOpen: false }),
  onOpen: () => set({ isModalOpen: true }),
}))
