'use client'
import { Listing, Reservation, User } from '@prisma/client'
import { FC, useMemo } from 'react'

import ListingHead from '@/components/listings/listing-head'
import ListingInfo from '@/components/listings/listing-info'
import ListingReservation from '@/components/listings/listing-reservation'
import { categories } from '@/utils/categories'

import { useDateReservation } from './hooks/use-date-reservation'

type ListingClientProps = {
  reservations?: Reservation[]
  listing: Listing & { user: User }
  currentUser?: Omit<User, 'password'> | null
}
const ListingClient: FC<ListingClientProps> = ({ listing, reservations = [], currentUser }) => {
  const category = useMemo(() => categories.find(item => item.label === listing.category), [listing.category])

  const { dateRange, disabledDates, setDateRange, totalPrice, isLoading, onCreateReservation } = useDateReservation({
    initialPrice: listing.price,
    reservations,
    listingId: listing.id,
  })

  return (
    <main className='container'>
      <section className='mx-auto max-w-screen-lg'>
        <div className='mt-6 space-y-6'>
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            location={listing.location}
            id={listing.id}
            currentUser={currentUser}
          />
        </div>

        <article className='mt-6 grid grid-cols-1 md:grid-cols-7 md:gap-10'>
          <div className='col-span-4'>
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guestCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              location={listing.location}
            />
          </div>
          <div className='order-first mb-10 md:order-last md:col-span-3'>
            <ListingReservation
              price={listing.price}
              totalPrice={totalPrice}
              dateRange={dateRange}
              disabled={isLoading}
              disabledDates={disabledDates}
              onChangeDate={value => setDateRange(value)}
              onSubmit={onCreateReservation}
            />
          </div>
        </article>
      </section>
    </main>
  )
}

export default ListingClient
