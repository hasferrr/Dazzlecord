import type {
  Channel, Member, Message, Server, User,
} from '@prisma/client'

export type MessageWithUser = Message & { user: User }
export type ServerWithChannel = Server & { channels: Channel[] }
export type MemberWithUser = Member & { user: User }
