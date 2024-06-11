'use server'

import { FriendStatus } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { addFriendDB } from '@/actions/prisma/friends'
import { auth } from '@/auth'
import { db } from '@/lib/db'

export const addFriendById = async (friendsUserId: string) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const user = await db.user.findUnique({
      where: {
        id: friendsUserId,
      },
      include: {
        friendAccept: {
          where: {
            OR: [
              { userRequestId: userId },
              { userAcceptId: userId },
            ],
          },
          select: {
            status: true,
          },
        },
        friendRequest: {
          where: {
            OR: [
              { userRequestId: userId },
              { userAcceptId: userId },
            ],
          },
          select: {
            status: true,
          },
        },
      },
    })

    if (!user) {
      return { error: 'user not found' }
    }
    if (user.id === userId) {
      return { error: 'you can\'t friend yourself ' }
    }

    let pendingRequest = false
    let alreadyFriend = false

    user.friendAccept.forEach((friend) => {
      if (friend.status === FriendStatus.PENDING) {
        pendingRequest = true
      }
      if (friend.status === FriendStatus.ACCEPTED) {
        alreadyFriend = true
      }
    })

    user.friendRequest.forEach((friend) => {
      if (friend.status === FriendStatus.PENDING) {
        pendingRequest = true
      }
      if (friend.status === FriendStatus.ACCEPTED) {
        alreadyFriend = true
      }
    })

    if (pendingRequest) {
      return { error: 'request already sent' }
    }
    if (alreadyFriend) {
      return { error: 'already a friend' }
    }

    const pending = await addFriendDB(userId, user.id)
    revalidatePath('/channels/me')
    return { success: { friend: pending } }
  } catch (error) {
    console.log(error)
    return { error: '505' }
  }
}
