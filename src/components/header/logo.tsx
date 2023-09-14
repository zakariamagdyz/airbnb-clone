'use client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'

import logo from '@/assets/logo.png'

const Logo = () => {
  const router = useRouter()
  return (
    <Image
      priority
      src={logo}
      alt='logo'
      height='31'
      width='100'
      className='cursor-pointer'
      onClick={() => router.push('/')}
    />
  )
}

export default Logo
