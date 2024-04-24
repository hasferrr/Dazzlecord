'use server'

import axios from 'axios'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'
import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const sendMessage = async (
  content: string,
  fileName: string | null,
  channelId: string,
  serverId: string,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const message = await db.message.create({
      data: {
        content,
        fileName,
        userId,
        channelId,
        serverId,
      },
      include: { user: true },
    })

    const URL = `${NEXT_PUBLIC_SOCKET_IO_URL}/message`
    const res = await axios.post(URL, { message, channelId })
    if (res.status === 200) {
      return {
        success: 'Message saved',
        data: { message },
      }
    }

    return {
      error: res.data.error,
    }
  } catch (error) {
    console.error(error)
    return { error }
  }
}
