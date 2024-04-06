'use server'

import jwt from 'jsonwebtoken'

import { AUTH_SECRET } from '@/utils/config'

export const generateToken = async (
  channelId: string,
  userId: string,
) => {
  const dataForToken = { channelId, userId }
  const token = jwt.sign(
    dataForToken,
    AUTH_SECRET,
    { expiresIn: 60 / 2 }, // 30s
  )

  return {
    success: 'token generated',
    token,
  }
}
