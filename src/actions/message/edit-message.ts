'use server'

import type { Message } from '@prisma/client'
import axios from 'axios'
import { redirect } from 'next/navigation'
import type { z } from 'zod'

import { findMember } from '@/actions/prisma/member'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import { messageSchema } from '@/schemas/message-schema'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const editMessage = async (
  values: z.infer<typeof messageSchema>,
  // fileName: string | null,
  channelId: string,
  serverId: string,
  memberId: string,
  messageId: string,
): Promise<Message | null> => {
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
    const currentMember = await findMember(serverId, userId)
    if (!currentMember || currentMember.id !== memberId) {
      return null
    }

    const updatedMessage = await db.message.update({
      where: {
        id: messageId,
        userId,
        channelId,
        serverId,
        memberId,
      },
      data: {
        content,
        isUpdated: true,
      },
      include: { user: true },
    })

    const URL = `${NEXT_PUBLIC_SOCKET_IO_URL}/message`
    const res = await axios.post(URL, { message: updatedMessage, channelId, type: 'EDIT' })
    if (res.status === 200) {
      return updatedMessage
    }
    return null
  } catch (error) {
    console.error(error)
    return null
  }
}
