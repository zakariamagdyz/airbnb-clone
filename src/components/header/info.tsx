import { User } from '@prisma/client'
import { FC } from 'react'

import UserMenu from './user-menu'

type InfoProps = {
  currentUser: User | null
}

// const UserMenu = dynamic(() => import('./user-menu'), { ssr: false })
const Info: FC<InfoProps> = ({ currentUser }) => {
  return (
    <article className='relative'>
      <div className='flex items-center gap-3'>
        <div className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'>
          Aribnb you home
        </div>
        <UserMenu currentUser={currentUser} />
      </div>
    </article>
  )
}

export default Info
