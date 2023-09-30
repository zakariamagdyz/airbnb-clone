import { User } from '@prisma/client'
import dynamic from 'next/dynamic'
import React, { FC } from 'react'

import Avatar from '@/components/avatar'
import { categories } from '@/utils/categories'
import { getCountryByValue } from '@/utils/countries'

import ListingCategory from '../listing-category'

const Map = dynamic(() => import('@/components/map'), { ssr: false })

type ListingInfoProps = {
  user: Omit<User, 'password'> | null
  category: (typeof categories)[number] | undefined
  description: string
  roomCount: number
  guestCount: number
  bathroomCount: number
  location: string
}

const ListingInfo: FC<ListingInfoProps> = ({
  bathroomCount,
  category,
  description,
  guestCount,
  location,
  roomCount,
  user,
}) => {
  const coordinates = getCountryByValue(location)?.latlng
  return (
    <article className='space-y-4'>
      <header className='flex items-center gap-2 text-xl font-semibold'>
        <h2>Hosted by {user?.name}</h2>
        <Avatar src={user?.image} />
      </header>
      <aside className='flex items-center gap-4 font-light text-neutral-500'>
        <p>{guestCount} guests</p>
        <p>{roomCount} rooms</p>
        <p>{bathroomCount} bathrooms</p>
      </aside>

      <hr />

      {category && (
        <section>
          <ListingCategory icon={category.icon} label={category?.label} description={category?.description} />
        </section>
      )}
      <hr />
      <section className='text-lg font-light text-neutral-500'>
        <p>{description}</p>
      </section>
      <hr />

      <footer>
        <Map center={coordinates || [51.505, -0.09]} />
      </footer>
    </article>
  )
}

export default ListingInfo
