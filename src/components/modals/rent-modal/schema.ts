import z from 'zod'

import { RentFormSchema } from './types'

export const rentFormSchema = z.object({
  category: z.string().nonempty("Category can't be empty"),
  location: z.string().nonempty("Location can't be empty"),
  guestCount: z.number().int().positive(),
  roomCount: z.number().int().positive(),
  bathroomCount: z.number().int().positive(),
  imageSrc: z.string().nonempty("Image can't be empty"),
  title: z.string().nonempty("Title can't be empty"),
  description: z.string().nonempty("Description can't be empty"),
  price: z.number({ required_error: "Price can't be empty" }).int().positive(),
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
