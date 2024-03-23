import { ChannelType } from '@prisma/client'
import { z } from 'zod'

export const channelModalSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: 'Channel name is required.',
    }),
  type: z.nativeEnum(ChannelType),
})
