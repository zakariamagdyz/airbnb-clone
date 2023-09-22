'use client'
import { AnimatePresence } from 'framer-motion'

import LoginModal from '@/components/modals/login-modal'
import { useLoginModal } from '@/components/modals/login-modal/hooks/use-login-modal'
import RegistarModal from '@/components/modals/register-modal'
import { useRegisterModal } from '@/components/modals/register-modal/hooks/use-register-modal'
import RentModal from '@/components/modals/rent-modal'
import { useRentModal } from '@/components/modals/rent-modal/hooks/use-rent-modal'

const ModalsProvider = () => {
  const { isModalOpen } = useRegisterModal()
  const { isModalOpen: isLoginModalOpen } = useLoginModal()
  const { isModalOpen: isRentModalOpen } = useRentModal()
  return (
    <AnimatePresence>
      {isModalOpen && <RegistarModal />}
      {isLoginModalOpen && <LoginModal />}
      {isRentModalOpen && <RentModal />}
    </AnimatePresence>
  )
}

export default ModalsProvider
