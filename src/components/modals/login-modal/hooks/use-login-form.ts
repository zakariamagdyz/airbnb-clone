import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { loginModalInitialValues, LoginModalSchema, loginModalSchema } from '../schema'
import { useLoginMutation } from './use-auth-mutation'

const useLoginForm = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginModalSchema>({
    resolver: zodResolver(loginModalSchema),
    defaultValues: loginModalInitialValues,
  })
  const router = useRouter()

  const [mutate, { isLoading }] = useLoginMutation()

  const onSubmit = React.useCallback(
    async (data: LoginModalSchema) => {
      try {
        await mutate({ variables: data })
        closeModal()
        router.refresh()
        toast.success("You've successfully logged in!")
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    },
    [mutate, closeModal, router]
  )

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isLoading }
}

export default useLoginForm
