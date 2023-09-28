import { Suspense } from 'react'

import Await from '@/components/await'
import EmptyState from '@/components/empty-state'
import ListingCard from '@/components/listings/listing-card'
import { getListings } from '@/models/listing/services'
import { getCurrentUser } from '@/models/user/services'

type Props = {
  searchParams: { category: string }
}

export default async function Home({ searchParams }: Props) {
  const listings = getListings({ category: searchParams.category })
  const currentUser = await getCurrentUser()
  return (
    <main key={Math.random()} className='container'>
      <Suspense fallback={<div>Loading...</div>}>
        <Await promise={listings}>
          {listings => {
            if (listings.length === 0) return <EmptyState showReset />
            return (
              <section className='grid gap-8   pt-24 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
                {listings.map(listing => (
                  <ListingCard key={listing.id} listing={listing} currentUser={currentUser} />
                ))}
              </section>
            )
          }}
        </Await>
      </Suspense>
    </main>
  )
}
