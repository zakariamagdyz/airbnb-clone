import z from 'zod'

export const loginModalSchema = z.object({
  email: z.string().email('Invalid email address').nonempty('Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long').nonempty('Password is required'),
})

export type LoginModalSchema = z.infer<typeof loginModalSchema>

export const loginModalInitialValues: LoginModalSchema = {
  email: '',
  password: '',
}
