import Image from 'next/image'
import React from 'react'

import avatar from '@/assets/placeholder.jpg'

const Avatar = ({ src }: { src?: string | null }) => {
  return <Image src={src || avatar} alt='Avatar' height='30' width='30' className='rounded-full' />
}

export default Avatar
