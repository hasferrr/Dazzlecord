import { z } from 'zod'

export const messageSchema = z.object({
  content: z.string().min(1),
})
  .transform((val) => ({
    content: val.content.trim(),
  }))
  .refine((val) => val.content !== '', 'Empty string is not allowed')
