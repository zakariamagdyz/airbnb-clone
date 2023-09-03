import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { registerModalInitialValues, type RegisterModalSchema, registerModalSchema } from '../schema'
import useRegisterMutation from './use-register-mutation'

const useRegisterForm = () => {
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
        const registerdUser = await mutate(data)
        console.log(registerdUser)
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    },
    [mutate]
  )

  return { register, handleSubmit: handleSubmit(onSubmit), errors, isLoading }
}

export default useRegisterForm
