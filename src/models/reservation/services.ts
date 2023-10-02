import prismadb from '@/libs/prismadb'

export const deleteReservation = async (reservationId: string, userId: string) => {
  return prismadb.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId }, { listing: { userId } }],
    },
  })
}

type getReservationsParams = {
  listingId?: string
  userId?: string
  authorId?: string
}

export const getReservations = ({ listingId, userId, authorId }: getReservationsParams) => {
  const query = {
    ...(listingId && { listingId }),
    ...(userId && { userId }),
    ...(authorId && { listing: { userId: authorId } }),
  }

  return prismadb.reservation.findMany({
    where: query,
    include: { listing: true },
    orderBy: { createdAt: 'desc' },
  })
}
