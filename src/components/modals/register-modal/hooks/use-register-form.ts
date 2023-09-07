import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { registerModalInitialValues, type RegisterModalSchema, registerModalSchema } from '../schema'
import useRegisterMutation from './use-register-mutation'

const useRegisterForm = ({ closeModal }: { closeModal: () => void }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterModalSchema>({
    resolver: zodResolver(registerModalSchema),
    defaultValues: registerModalInitialValues,
  })

  const { isLoading, mutate } = useRegisterMutation()

  const onSubmit = React.useCallback(
    async (data: RegisterModalSchema) => {
      try {
        const res = await mutate(data)
        closeModal()
        toast.success(res.message)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    },
    [mutate, closeModal]
  )

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isLoading }
}

export default useRegisterForm
