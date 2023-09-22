import z from 'zod'

import { RentFormSchema } from './types'

export const rentFormSchema = z.object({
  category: z.string().nonempty("Category can't be empty"),
  location: z.string().nonempty("Location can't be empty"),
  guestCount: z.number().int().positive(),
  roomCount: z.number().int().positive(),
  bathroomCount: z.number().int().positive(),
  imageSrc: z.string().nonempty(),
  price: z.number().int().positive(),
  title: z.string().nonempty(),
  description: z.string().nonempty(),
})

export const RentInitalValues: RentFormSchema = {
  category: '',
  location: '',
  guestCount: 1,
  roomCount: 1,
  bathroomCount: 1,
  imageSrc: '',
  price: 1,
  title: '',
  description: '',
}
