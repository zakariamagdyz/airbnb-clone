import React from "react"
import { BiSearch } from "react-icons/bi"

const Search = () => {
  return (
    <article className="w-full cursor-pointer rounded-full border-[1px] py-2 shadow-sm transition hover:shadow-md md:w-auto">
      <ul className="flex items-center justify-between">
        <li className="px-6 text-sm font-semibold">Anywhere</li>
        <li className="hidden flex-1 border-x-[1px] px-6 text-center text-sm font-semibold sm:block">Any week</li>
        <li className="flex items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">Add Guests</div>
          <div className="rounded-full bg-rose-500 p-2 text-white">
            <BiSearch className="h-4 w-4" />
          </div>
        </li>
      </ul>
    </article>
  )
}

export default Search
