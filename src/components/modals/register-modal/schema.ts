import z from 'zod'

export const registerModalSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters long')
    .max(50, 'Name must be less than 50 characters long')
    .nonempty('Name is required'),
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long').nonempty('Password is required'),
})

export type RegisterModalSchema = z.infer<typeof registerModalSchema>

export const registerModalInitialValues: RegisterModalSchema = {
  name: '',
  email: '',
  password: '',
}
