import { User } from '@prisma/client'
import Image from 'next/image'
import React, { FC, Fragment } from 'react'

import Heading from '@/components/heading'
import HeartButton from '@/components/heart-button'
import { getCountryByValue } from '@/utils/countries'

type ListingHeadProps = {
  title: string
  imageSrc: string
  location: string
  id: string
  currentUser?: Omit<User, 'password'> | null
}

const ListingHead: FC<ListingHeadProps> = ({ id, imageSrc, location, title, currentUser }) => {
  const fullLocation = getCountryByValue(location)
  return (
    <Fragment>
      <Heading title={title} subtitle={`${fullLocation?.region} ${fullLocation?.label}`} />
      <div className='relative'>
        <figure className='relative h-[60vh] w-full overflow-hidden rounded-xl'>
          <Image fill priority src={imageSrc} alt={`${title} listing`} className='object-cover' />
        </figure>
        <div className='absolute right-5 top-5'>
          <HeartButton currentUser={currentUser} listingId={id} />
        </div>
      </div>
    </Fragment>
  )
}

export default ListingHead
