import { NextResponse } from 'next/server'

import { updateListingReservation } from '@/models/listing/services'
import { reservationBodySchema } from '@/models/reservation/schema'
import { getCurrentUser } from '@/models/user/services'
import { handleServerError } from '@/utils/handleServerErr'

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser()

    if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })

    const body = await req.json()
    const reservation = await reservationBodySchema.parseAsync(body)
    const newReservation = await updateListingReservation({ ...reservation, userId: currentUser.id })
    return NextResponse.json(newReservation, { status: 201 })
  } catch (error) {
    handleServerError(error, '[RESERVATION_POST]')
  }
}
