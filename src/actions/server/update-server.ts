'use server'

import { MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'

import { deleteImage } from '@/actions/cloud-storage/delete-image'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { trimString } from '@/lib/helpers'

export const updateServer = async (
  serverId: string,
  newServerName: string | null,
  newServerImage: boolean,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const existingServer = await db.server.findUnique({
    where: {
      id: serverId,
      members: {
        some: {
          userId,
          role: { not: MemberRole.GUEST },
        },
      },
    },
  })
  if (!existingServer) {
    console.log('update server aborted')
    return null
  }

  const data: { name?: string; image?: string } = {}
  if (newServerName) {
    data.name = trimString(newServerName)
  }
  if (newServerImage) {
    data.image = `img-server-${uuidv4()}`
  }

  try {
    const updatedServer = await db.server.update({
      where: {
        id: serverId,
        members: {
          some: {
            userId,
            role: { not: MemberRole.GUEST },
          },
        },
      },
      data,
    })

    if (newServerImage && existingServer.image) {
      await deleteImage(existingServer.image)
    }
    return updatedServer

  } catch (error) {
    console.log('error update a server')
    console.log(error)
    return null
  }
}
