'use client'
import { User } from '@prisma/client'
import { FC } from 'react'

import { WithAuthCheck } from '@/utils/WithAuthChecks'

import { useRentModal } from '../modals/rent-modal/hooks/use-rent-modal'
import UserMenu from './user-menu'

type InfoProps = {
  currentUser: User | null
}

// const UserMenu = dynamic(() => import('./user-menu'), { ssr: false })
const Info: FC<InfoProps> = ({ currentUser }) => {
  const { onOpen } = useRentModal()
  const openRentModalWithCehck = WithAuthCheck(onOpen)

  return (
    <article className='relative'>
      <div className='flex items-center gap-3'>
        <button
          className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'
          onClick={openRentModalWithCehck}
        >
          Aribnb you home
        </button>
        <UserMenu currentUser={currentUser} />
      </div>
    </article>
  )
}

export default Info
