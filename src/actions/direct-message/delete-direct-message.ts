'use server'

import { type DirectMessage } from '@prisma/client'
import axios from 'axios'
import { redirect } from 'next/navigation'

import { deleteImage } from '@/actions/cloud-storage/delete-image'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import type { MessageRouterPostRequestBody } from '@/types'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const deleteDirectMessage = async (messageId: string): Promise<DirectMessage | null> => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const currentMessage = await db.directMessage.findUnique({
      where: {
        id: messageId,
      },
    })
    if (!currentMessage) {
      return null
    }

    // Perform message deletion
    const deletedMessage = await db.directMessage.delete({
      where: {
        id: messageId,
        userId,
      },
      include: { user: true },
    })

    // Delete file from GCS
    if (currentMessage.fileName) {
      deleteImage(currentMessage.fileName)
    }

    const body: MessageRouterPostRequestBody = {
      userId,
      channelId: deletedMessage.conversationId,
      message: deletedMessage,
      action: 'DELETE',
      type: 'direct-message',
    }

    const URL = `${NEXT_PUBLIC_SOCKET_IO_URL}/message`
    const res = await axios.post(URL, body)
    if (res.status === 200) {
      return deletedMessage
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
