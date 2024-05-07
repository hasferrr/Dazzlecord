'use server'

import type { Message } from '@prisma/client'
import axios from 'axios'
import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import type { z } from 'zod'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { messageSchema } from '@/schemas/message-schema'
import type { MessageRouterPostRequestBody } from '@/types'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const sendMessage = async (
  values: z.infer<typeof messageSchema>,
  _fileName0: string | null,
  channelId: string,
  serverId: string,
  memberId: string,
): Promise<Message | null> => {
  const validatedFields = messageSchema.safeParse(values)
  if (!validatedFields.success) {
    return null
  }

  const {
    content, fileType, fileName, fileSize,
  } = validatedFields.data

  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const currentServer = await db.server.findFirst({
      where: {
        id: serverId as string,
        members: {
          some: {
            userId,
            serverId,
          },
        },
        channels: {
          some: {
            id: channelId,
          },
        },
      },
    })
    if (!currentServer) {
      return null
    }

    const message = await db.message.create({
      data: {
        userId,
        content,
        fileName: fileName ? `file-msg-${uuidv4()}_${fileName}` : null,
        fileType,
        fileSize,
        channelId,
        serverId,
        memberId,
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
      message,
      userId,
      channelId,
      action: 'SEND',
      type: 'channel',
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
