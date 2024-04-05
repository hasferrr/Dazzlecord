'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const getAllChannelMessage = async (channelId: string) => {
  try {
    const session = await auth()
    if (!session) {
      throw Error('Unauthorized')
    }
    const userId = session.user.id

    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        messages: {
          include: {
            user: true,
          },
        },
      },
    })
    if (!channel) {
      return { error: 'Channel not found' }
    }

    const server = await db.server.findUnique({
      where: {
        id: channel.serverId,
        members: {
          some: {
            userId,
          },
        },
      },
    })
    if (!server) {
      return { error: 'Server not found' }
    }

    return {
      success: 'Success retrieved',
      data: channel.messages,
    }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
