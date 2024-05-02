import type {
  Channel, DirectMessage, Friend, Member, Message, Server, User,
} from '@prisma/client'

// TODO: Omits ALL passwordHash from the codebase :)
//
// Add this to .eslintrj.json
// "no-restricted-imports": ["error", {
//   "paths": [{
//     "name": "@prisma/client",
//     "importNames": ["User"],
//     "message": "Please import UserNoPassword instead."
//   }]
// }]
export type UserNoPassword = Omit<User, 'passwordHash'>

export type MessageWithUser = Message & { user: User }
export type ServerWithChannel = Server & { channels: Channel[] }
export type MemberWithUser = Member & { user: User }

export type FriendWithBothUsers = Friend & { userRequest: User } & { userAccept: User }
export type DirectMessageWithUser = DirectMessage & { user: User }

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
