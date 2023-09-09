import { User } from '@prisma/client'
import { FC } from 'react'

import Info from './info'
import Logo from './logo'
import Search from './search'

type NavbarProps = {
  currentUser: User | null
}

const Navbar: FC<NavbarProps> = ({ currentUser }) => {
  return (
    <header className='sticky top-0 z-10 border-b-[1px] bg-white shadow-sm'>
      <section className='container flex items-center justify-between gap-3 py-4 md:gap-0'>
        <Logo />
        <Search />
        <Info currentUser={currentUser} />
      </section>
    </header>
  )
}

export default Navbar
