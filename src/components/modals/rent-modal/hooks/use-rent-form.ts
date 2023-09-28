import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'

import { rentFormSchema, RentInitalValues } from '../schema'
import { RentFormSchema } from '../types'
import useListMutation from './use-list-mutation'

const useRentForm = ({ closeModal }: { closeModal: () => void }) => {
  const methods = useForm<RentFormSchema>({
    resolver: zodResolver(rentFormSchema),
    defaultValues: RentInitalValues,
  })
  const { mutate } = useListMutation()
  const router = useRouter()
  const onSubmit = React.useCallback(
    async (data: RentFormSchema) => {
      try {
        await mutate({ variables: data })

        closeModal()
        toast.success('Listing created!')
        router.refresh()
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message)
        }
      }
    },
    [router, closeModal, mutate]
  )

  return { ...methods, handleSubmit: methods.handleSubmit(onSubmit) }
}

export default useRentForm
