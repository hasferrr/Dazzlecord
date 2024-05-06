'use server'

import { db } from '@/lib/db'

// Function to add a new friend
export const addFriendDB = async (userRequestId: string, userAcceptId: string) => {
  const newFriendship = await db.friend.create({
    data: {
      userRequestId,
      userAcceptId,
      status: 'PENDING',
    },
  })
  return newFriendship
}

// Function to get a user's friends
export const getFriendsDB = async (userId: string) => {
  const acceptedFriends = db.friend.findMany({
    where: {
      status: 'ACCEPTED',
      OR: [
        { userRequestId: userId },
        { userAcceptId: userId },
      ],
    },
    include: {
      userRequest: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
      userAccept: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
    },
  })

  const pendingFriends = db.friend.findMany({
    where: {
      status: 'PENDING',
      OR: [
        { userRequestId: userId },
        { userAcceptId: userId },
      ],
    },
    include: {
      userRequest: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
      userAccept: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
    },
  })

  return {
    acceptedFriends: await acceptedFriends,
    pendingFriends: await pendingFriends,
  }
}

export const getFriendByUsersId = async (userId: string, friendsUserId: string) => {
  const friend = await db.friend.findFirstOrThrow({
    where: {
      OR: [
        {
          userRequestId: userId,
          userAcceptId: friendsUserId,
        },
        {
          userRequestId: friendsUserId,
          userAcceptId: userId,
        },
      ],
    },
    include: {
      userRequest: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
      userAccept: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
    },
  })
  const friendsUser = friend.userAccept.id === friendsUserId
    ? friend.userAccept
    : friend.userRequest
  return { friend, friendsUser }
}

// Function to accept a friend request
export const acceptFriendRequestDB = async (userRequestId: string, userAcceptId: string) => {
  const acceptedFriendship = await db.friend.updateMany({
    where: {
      userRequestId,
      userAcceptId,
      status: 'PENDING',
    },
    data: {
      status: 'ACCEPTED',
    },
  })
  return acceptedFriendship
}

// Function to decline a friend request
export const declineFriendRequestDB = async (userRequestId: string, userAcceptId: string) => {
  const declinedFriendship = await db.friend.deleteMany({
    where: {
      userRequestId,
      userAcceptId,
      status: 'PENDING',
    },
  })
  return declinedFriendship
}

// Function to remove a friend
export const removeFriendDB = async (userRequestId: string, userAcceptId: string) => {
  const deletedFriendship = await db.friend.deleteMany({
    where: {
      OR: [
        {
          userRequestId,
          userAcceptId,
        },
        {
          userRequestId: userAcceptId,
          userAcceptId: userRequestId,
        },
      ],
    },
  })
  return deletedFriendship
}
