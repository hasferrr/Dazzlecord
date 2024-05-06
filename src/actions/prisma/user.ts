'use server'

import { db } from '@/lib/db'

export const getUserById = async (id: string) => db.user.findUnique({
  where: {
    id,
  },
  omit: {
    passwordHash: true,
    email: true,
  },
})

export const getUserByUsername = async (username: string) => db.user.findUnique({
  where: {
    username,
  },
  omit: {
    passwordHash: true,
    email: true,
  },
})

export const getUserByEmail = async (email: string) => db.user.findUnique({
  where: {
    email,
  },
  omit: {
    passwordHash: true,
    email: true,
  },
})
