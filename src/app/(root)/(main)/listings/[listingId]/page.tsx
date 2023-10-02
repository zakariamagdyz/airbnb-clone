import { Metadata } from 'next'

import EmptyState from '@/components/empty-state'
import { getListingById } from '@/models/listing/services'
import { getReservations } from '@/models/reservation/services'
import { getCurrentUser } from '@/models/user/services'

import ListingClient from './components/listing-client'

type Props = {
  params: { listingId: string }
}

export const generateMetadata = async ({ params: { listingId } }: Props): Promise<Metadata> => {
  const listing = await getListingById(listingId)
  if (!listing) return { title: 'Listing not found' }
  return {
    title: listing.title,
    description: listing.description,
  }
}
const ListingPage = async ({ params: { listingId } }: Props) => {
  const listing = await getListingById(listingId)
  const reservations = await getReservations({ listingId })

  const user = await getCurrentUser()

  if (!listing) return <EmptyState />
  return <ListingClient listing={listing} currentUser={user} reservations={reservations} />
}

export default ListingPage
