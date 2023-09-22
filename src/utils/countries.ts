import countries from 'world-countries'

const formatedCountries = countries.map(country => ({
  value: country.cca2,
  label: country.name.common,
  flag: country.flag,
  latlng: country.latlng,
  region: country.region,
}))

export const getAllCountries = () => {
  return formatedCountries
}

export const getCountryByValue = (value: string) => {
  return formatedCountries.find(country => country.label === value)
}

export type Country = (typeof formatedCountries)[number]
