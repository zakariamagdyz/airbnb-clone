import React, { Ref } from 'react'
import Select, { type GroupBase, type SelectInstance } from 'react-select'

import { getAllCountries, getCountryByValue } from '@/utils/countries'

type CountrySelectProps = {
  value: string
  onChange: (value: string) => void
  isError: boolean
}

type Option = {
  value: string
  label: string
  flag: string
  latlng: [number, number]
  region: string
}
const CountrySelect = (
  { onChange, value, isError }: CountrySelectProps,
  ref: Ref<SelectInstance<Option, false, GroupBase<Option>>>
) => {
  const countries = getAllCountries()
  const currentCountry = value ? getCountryByValue(value) : null
  return (
    <div className='relative z-20'>
      <Select
        ref={ref}
        isClearable
        placeholder='Anywhere'
        options={countries}
        value={currentCountry}
        formatOptionLabel={option => (
          <div className='relative z-10 flex items-center gap-3'>
            <p>{option.flag}</p>
            <p>
              {option.label},<span className='ml-1 text-neutral-500'>{option.region}</span>
            </p>
          </div>
        )}
        classNames={{
          control: () => `p-3 border-2 ${isError && '!border-red-500  shadow-red-500'}`,
          input: () => 'text-lg',
          option: () => 'text-lg',
        }}
        theme={theme => ({
          ...theme,
          borderRadius: 6,
          colors: {
            ...theme.colors,
            primary: 'black',
            primary25: '#ffe4e6',
          },
        })}
        onChange={country => onChange(country?.label || '')}
      />
    </div>
  )
}

export default React.forwardRef(CountrySelect)
