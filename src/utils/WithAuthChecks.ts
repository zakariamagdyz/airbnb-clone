import { useSession } from 'next-auth/react'

import { useLoginModal } from '@/components/modals/login-modal/hooks/use-login-modal'

export const WithAuthCheck = <TData, TVariables extends unknown[]>(interaction: (...args: TVariables) => TData) => {
  const { onOpen } = useLoginModal()
  const { data } = useSession()

  const wrappedInteraction = (...args: TVariables) => {
    if (data?.user) {
      return interaction(...args)
    } else {
      onOpen()
    }
  }

  return wrappedInteraction
}
