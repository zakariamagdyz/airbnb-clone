import dynamic from 'next/dynamic'
import React from 'react'

const UserMenu = dynamic(() => import('./user-menu'), { ssr: false })
const Info = () => {
  return (
    <article className='relative'>
      <div className='flex items-center gap-3'>
        <div className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'>
          Aribnb you home
        </div>
        <UserMenu />
      </div>
    </article>
  )
}

export default Info
