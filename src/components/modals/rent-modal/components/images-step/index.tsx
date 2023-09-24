import React from 'react'
import { useController, useWatch } from 'react-hook-form'

import { StepProps } from '../../types'
import ImageUpload from './image-upload'

const ImagesStep = ({ control, setCustomValue }: StepProps) => {
  const imageSrc = useWatch({ control, name: 'imageSrc' })
  const {
    fieldState: { error },
  } = useController({ control, name: 'imageSrc' })
  return (
    <section className='flex flex-col gap-8'>
      {error && <p className='text-red-500'>{error.message}</p>}
      <ImageUpload value={imageSrc} onUpload={value => setCustomValue('imageSrc', value)} />
    </section>
  )
}

export default ImagesStep
