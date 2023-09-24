import React from 'react'
import { useWatch } from 'react-hook-form'

import { StepProps } from '../../types'
import Counter from './counter'

const InfoStep = ({ control, setCustomValue }: StepProps) => {
  const guestCount = useWatch({ control, name: 'guestCount' })
  const roomCount = useWatch({ control, name: 'roomCount' })
  const bathroomCount = useWatch({ control, name: 'bathroomCount' })

  return (
    <section className='space-y-8'>
      <Counter
        title='Guests'
        subTitle='How many guests?'
        value={guestCount}
        onChange={value => setCustomValue('guestCount', value)}
      />
      <hr />
      <Counter
        title='Rooms'
        subTitle='How many rooms do you have?'
        value={roomCount}
        onChange={value => setCustomValue('roomCount', value)}
      />
      <hr />
      <Counter
        title='Bathrooms'
        subTitle='How many bathrooms do you have?'
        value={bathroomCount}
        onChange={value => setCustomValue('bathroomCount', value)}
      />
    </section>
  )
}

export default InfoStep
