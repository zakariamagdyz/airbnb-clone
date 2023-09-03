'use client'
import React, { useEffect, useRef } from 'react'
import { AiOutlineMenu } from 'react-icons/ai'
import { MdLogin } from 'react-icons/md'
import { VscAccount } from 'react-icons/vsc'

import Avatar from '../avatar'
import { useRegisterModal } from '../modals/register-modal/hooks/use-register-modal'

const UserMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false)
  const { onOpen } = useRegisterModal()
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
    <article className='relative'>
      <div className='flex items-center gap-3'>
        <div className='hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block'>
          Aribnb you home
        </div>
        <button
          className='flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1'
          onClick={handleShowMenu}
        >
          <AiOutlineMenu />
          <div className='hidden md:block'>
            <Avatar />
          </div>
        </button>
      </div>
      {showMenu && (
        <div ref={dropdownRef} className='absolute right-0 top-14 w-48 rounded-md bg-white shadow-md'>
          <ul className='flex flex-col gap-2 '>
            <li className='flex cursor-pointer items-center gap-3  hover:bg-slate-50'>
              <button className='flex grow gap-3 p-4' onClick={() => console.log('ho')}>
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
        </div>
      )}
    </article>
  )
}

export default UserMenu
