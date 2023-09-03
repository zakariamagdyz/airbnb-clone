import Image from 'next/image'
import React from 'react'

import avatar from '@/assets/placeholder.jpg'

const Avatar = () => {
  return <Image src={avatar} alt='Avatar' height='30' width='30' className='rounded-full' />
}

export default Avatar
