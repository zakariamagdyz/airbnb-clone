import { NextResponse } from 'next/server'

import { listingBodySchema } from '@/models/listing/schema'
import { createListing } from '@/models/listing/services'
import { getCurrentUser } from '@/models/user/services'
import { handleServerError } from '@/utils/handleServerErr'

export const POST = async (req: Request) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const body = await req.json()
    const list = await listingBodySchema.parseAsync(body)
    const newList = await createListing(list, currentUser.id)
    return NextResponse.json(newList, { status: 201 })
  } catch (error) {
    handleServerError(error, '[LISTING_POST]')
  }
}
