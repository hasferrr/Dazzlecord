'use server'

import { type User } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

export const editProfile = async (
  name: string,
  about: string,
): Promise<User | null> => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const data: { name?: string, about?: string } = {}
  if (name) {
    data.name = name
  }
  if (about) {
    data.about = about
  }

  // TODO: update the session data
  try {
    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data,
    })
    return updatedUser
  } catch (error) {
    console.log('update user failed')
    console.log(error)
    return null
  }
}
