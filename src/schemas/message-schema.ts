import { z } from 'zod'

import { filesSizeValidatorAllowNoFile } from './validator/files-validator'

const regex = /[^A-Za-z0-9.,\-_()[\] ]/g

export const messageSchema = z.object({
  content: z.string().min(0),
  fileType: z.string().nullish(),
  fileName: z.string().nullish(),
  fileSize: z.number().nullish(),
})
  .transform((val) => ({
    ...val,
    content: val.content?.trim(),
    fileName: val.fileName?.replaceAll(regex, '_').replaceAll(' ', '_'),
  }))
  .refine((val) => val.fileName || val.content !== '', 'Empty string is not allowed')

export const messageSchemaWithFile = z.object({
  content: z.string().min(0),
  fileType: z.string().nullish(),
  fileName: z.string().nullish(),
  fileSize: z.number().nullish(),
  files: filesSizeValidatorAllowNoFile,
})
  .transform((val) => ({
    ...val,
    content: val.content?.trim(),
    fileName: val.fileName?.replaceAll(regex, '_').replaceAll(' ', '_'),
  }))
  .refine((val) => val.fileName || val.content !== '', 'Empty string is not allowed')
