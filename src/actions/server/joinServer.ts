'use server'

import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const joinServer = async (inviteCode: string) => {
  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const userId = session.user.id

  const existingServer = await db.server.findFirst({
    where: {
      inviteCode: inviteCode,
      members: {
        some: {
          userId,
        },
      },
    },
  })

  if (existingServer) {
    return redirect(`/servers/${existingServer.id}`)
  }

  const server = await db.server.update({
    where: {
      inviteCode,
    },
    data: {
      members: {
        create: [
          {
            userId,
          },
        ],
      },
    },
  })

  if (server) {
    return redirect(`/servers/${server.id}`)
  }

  return redirect('/')
}
