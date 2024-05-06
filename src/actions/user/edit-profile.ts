'use server'

import { redirect } from 'next/navigation'
import { v4 as uuidv4 } from 'uuid'
import type { z } from 'zod'

import { auth } from '@/auth'
import { trimString } from '@/helpers/helpers'
import { db } from '@/lib/db'
import { editProfileNoFileSchema } from '@/schemas/edit-profile-schema'
import type { UserNoEmailNoPwd } from '@/types'

import { deleteImage } from '../cloud-storage/delete-image'
import { getUserById } from '../prisma/user'

export const editProfile = async (
  values: z.infer<typeof editProfileNoFileSchema>,
  isNewImage: boolean,
): Promise<UserNoEmailNoPwd | null> => {
  const validatedFields = editProfileNoFileSchema.safeParse(values)
  if (!validatedFields.success) {
    return null
  }

  const { name, about } = validatedFields.data

  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  // TODO: update the session data

  try {
    const currentUser = await getUserById(userId)
    if (!currentUser) {
      return null
    }

    const updatedUser = await db.user.update({
      where: {
        id: userId,
      },
      data: {
        name: trimString(name),
        about: about || null,
        image: isNewImage ? `img-user-${uuidv4()}` : undefined,
      },
      omit: {
        passwordHash: true,
        email: true,
      },
    })

    if (isNewImage && currentUser.image) {
      await deleteImage(currentUser.image)
    }
    return updatedUser
  } catch (error) {
    console.log('update user failed')
    console.log(error)
    return null
  }
}
