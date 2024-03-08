import { z } from 'zod'

export const loginSchema = z.object({
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export const registerSchema = z.object({
  name: z.string().min(1, {
    message: 'Please provide your display name.',
  }),
  email: z.string()
    .min(1, {
      message: 'Please provide your email.',
    })
    .email('This is not a valid email.'),
  username: z.string().min(3, {
    message: 'Username must be at least 3 characters.',
  }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})
