import { useController } from 'react-hook-form'

import CurrencyInput from '@/components/inputs/currency-input'

import { StepProps } from '../../types'

const PriceStep = ({ control }: StepProps) => {
  const {
    field,
    formState: { errors },
  } = useController({ control, name: 'price' })

  return (
    <div className='space-y-8'>
      <CurrencyInput error={errors.price} {...field} />
    </div>
  )
}

export default PriceStep
