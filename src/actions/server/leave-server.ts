'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const leaveServer = async (serverId: string) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
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
