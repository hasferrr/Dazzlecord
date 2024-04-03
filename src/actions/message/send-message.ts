'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const sendMessage = async (
  channelId: string,
  content: string,
  fileName?: string,
) => {
  try {
    const session = await auth()
    if (!session) {
      throw Error('Unauthorized')
    }
    const userId = session.user.id

    const channel = await db.channel.findFirst({
      where: {
        id: channelId,
      },
    })
    if (!channel) {
      return { error: 'Channel not found' }
    }

    const server = await db.server.findFirst({
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

    const message = await db.message.create({
      data: {
        content,
        fileName,
        userId,
        channelId,
        serverId: channel.serverId,
      },
    })

    const channelKey = `chat:${channelId}:messages`

    return {
      success: 'Message saved',
      data: { channelKey, message },
    }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
