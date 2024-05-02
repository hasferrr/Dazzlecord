'use server'

import { MemberRole, type Message } from '@prisma/client'
import axios from 'axios'
import { redirect } from 'next/navigation'

import { deleteImage } from '@/actions/cloud-storage/delete-image'
import { findMember } from '@/actions/prisma/member'
import { auth } from '@/auth'
import { db } from '@/lib/db'
import type { MessageRouterPostRequestBody } from '@/types'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

// const valueMap = {
//   [MemberRole.OWNER]: 3,
//   [MemberRole.ADMIN]: 2,
//   [MemberRole.MODERATOR]: 1,
//   [MemberRole.GUEST]: 0,
// }

export const deleteMessage = async (messageId: string): Promise<Message | null> => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const currentMessage = await db.message.findUnique({
      where: {
        id: messageId,
      },
      include: {
        member: true,
      },
    })
    if (!currentMessage) {
      return null
    }

    const currentMember = await findMember(currentMessage.serverId, userId)
    if (!currentMember) {
      return null
    }

    // User want to delete other's message
    if (currentMember.id !== currentMessage.memberId) {
      // If it is a Guest
      if (currentMember.role === MemberRole.GUEST) {
        return null
      }
      // TODO
      // Dissalow deletion if current member's role < to message owner's role
      // if (valueMap[currentMember.role] < valueMap[currentMessage.member.role]) {
      //   return null
      // }
    }

    // Perform message deletion
    const deletedMessage = await db.message.delete({
      where: {
        id: messageId,
      },
      include: { user: true },
    })

    // Delete file from GCS
    if (currentMessage.fileName) {
      deleteImage(currentMessage.fileName)
    }

    const body: MessageRouterPostRequestBody = {
      userId,
      channelId: deletedMessage.channelId,
      message: deletedMessage,
      action: 'DELETE',
      type: 'channel',
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
