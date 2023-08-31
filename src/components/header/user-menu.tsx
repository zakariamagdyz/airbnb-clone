"use client"
import React from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { MdLogin } from "react-icons/md"
import { VscAccount } from "react-icons/vsc"

import Avatar from "../avatar"

const UserMenu = () => {
  const [showMenu, setShowMenu] = React.useState(false)

  const handleShowMenu = () => {
    setShowMenu(!showMenu)
  }
  return (
    <article className="relative">
      <div className="flex items-center gap-3">
        <div className="hidden cursor-pointer rounded-full px-4 py-3 text-sm font-semibold transition hover:bg-neutral-100 md:block">
          Aribnb you home
        </div>
        <button
          className="flex cursor-pointer flex-row items-center gap-3 rounded-full border-[1px] border-neutral-200 p-4 transition hover:shadow-md md:px-2 md:py-1"
          onClick={handleShowMenu}
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar />
          </div>
        </button>
      </div>
      {showMenu && (
        <div className="absolute right-0 top-14 w-48 rounded-md bg-white shadow-md">
          <ul className="flex flex-col gap-2 ">
            <li className="flex cursor-pointer items-center gap-3 p-4 hover:bg-slate-50">
              <button className="flex gap-3" onClick={() => console.log("hola")}>
                <MdLogin className="h-4 w-4" />
                <span className="text-sm font-semibold">Login</span>
              </button>
            </li>
            <li className="flex cursor-pointer items-center gap-3 p-4 hover:bg-slate-50">
              <button className="flex gap-3">
                <VscAccount className="h-4 w-4" />
                <span className="text-sm font-semibold">Signup</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </article>
  )
}

export default UserMenu
