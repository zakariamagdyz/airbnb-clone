import { NextResponse } from 'next/server'

import { deleteReservation } from '@/models/reservation/services'
import { getCurrentUser } from '@/models/user/services'
import { handleServerError } from '@/utils/handleServerErr'

type Props = {
  params: {
    reservationId: string
  }
}

export const DELETE = async (req: Request, { params: { reservationId } }: Props) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    await deleteReservation(reservationId, currentUser.id)
    return NextResponse.json({ message: 'Reservation has been deleted' }, { status: 200 })
  } catch (error) {
    handleServerError(error, '[RESERVATION_DELETE]')
  }
}
