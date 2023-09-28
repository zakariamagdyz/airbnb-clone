'use client'
import { Listing, Reservation, User } from '@prisma/client'
import { format } from 'date-fns'
import Image from 'next/image'
import Link from 'next/link'
import React, { FC, useCallback, useMemo } from 'react'

import Button from '@/components/button'
import HeartButton from '@/components/heart-button'
import { getCountryByValue } from '@/utils/countries'

type ListingCardProps = {
  listing: Listing
  reservation?: Reservation
  onAction?: (id: string) => void
  disabled?: boolean
  actionLabel?: string
  actionId?: string
  currentUser: Omit<User, 'password'> | null
}
const ListingCard: FC<ListingCardProps> = ({
  listing,
  currentUser,
  actionId = '',
  actionLabel,
  disabled,
  onAction,
  reservation,
}) => {
  const location = getCountryByValue(listing.location)
  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation()
      if (disabled) return
      onAction?.(actionId)
    },
    [onAction, disabled, actionId]
  )

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice
    return listing.price
  }, [listing.price, reservation])

  const reservationDate = useMemo(() => {
    if (!reservation) return null

    const start = new Date(reservation.startDate)
    const end = new Date(reservation.endDate)

    return `${format(start, 'PP')} - ${format(end, 'PP')}`
  }, [reservation])

  return (
    <article className='group relative cursor-pointer'>
      <div className='absolute right-3 top-3 z-30'>
        <HeartButton listingId={listing.id} currentUser={currentUser} />
      </div>
      <Link href={`/listings/${listing.id}`} className='flex w-full flex-col gap-2'>
        <div className='relative aspect-square w-full overflow-hidden rounded-xl'>
          <Image
            fill
            src={listing.imageSrc}
            alt={listing.title}
            className='object-cover transition group-hover:scale-110'
            sizes='(min-width: 1280px) 400px, (min-width: 1040px) 350px, (min-width: 780px) 250px, (min-width: 640px) 188px, calc(100vw - 228px)'
          />
        </div>
        <p className='text-lg font-semibold'>
          {location?.region}, {location?.label}
        </p>
        <p className='font-light text-neutral-500'>{reservationDate || listing.category}</p>
        <div className='flex items-center  gap-1 '>
          <p className='font-semibold'>${price}</p>
          {!reservation && <p className='font-light'>night</p>}
        </div>
      </Link>
      {onAction && <Button small disabled={disabled} label={actionLabel || ''} onClick={handleCancel} />}
    </article>
  )
}

export default ListingCard
