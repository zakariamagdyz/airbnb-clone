import React from "react"

import Logo from "./logo"
import Search from "./search"
import UserMenu from "./user-menu"

const Navbar = () => {
  return (
    <header className="sticky top-0 z-10 border-b-[1px] bg-white shadow-sm">
      <section className="container flex items-center justify-between gap-3 py-4 md:gap-0">
        <Logo />
        <Search />
        <UserMenu />
      </section>
    </header>
  )
}

export default Navbar
