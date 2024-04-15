'use server'

import { type Channel, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const deleteChannel = async (
  channel: Channel,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    await db.server.update({
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
          delete: {
            id: channel.id,
          },
        },
      },
    })
  } catch (error) {
    return { error: 'channel deletion is failed' }
  }

  return { success: 'successfully delete the channel' }
}
