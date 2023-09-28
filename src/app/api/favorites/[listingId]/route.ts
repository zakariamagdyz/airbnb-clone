import { NextResponse } from 'next/server'

import prismadb from '@/libs/prismadb'
import { getCurrentUser } from '@/models/user/services'
import { handleServerError } from '@/utils/handleServerErr'

type Props = {
  params: {
    listingId: string
  }
}

export const POST = async (_: Request, { params: { listingId } }: Props) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const favoriteIds = [...(currentUser.favoriteIds || []), listingId]
    const updatedUser = await prismadb.user.update({ where: { id: currentUser.id }, data: { favoriteIds } })
    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    handleServerError(error, '[FAVORITE_POST]')
  }
}

export const DELETE = async (_: Request, { params: { listingId } }: Props) => {
  try {
    const currentUser = await getCurrentUser()
    if (!currentUser) return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
    const favoriteIds = currentUser.favoriteIds?.filter(id => id !== listingId)
    const updatedUser = await prismadb.user.update({ where: { id: currentUser.id }, data: { favoriteIds } })
    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    handleServerError(error, '[FAVORITE_DELETE]')
  }
}
