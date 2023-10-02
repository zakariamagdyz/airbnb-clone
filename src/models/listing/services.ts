import { cache } from 'react'

import prismadb from '@/libs/prismadb'

import { ReservationSchema } from '../reservation/schema'
import { Listing } from './schema'

export const createListing = async (listingData: Listing, userId: string) => {
  return prismadb.listing.create({ data: { ...listingData, user: { connect: { id: userId } } } })
}

export const getListings = async ({ category }: { category?: string } = { category: '' }) => {
  return prismadb.listing.findMany({ orderBy: { createdAt: 'desc' }, where: { category } })
}

export const getListingById = cache(async (id: string) => {
  try {
    return await prismadb.listing.findUnique({ where: { id }, include: { user: true } })
  } catch (err) {
    console.error(`Error fetching listing by id ${id}:`, err) // Optional: log the error for debugging
    return null
  }
})

type UpdateListingReservationProp = ReservationSchema & { userId: string }

export const updateListingReservation = ({
  endDate,
  listingId,
  startDate,
  totalPrice,
  userId,
}: UpdateListingReservationProp) => {
  return prismadb.listing.update({
    where: { id: listingId },
    data: { reservations: { create: { endDate, startDate, totalPrice, userId } } },
  })
}
