'use server'

import { MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { auth } from '@/auth'
import { trimString } from '@/helpers/helpers'
import { db } from '@/lib/db'

export const createNewServer = async (serverName: string) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const currentUser = session.user

  const newServer = await db.server.create({
    data: {
      name: trimString(serverName),
      inviteCode: uuidv4(),
      image: `img-server-${uuidv4()}`,
      members: {
        create: [
          { role: MemberRole.OWNER, userId: currentUser.id },
        ],
      },
      channels: {
        create: [
          { name: 'general', userId: currentUser.id },
        ],
      },
    },
  })

  return newServer
}
