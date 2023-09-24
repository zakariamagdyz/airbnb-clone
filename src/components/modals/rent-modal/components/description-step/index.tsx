import React from 'react'
import { useController } from 'react-hook-form'

import Input from '@/components/inputs/input'

import { StepProps } from '../../types'

const DescriptionStep = ({ control }: StepProps) => {
  const {
    field: descriptionField,
    formState: { errors: descriptionError },
  } = useController({ control, name: 'description' })
  const {
    field: titleField,
    formState: { errors: titleError },
  } = useController({ control, name: 'title' })
  return (
    <div className='space-y-8'>
      <Input id='title' label='Title' {...titleField} errors={titleError} />
      <hr />
      <Input id='description' label='Description' {...descriptionField} errors={descriptionError} />
    </div>
  )
}

export default DescriptionStep
