'use server'

import { ChannelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { isValidChannelName } from '@/lib/helpers'

export const createNewChannel = async (
  channelName: string,
  channelType: ChannelType,
  serverId: string,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  if (!isValidChannelName(channelName)) {
    return { error: 'the channel name is not meets its criteria' }
  }

  const existingServer = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          AND: [
            {
              userId,
              role: { not: MemberRole.GUEST },
            },
            {
              userId,
              role: { not: MemberRole.MODERATOR },
            },
          ],
        },
      },
    },
  })
  if (!existingServer) {
    return { error: 'create channel aborted' }
  }

  try {
    const newChannel = await db.channel.create({
      data: {
        name: channelName,
        type: channelType,
        userId,
        serverId,
      },
    })
    return { success: 'channel created', data: newChannel }
  } catch (error) {
    return { error: 'failed create a channel' }
  }
}
