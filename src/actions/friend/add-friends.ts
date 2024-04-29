'use server'

import { redirect } from 'next/navigation'

import { addFriendDB } from '@/actions/prisma/friends'
import { getUserByUsername } from '@/actions/prisma/user'
import { auth } from '@/auth'

export const addFriend = async (username: string) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const friend = await getUserByUsername(username)
    if (!friend) {
      return null
    }
    const pending = await addFriendDB(userId, friend.id)
    return pending
  } catch (error) {
    console.log(error)
    return null
  }
}
