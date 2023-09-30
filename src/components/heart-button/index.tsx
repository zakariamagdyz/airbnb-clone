'use client'
import { User } from '@prisma/client'
import { FC } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import useFavorite from './hooks/useFavorite'

type HeartButtonProps = {
  currentUser?: Omit<User, 'password'> | null
  listingId: string
}
const HeartButton: FC<HeartButtonProps> = ({ currentUser, listingId }) => {
  const { hasFavorited, toggleFavoriteWithAuth } = useFavorite({ currentUser, listingId })

  return (
    <button className='relative cursor-pointer transition hover:opacity-50' onClick={toggleFavoriteWithAuth}>
      <AiOutlineHeart size={28} className='absolute right-[-2px] top-[-2px] fill-white ' />
      <AiFillHeart size={24} className={`${hasFavorited ? 'fill-red-500' : 'fill-neutral-500/70'}`} />
    </button>
  )
}

export default HeartButton
