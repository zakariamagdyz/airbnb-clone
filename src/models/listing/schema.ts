import { z } from 'zod'

export const listingBodySchema = z.object({
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

export type Listing = z.infer<typeof listingBodySchema>
