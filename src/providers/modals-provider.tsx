'use client'
import { AnimatePresence } from 'framer-motion'

import LoginModal from '@/components/modals/login-modal'
import { useLoginModal } from '@/components/modals/login-modal/hooks/use-login-modal'
import RegistarModal from '@/components/modals/register-modal'
import { useRegisterModal } from '@/components/modals/register-modal/hooks/use-register-modal'

const ModalsProvider = () => {
  const { isModalOpen } = useRegisterModal()
  const { isModalOpen: isLoginModalOpen } = useLoginModal()
  return (
    <AnimatePresence>
      {isModalOpen && <RegistarModal />}
      {isLoginModalOpen && <LoginModal />}
    </AnimatePresence>
  )
}

export default ModalsProvider
