import { z } from 'zod'

export const editProfileSchema = z.object({
  name: z.string()
    .min(1, {
      message: 'Please provide your display name.',
    }),
  about: z.string()
    .max(190, {
      message: 'Maximum is 190 characters.',
    }),
})
