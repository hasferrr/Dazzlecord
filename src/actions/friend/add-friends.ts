'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { addFriendDB } from '@/actions/prisma/friends'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const addFriend = async (username: string) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const nonFriendUsers = await db.user.findUnique({
      where: {
        username,
        NOT: {
          OR: [
            {
              friendAccept: {
                some: {
                  OR: [
                    { userRequestId: userId },
                    { userAcceptId: userId },
                  ],
                },
              },
            },
            {
              friendRequest: {
                some: {
                  OR: [
                    { userRequestId: userId },
                    { userAcceptId: userId },
                  ],
                },
              },
            },
          ],
        },
      },
    })

    if (!nonFriendUsers) {
      return null
    }
    if (nonFriendUsers.id === userId) {
      return null
    }
    const pending = await addFriendDB(userId, nonFriendUsers.id)
    revalidatePath('/channels/me')
    return pending
  } catch (error) {
    console.log(error)
    return null
  }
}
