'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { FC, useCallback } from 'react'
import { type IconType } from 'react-icons'

type CategoryProps = {
  icon: IconType
  label: string
  selected?: boolean
}

const Category: FC<CategoryProps> = ({ icon: Icon, label, selected }) => {
  const router = useRouter()
  const params = useSearchParams()
  const handleClick = useCallback(() => {
    const currentQuery = qs.parse(params.toString())
    const updatedQuery: Record<string, string> = {
      ...currentQuery,
      category: label,
    }

    if (currentQuery.category === label) {
      delete updatedQuery.category
    }

    const url = qs.stringifyUrl({ url: window.location.pathname, query: updatedQuery }, { skipNull: true })

    router.push(url)
  }, [router, params, label])
  return (
    <button
      className={`
    flex 
    cursor-pointer 
    flex-col 
    items-center 
    justify-center
    gap-2
    border-b-2
    p-3
    transition
    hover:text-neutral-800
    ${selected ? 'border-b-neutral-800' : 'border-transparent'}
    ${selected ? 'text-neutral-800' : 'text-neutral-500'}
    
    `}
      onClick={handleClick}
    >
      <Icon size={26} />
      <div className='text-sm font-medium'>{label}</div>
    </button>
  )
}

export default Category
