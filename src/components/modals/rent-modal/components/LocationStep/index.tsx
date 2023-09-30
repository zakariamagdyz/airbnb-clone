import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'
import { useController, useWatch } from 'react-hook-form'

import { getCountryByValue } from '@/utils/countries'

import { StepProps } from '../../types'
import CountrySelect from './country-select'

const LocationStep = ({ control, setCustomValue }: StepProps) => {
  const location = useWatch({ control, name: 'location' })
  const currentLocation = location ? getCountryByValue(location) : null
  const {
    fieldState: { error },
  } = useController({ control, name: 'location' })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const Map = useMemo(() => dynamic(() => import('@/components/map'), { ssr: false }), [currentLocation])
  return (
    <section className='flex flex-col gap-8'>
      {error && <p className='text-red-500'>{error.message}</p>}
      <div className=' space-y-8'>
        <CountrySelect value={location} onChange={value => setCustomValue('location', value)} />
        <Map center={currentLocation?.latlng ?? [51.505, -0.09]} />
      </div>
    </section>
  )
}

export default LocationStep
