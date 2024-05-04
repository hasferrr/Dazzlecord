'use server'

import { type Channel, ChannelType, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { isValidChannelName } from '@/helpers/helpers'
import { db } from '@/lib/db'

export const editChannel = async (
  channelName: string,
  channelType: ChannelType,
  channel: Channel,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  if (!isValidChannelName(channelName)) {
    return { error: 'the channel name is not meets its criteria' }
  }

  try {
    await db.server.update({
      where: {
        id: channel.serverId,
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
    return {
      success: 'channel edited',
      data: {
        ...channel,
        name: channelName,
        type: channelType,
      },
    }
  } catch (error) {
    return { error: 'failed edit the channel' }
  }
}
