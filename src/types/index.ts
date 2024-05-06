/* eslint-disable no-restricted-imports */
import type {
  Channel, DirectMessage, Friend, Member, Message, Server, User,
} from '@prisma/client'

type UserNoPwd = Omit<User, 'passwordHash'>
export type UserNoEmailNoPwd = Omit<UserNoPwd, 'email'>

export type MessageWithUser = Message & { user: UserNoEmailNoPwd }
export type ServerWithChannel = Server & { channels: Channel[] }
export type MemberWithUser = Member & { user: UserNoEmailNoPwd }

export type FriendWithBothUsers = Friend & {
  userRequest: UserNoEmailNoPwd
} & {
  userAccept: UserNoEmailNoPwd
}
export type DirectMessageWithUser = DirectMessage & { user: UserNoEmailNoPwd }

export type MessageRouterPostRequestBody = {
  userId: string,
  channelId: string,
  message: MessageWithUser,
  action: 'SEND' | 'EDIT' | 'DELETE',
  type: 'channel',
} | {
  userId: string,
  channelId: string,
  message: DirectMessageWithUser,
  action: 'SEND' | 'EDIT' | 'DELETE',
  type: 'direct-message',
}
