import React, { FC } from 'react'

type HeadeingProps = {
  title: string
  subtitle?: string
  center?: boolean
}

const Heading: FC<HeadeingProps> = ({ title, center, subtitle }) => {
  return (
    <div className={center ? 'text-center' : 'text-start'}>
      <div className='text-2xl font-bold'>{title}</div>
      <div className='mt-2 font-light text-neutral-500'>{subtitle}</div>
    </div>
  )
}

export default Heading
