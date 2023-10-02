import { z } from 'zod'

export const reservationBodySchema = z.object({
  listingId: z.string().nonempty('Listing ID is required'),
  startDate: z.string().nonempty('Start date is required'),
  endDate: z.string().nonempty('End date is required'),
  totalPrice: z.number().positive('Total price must be positive'),
})

export type ReservationSchema = z.infer<typeof reservationBodySchema>
