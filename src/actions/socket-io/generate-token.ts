'use server'

import jwt from 'jsonwebtoken'

import { socketServer } from '@/lib/socket-server'
import { AUTH_SECRET } from '@/utils/config'

export const generateToken = async (
  channelId: string,
  userId: string,
) => {
  if (!socketServer.connected) {
    socketServer.connect()
  }
  const dataForToken = { channelId, userId }
  const token = jwt.sign(dataForToken, AUTH_SECRET)
  socketServer.emit('addToken', token)
  return {
    success: 'token generated',
    data: { token },
  }
}
