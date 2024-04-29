'use server'

import { db } from '@/lib/db'

// Function to add a new friend
export const addFriendDB = async (userIdA: string, userIdB: string) => {
  const newFriendship = await db.friendship.create({
    data: {
      userA: userIdA,
      userB: userIdB,
      status: 'PENDING',
    },
  })
  return newFriendship
}

// Function to get a user's friends
export const getFriendsDB = async (userId: string) => {
  const acceptedFriends = db.friendship.findMany({
    where: {
      status: 'ACCEPTED',
      OR: [
        { userA: userId },
        { userB: userId },
      ],
    },
    include: {
      userAProfile: true,
      userBProfile: true,
    },
  })

  const pendingFriends = db.friendship.findMany({
    where: {
      status: 'PENDING',
      OR: [
        { userA: userId },
        { userB: userId },
      ],
    },
    include: {
      userAProfile: true,
      userBProfile: true,
    },
  })

  return {
    acceptedFriends: await acceptedFriends,
    pendingFriends: await pendingFriends,
  }
}

// Function to accept a friend request
export const acceptFriendRequestDB = async (userIdA: string, userIdB: string) => {
  const acceptedFriendship = await db.friendship.updateMany({
    where: {
      userA: userIdA,
      userB: userIdB,
      status: 'PENDING',
    },
    data: {
      status: 'ACCEPTED',
    },
  })
  return acceptedFriendship
}

// Function to decline a friend request
export const declineFriendRequestDB = async (userIdA: string, userIdB: string) => {
  const declinedFriendship = await db.friendship.deleteMany({
    where: {
      userA: userIdA,
      userB: userIdB,
      status: 'PENDING',
    },
  })
  return declinedFriendship
}

// Function to remove a friend
export const removeFriendDB = async (userIdA: string, userIdB: string) => {
  const deletedFriendship = await db.friendship.deleteMany({
    where: {
      OR: [
        { userA: userIdA, userB: userIdB },
        { userA: userIdB, userB: userIdA },
      ],
    },
  })
  return deletedFriendship
}
