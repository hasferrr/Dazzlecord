'use server'

import { db } from '@/lib/db'

export const leaveServer = async (serverId: string, userId: string) => {
  const server = await db.member.deleteMany({
    where: {
      serverId,
      userId,
    },
  })

  if (!server) {
    return { error: 'failed to leave the server' }
  }

  return { success: 'successfully left the server' }
}
