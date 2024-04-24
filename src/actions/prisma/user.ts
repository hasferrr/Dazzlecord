'use server'

import { db } from '@/lib/db'

export const getUserById = async (id: string) => db.user.findUnique({
  where: {
    id,
  },
})

export const getUserByUsername = async (username: string) => db.user.findUnique({
  where: {
    username,
  },
})

export const getUserByEmail = async (email: string) => db.user.findUnique({
  where: {
    email,
  },
})
