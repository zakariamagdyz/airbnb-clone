import React, { FC } from 'react'
import { type IconType } from 'react-icons'

type ListingCategoryProps = {
  icon: IconType
  label: string
  description: string
}
const ListingCategory: FC<ListingCategoryProps> = ({ description, icon: Icon, label }) => {
  return (
    <section>
      <div className='flex  items-center gap-4'>
        <Icon size={40} className='text-neutral-600' />
        <div>
          <h2 className='text-lg font-semibold'>{label}</h2>
          <p className='font-light text-neutral-500'>{description}</p>
        </div>
      </div>
    </section>
  )
}

export default ListingCategory
