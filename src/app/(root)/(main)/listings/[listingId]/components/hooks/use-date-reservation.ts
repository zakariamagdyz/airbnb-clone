// hooks/useDateReservation.ts

import { Reservation } from '@prisma/client'
import { differenceInDays, eachDayOfInterval } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'
import { Range } from 'react-date-range'
import toast from 'react-hot-toast'

import { WithAuthCheck } from '@/utils/WithAuthChecks'

import useCreateReservationMutation from './use-create-reservation'

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
}

type UseDateReservationProps = {
  initialPrice: number
  reservations: Reservation[]
  listingId: string
}

export const useDateReservation = ({ initialPrice, reservations, listingId }: UseDateReservationProps) => {
  const [totalPrice, setTotalPrice] = useState(initialPrice)
  const [dateRange, setDateRange] = useState<Range>(initialDateRange)
  const disabledDates = useMemo(() => {
    let dates: Date[] = []

    reservations.forEach(reservation => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      })

      dates = [...dates, ...range]
    })

    return dates
  }, [reservations])

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate)

      setTotalPrice(dayCount ? dayCount * initialPrice : initialPrice)
    }
  }, [dateRange, initialPrice])

  const { mutate, isLoading } = useCreateReservationMutation()
  const createReservationWithAuthCheck = WithAuthCheck(mutate)
  const router = useRouter()
  const onCreateReservation = async () => {
    try {
      await createReservationWithAuthCheck({
        variables: { startDate: dateRange.startDate, endDate: dateRange.endDate, totalPrice, listingId },
      })
      toast.success('Reservation created successfully!')
      router.push('/trips')
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }

  return {
    disabledDates,
    totalPrice,
    dateRange,
    setDateRange,
    isLoading,
    onCreateReservation,
  }
}
