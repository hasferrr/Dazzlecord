'use server'

import { MemberRole, Server } from '@prisma/client'

import { deleteImage } from '@/actions/cloudStorage/deleteImage'
import { db } from '@/lib/db'

export const deleteServer = async (
  server: Server,
  currentUserId: string,
) => {
  try {
    await db.server.delete({
      where: {
        id: server.id,
        members: {
          every: {
            userId: currentUserId,
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
