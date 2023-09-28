import prismadb from '@/libs/prismadb'

import { Listing } from './schema'

export const createListing = async (listingData: Listing, userId: string) => {
  return prismadb.listing.create({ data: { ...listingData, user: { connect: { id: userId } } } })
}

export const getListings = async ({ category }: { category?: string } = { category: '' }) => {
  return prismadb.listing.findMany({ orderBy: { createdAt: 'desc' }, where: { category } })
}
