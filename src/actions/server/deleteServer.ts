'use server'

import { Server } from '@prisma/client'

import { deleteImage } from '@/actions/cloudStorage/deleteImage'
import { db } from '@/lib/db'

export const deleteServer = async (
  server: Server,
  currentUserId: string,
) => {
  if (server.owner !== currentUserId) {
    return { error: 'only server owner can delete the server' }
  }

  const deletedServer = await db.server.delete({
    where: {
      id: server.id,
      owner: currentUserId,
    },
  })

  if (!deletedServer) {
    return { error: 'server deletion is failed' }
  }

  if (!server.image) {
    return { error: 'image deletion is failed' }
  }

  await deleteImage(server.image)

  return { success: 'server and image are successfully deleted!!!' }
}
