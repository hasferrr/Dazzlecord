'use server'

import { MemberRole, type Server } from '@prisma/client'

import { deleteImage } from '@/actions/cloud-storage/delete-image'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const deleteServer = async (
  server: Server,
) => {
  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const userId = session.user.id

  try {
    await db.server.delete({
      where: {
        id: server.id,
        members: {
          every: {
            userId: userId,
            role: MemberRole.OWNER,
          },
        },
      },
    })
  } catch (error) {
    return { error: 'server deletion is failed' }
  }

  if (!server.image) {
    return { error: 'image deletion is failed' }
  }

  await deleteImage(server.image)

  return { success: 'server and image are successfully deleted!!!' }
}
