'use client'
import { usePathname, useSearchParams } from 'next/navigation'
import React from 'react'

import { categories } from '@/utils/categories'

import Category from './Category'

const Categories = () => {
  const pathName = usePathname()
  const params = useSearchParams()
  const category = params.get('category')
  const isMainPage = pathName === '/'
  if (!isMainPage) return null

  return (
    <div className='container flex flex-row items-center justify-between overflow-x-auto pt-4'>
      {categories.map(item => (
        <Category key={item.label} label={item.label} icon={item.icon} selected={item.label === category} />
      ))}
    </div>
  )
}

export default Categories
