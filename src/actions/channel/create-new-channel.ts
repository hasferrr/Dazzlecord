'use server'

import { ChannelType } from '@prisma/client'

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
    throw Error('Unauthorized')
  }
  const userId = session.user.id

  if (!isValidChannelName(channelName)) {
    return { error: 'the channel name is not meets its criteria' }
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
