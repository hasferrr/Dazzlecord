import type { Channel, Message, Server, User } from '@prisma/client'

export type MessageWithUser = Message & { user: User }
export type ServerWithChannel = Server & { channels: Channel[] }
