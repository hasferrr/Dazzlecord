import { db } from '@/app/lib/db'

export const getUserById = async (id: string) =>
  await db.user.findUnique({
    where: {
      id,
    },
  })

export const getUserByUsername = async (username: string) =>
  await db.user.findUnique({
    where: {
      username,
    },
  })

export const getUserByEmail = async (email: string) =>
  await db.user.findUnique({
    where: {
      email,
    },
  })
