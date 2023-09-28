import { Listing } from '@prisma/client'
import React from 'react'

import { RentFormSchema } from '../types'

type RentMutationVariables = { variables: RentFormSchema }

type RentSuccessResponse = Listing

type ErrorResponse = {
  message: string
}

const useListMutation = () => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const mutate = React.useCallback(async function (listData: RentMutationVariables): Promise<RentSuccessResponse> {
    setLoading(true)
    try {
      const response = await fetch('/api/listings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(listData.variables),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { mutate, isLoading, error }
}

export default useListMutation
