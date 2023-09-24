import React from 'react'
import { useController } from 'react-hook-form'

import Input from '@/components/inputs/input'

import { StepProps } from '../../types'

const PriceStep = ({ control }: StepProps) => {
  const {
    field,
    formState: { errors },
  } = useController({ control, name: 'price' })
  return (
    <div className='space-y-8'>
      <Input id='price' label='Price' {...field} formatPrice errors={errors} type='number' />
    </div>
  )
}

export default PriceStep
