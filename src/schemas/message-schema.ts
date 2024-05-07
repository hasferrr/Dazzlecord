import { z } from 'zod'

import { filesSizeValidatorAllowNoFile } from './validator/files-validator'

export const messageSchema = z.object({
  content: z.string().min(1),
})
  .transform((val) => ({
    content: val.content.trim(),
  }))
  .refine((val) => val.content !== '', 'Empty string is not allowed')

export const messageSchemaWithFile = z.object({
  content: z.string().min(1),
  files: filesSizeValidatorAllowNoFile,
})
  .transform((val) => ({
    ...val,
    content: val.content.trim(),
  }))
  .refine((val) => val.content !== '', 'Empty string is not allowed')
