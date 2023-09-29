import { Listing, Reservation } from '@prisma/client'
import React, { FC, useMemo } from 'react'

import { categories } from '@/utils/categories'

type ListingClientProps = {
  reservation?: Reservation[]
  listing: Listing
}
const ListingClient: FC<ListingClientProps> = ({ listing, reservation }) => {
  const category = useMemo(() => categories.find(item => item.label === listing.category), [listing])
  console.log(category)
  console.log(reservation)
  return <div>{listing.title}</div>
}

export default ListingClient
