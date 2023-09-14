import { User } from '@prisma/client'
import { FC } from 'react'

import Categories from './Categories'
import Info from './info'
import Logo from './logo'
import Search from './search'

type NavbarProps = {
  currentUser: User | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className='sticky top-0 z-10  bg-white '>
      <section className='  border-b-[1px] shadow-sm '>
        <div className=' container flex items-center justify-between gap-3 py-4 md:gap-0'>
          <Logo />
          <Search />
          <Info currentUser={currentUser} />{' '}
        </div>
      </section>
      <Categories />
    </header>
  )
}

export default Navbar
