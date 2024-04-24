import { z } from 'zod'

import { filesValidator, filesValidatorAllowNoFile } from './validator/filesValidator'

const objectSchema = {
  name: z.string()
    .min(1, {
      message: 'Server name is required.',
    }),
}

export const serverModalSchema = z.object({
  ...objectSchema,
  files: filesValidator,
})

export const serverModalSchemaAllowNoFile = z.object({
  ...objectSchema,
  files: filesValidatorAllowNoFile,
})
