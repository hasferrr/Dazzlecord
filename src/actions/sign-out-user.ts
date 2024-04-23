'use server'

import { signOut } from '@/auth'

export const signOutUser = async () => {
  try {
    await signOut({
      redirectTo: '/',
    })
  } catch (error) {
    console.log(error)
    throw error
  }
}
