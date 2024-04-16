import type { Message, User } from '@prisma/client'

export type MessageWithUser = Message & { user: User }
