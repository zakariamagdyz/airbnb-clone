import React from 'react'
import Select from 'react-select'

import { getAllCountries, getCountryByValue } from '@/utils/countries'

type CountrySelectProps = {
  value: string
  onChange: (value: string) => void
}
const CountrySelect: React.FC<CountrySelectProps> = ({ onChange, value }) => {
  const countries = getAllCountries()
  const currentCountry = value ? getCountryByValue(value) : null
  return (
    <div className='relative z-20'>
      <Select
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
          control: () => 'p-3 border-2',
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

export default CountrySelect
