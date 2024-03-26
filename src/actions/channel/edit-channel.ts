'use server'

import { type Channel, ChannelType, MemberRole } from '@prisma/client'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { isValidChannelName } from '@/lib/helpers'

export const editChannel = async (
  channelName: string,
  channelType: ChannelType,
  channel: Channel,
) => {
  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const userId = session.user.id

  if (!isValidChannelName(channelName)) {
    return { error: 'the channel name is not meets its criteria' }
  }

  try {
    const updatedServer = await db.server.update({
      where: {
        id: channel.serverId,
        members: {
          some: {
            userId,
            role: {
              not: MemberRole.GUEST,
            },
          },
        },
      },
      data: {
        channels: {
          update: {
            where: {
              id: channel.id,
            },
            data: {
              name: channelName,
              type: channelType,
            },
          },
        },
      },
    })
    return { success: 'channel edited', data: updatedServer }
  } catch (error) {
    return { error: 'failed edit the channel' }
  }
}
