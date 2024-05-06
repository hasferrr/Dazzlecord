'use server'

import axios from 'axios'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { messageSchema } from '@/schemas/message-schema'
import type { DirectMessageWithUser, MessageRouterPostRequestBody } from '@/types'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const editDirectMessage = async (
  values: z.infer<typeof messageSchema>,
  // fileName: string | null,
  messageId: string,
): Promise<DirectMessageWithUser | null> => {
  const validatedFields = messageSchema.safeParse(values)
  if (!validatedFields.success) {
    return null
  }

  const { content } = validatedFields.data

  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const updatedMessage = await db.directMessage.update({
      where: {
        id: messageId,
        userId,
      },
      data: {
        content,
        isUpdated: true,
      },
      include: {
        user: {
          omit: {
            passwordHash: true,
            email: true,
          },
        },
      },
    })

    const body: MessageRouterPostRequestBody = {
      userId,
      channelId: updatedMessage.conversationId,
      message: updatedMessage,
      action: 'EDIT',
      type: 'direct-message',
    }

    const URL = `${NEXT_PUBLIC_SOCKET_IO_URL}/message`
    const res = await axios.post(URL, body)
    if (res.status === 200) {
      return updatedMessage
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
