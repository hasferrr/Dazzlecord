'use server'

import { MemberRole } from '@prisma/client'
import { v4 as uuidv4 } from 'uuid'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { trimString } from '@/lib/helpers'

export const createNewServer = async (serverName: string, imageName: string) => {
  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const currentUser = session.user

  const uuid = uuidv4()

  const newServer = await db.server.create({
    data: {
      name: trimString(serverName),
      inviteCode: uuid,
      image: uuid,
      userId: currentUser.id,
      members: {
        create: [
          { role: MemberRole.ADMIN, userId: currentUser.id },
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
