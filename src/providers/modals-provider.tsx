'use client'
import { AnimatePresence } from 'framer-motion'

import RegistarModal from '@/components/modals/register-modal'
import { useRegisterModal } from '@/components/modals/register-modal/hooks/use-register-modal'

const ModalsProvider = () => {
  const { isModalOpen } = useRegisterModal()
  return <AnimatePresence>{isModalOpen && <RegistarModal />}</AnimatePresence>
}

export default ModalsProvider
