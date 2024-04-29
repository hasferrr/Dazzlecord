'use server'

import { redirect } from 'next/navigation'

import { getFriendsDB } from '@/actions/prisma/friends'
import { auth } from '@/auth'

export const getFriends = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const friends = await getFriendsDB(userId)
    return friends
  } catch (error) {
    console.log(error)
    return null
  }
}
