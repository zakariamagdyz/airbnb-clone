import { string, z } from 'zod'

export const userInputSchema = z.object({
  name: string(),
  email: string().email(),
  password: string().min(8),
})

export type UserData = z.infer<typeof userInputSchema>
