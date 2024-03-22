'use server'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const leaveServer = async (serverId: string, _: string) => {
  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const userId = session.user.id

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
