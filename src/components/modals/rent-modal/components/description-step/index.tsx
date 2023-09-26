import { useController } from 'react-hook-form'

import Input from '@/components/inputs/input'

import { RentFormSchema, StepProps } from '../../types'

const DescriptionStep = ({ control, register }: StepProps) => {
  const {
    formState: { errors: descriptionError },
  } = useController({ control, name: 'description' })
  const {
    formState: { errors: titleError },
  } = useController({ control, name: 'title' })
  return (
    <div className='space-y-8'>
      <Input<RentFormSchema> id='title' label='Title' register={register} errors={titleError} />
      <hr />
      <Input<RentFormSchema> id='description' label='Description' register={register} errors={descriptionError} />
    </div>
  )
}

export default DescriptionStep
