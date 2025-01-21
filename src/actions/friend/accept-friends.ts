'use server'

import { FriendStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const acceptFriends = async (formData: FormData): Promise<void> => {
  const userRequestId = formData.get('userRequestId')
  if (!userRequestId || typeof userRequestId !== 'string') {
    return
  }

  const session = await auth()
  if (!session) {
    redirect('/')
  }
  const userId = session.user.id

  try {
    const user = await db.user.findFirst({
      where: {
        id: userId,
        friendAccept: {
          some: {
            userRequestId,
            status: FriendStatus.PENDING,
          },
        },
      },
      include: {
        friendAccept: true,
      },
    })
    if (!user) {
      return
    }

    await db.friend.update({
      where: {
        id: user.friendAccept[0].id,
      },
      data: {
        status: FriendStatus.ACCEPTED,
      },
    })
  } catch (error) {
    console.log(error)
  }

  revalidatePath('/channels/me')
}
