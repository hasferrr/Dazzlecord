'use server'

import { db } from '@/app/lib/db'
import { registerSchema } from '@/schemas'
import { z } from 'zod'
import bcrypt from 'bcrypt'

export const register = async (values: z.infer<typeof registerSchema>) => {
  const validatedFields = registerSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'invalid fields' }
  }

  const { name, email, username, password } = validatedFields.data

  const userByUsername = await db.user.findUnique({
    where: {
      username,
    },
  })

  const userByEmail = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (userByEmail || userByUsername) {
    return { error: 'user is already exist' }
  }

  const passwordHash = await bcrypt.hash(password, 10)

  const user = await db.user.create({
    data: {
      username,
      email,
      passwordHash,
      name: name.replace(/\s+/g, ' ').trim()
    },
  })

  return { success: 'registered', user }
}
