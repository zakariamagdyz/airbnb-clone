import { Listing } from '@prisma/client'
import React from 'react'

type CreateReservationVariables = {
  variables: { listingId: string; startDate: Date | undefined; endDate: Date | undefined; totalPrice: number }
}

type RentSuccessResponse = Listing

type ErrorResponse = {
  message: string
}

const useCreateReservationMutation = () => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<ErrorResponse>()
  const mutate = React.useCallback(async function (
    reservationData: CreateReservationVariables
  ): Promise<RentSuccessResponse> {
    setLoading(true)
    try {
      const response = await fetch('/api/reservations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData.variables),
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

export default useCreateReservationMutation
