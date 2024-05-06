'use server'

import type { DirectMessage } from '@prisma/client'
import axios from 'axios'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { messageSchema } from '@/schemas/message-schema'
import type { MessageRouterPostRequestBody } from '@/types'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const sendDirectMessage = async (
  values: z.infer<typeof messageSchema>,
  fileName: string | null,
  conversationId: string,
): Promise<DirectMessage | null> => {
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
    const message = await db.directMessage.create({
      data: {
        userId,
        content,
        fileName,
        conversationId,
      },
      include: { user: true },
    })

    const body: MessageRouterPostRequestBody = {
      message,
      userId,
      channelId: conversationId,
      action: 'SEND',
      type: 'direct-message',
    }

    const URL = `${NEXT_PUBLIC_SOCKET_IO_URL}/message`
    const res = await axios.post(URL, body)
    if (res.status === 200) {
      return message
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
