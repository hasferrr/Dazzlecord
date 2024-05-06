'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const getAllChannelMessage = async (channelId: string) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const channel = await db.channel.findUnique({
      where: {
        id: channelId,
      },
      include: {
        messages: {
          include: {
            user: {
              omit: {
                passwordHash: true,
                email: true,
              },
            },
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
    return { error }
  }
}
