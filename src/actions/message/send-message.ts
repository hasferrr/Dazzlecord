'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { socketServer } from '@/lib/socket-server'

export const sendMessage = async (
  content: string,
  fileName: string | null,
  channelId: string,
  serverId: string,
) => {
  if (!socketServer.connected) {
    socketServer.connect()
  }

  try {
    const session = await auth()
    if (!session) {
      throw Error('Unauthorized')
    }
    const userId = session.user.id

    const message = await db.message.create({
      data: {
        content,
        fileName,
        userId,
        channelId,
        serverId,
      },
    })

    socketServer.emit('message', {
      type: 'channel',
      channelId,
      message,
    })

    return {
      success: 'Message saved',
      data: { message },
    }
  } catch (error) {
    console.error(error)
    return { error: error }
  }
}
