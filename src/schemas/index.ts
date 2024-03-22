import { ChannelType } from '@prisma/client'
import { z } from 'zod'

const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpg', 'image/jpeg']
const MAX_IMAGE_SIZE_IN_MB = 2

const sizeInMB = (sizeInBytes: number, decimalsNum = 2) => {
  const result = sizeInBytes / (1024 * 1024)
  return +result.toFixed(decimalsNum)
}

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
  username: z.string()
    .min(3, {
      message: 'Username must be at least 3 characters.',
    })
    .regex(/^[a-zA-Z0-9_]+$/, {
      message: 'Invalid characters.',
    }),
  password: z.string().min(6, {
    message: 'Password must be at least 6 characters.',
  }),
})

export const serverModalSchema = z.object({
  name: z.string().min(1, {
    message: 'Server name is required.',
  }),
  files: z
    .custom<FileList>()
    .refine((files) => {
      return Array.from(files ?? []).length !== 0
    }, 'Image is required')
    .refine((files) => {
      return Array.from(files ?? []).every(
        (file) => sizeInMB(file.size) <= MAX_IMAGE_SIZE_IN_MB
      )
    }, `The maximum image size is ${MAX_IMAGE_SIZE_IN_MB}MB`)
    .refine((files) => {
      return Array.from(files ?? []).every((file) =>
        ACCEPTED_IMAGE_TYPES.includes(file.type)
      )
    }, 'File type is not supported'),
})

export const channelModalSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.',
    }),
  type: z.nativeEnum(ChannelType),
})
