'use server'

import { db } from '@/lib/db'

import { deleteImage } from '../cloudStorage/deleteImage'

export const deleteServer = async (serverId: string, serverImage: string | null) => {
  const deletedServer = await db.server.delete({
    where: {
      id: serverId,
    },
  })

  if (!deletedServer) {
    return { error: 'server deletion is failed' }
  }

  if (!serverImage) {
    return { error: 'image deletion is failed' }
  }

  await deleteImage(serverImage)

  return { success: 'server and image are successfully deleted!!!' }
}
