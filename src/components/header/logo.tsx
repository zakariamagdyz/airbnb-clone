import Image from 'next/image'
import React from 'react'

import logo from '@/assets/logo.png'

const Logo = () => {
  return <Image priority src={logo} alt='logo' height='31' width='100' />
}

export default Logo
