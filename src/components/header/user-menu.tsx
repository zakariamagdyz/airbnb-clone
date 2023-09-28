'use client'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import React, { FC, useEffect, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'

import Avatar from '../avatar'
import { useLoginModal } from '../modals/login-modal/hooks/use-login-modal'
import { useRegisterModal } from '../modals/register-modal/hooks/use-register-modal'
import { useRentModal } from '../modals/rent-modal/hooks/use-rent-modal'

type UserMenuProps = {
  currentUser: Omit<User, 'password'> | null
}
const UserMenu: FC<UserMenuProps> = ({ currentUser }) => {
  const [showMenu, setShowMenu] = React.useState(false)
  const { onOpen } = useRegisterModal()
  const { onOpen: onLoginModalOpen } = useLoginModal()
  const { onOpen: onRentModalOpen } = useRentModal()
  const dropdownRef = useRef<HTMLDivElement>(null)
  const handleShowMenu = () => {
    setShowMenu(showMenu => !showMenu)
  }
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        if (showMenu) setShowMenu(false)
      }
    }

    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [showMenu])

  return (
    <>
      <button
        className='flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
        onClick={handleShowMenu}
      >
        <AiOutlineMenu />
        <div className='hidden md:block'>
          <Avatar src={currentUser?.image} />
        </div>
      </button>

      {showMenu && (
        <div ref={dropdownRef} className='absolute right-0 top-14 w-48 rounded-md bg-white shadow-md'>
          {currentUser ? (
            <ul className='flex flex-col gap-2 '>
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <p className='p-4'>{currentUser?.name}</p>
              </li>
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <p className='p-4'>My trips</p>
              </li>{' '}
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <p className='p-4'>My favorites</p>
              </li>
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <p className='p-4'>My properties</p>
              </li>
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <button className='p-4' onClick={onRentModalOpen}>
                  Airbnb my home
                </button>
              </li>
              <hr />
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <button className='flex grow gap-3 p-4' onClick={() => signOut()}>
                  <VscAccount className='h-4 w-4' />
                  <span className='text-sm font-semibold'>Signout</span>
                </button>
              </li>
            </ul>
          ) : (
            <ul className='flex flex-col gap-2 '>
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <button className='flex grow gap-3 p-4' onClick={onLoginModalOpen}>
                  <MdLogin className='h-4 w-4' />
                  <span className='text-sm font-semibold'>Login</span>
                </button>
              </li>
              <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
                <button className='flex grow gap-3 p-4' onClick={onOpen}>
                  <VscAccount className='h-4 w-4' />
                  <span className='text-sm font-semibold'>Signup</span>
                </button>
              </li>
            </ul>
          )}
        </div>
      )}
    </>
  )
}

export default UserMenu
