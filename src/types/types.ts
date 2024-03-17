import { Channel, Member, Server, User } from '@prisma/client'

export type ServerWithMembersWithUsers = Server & {
  channels: Channel[]
  members: (Member & {
    user: User
  })[]
}
