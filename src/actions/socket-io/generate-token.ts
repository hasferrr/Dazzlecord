'use server'

import axios from 'axios'
import jwt from 'jsonwebtoken'

import { socketServer } from '@/lib/socket-server'
import { AUTH_SECRET, NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

export const generateToken = async (
  channelId: string,
  userId: string,
) => {
  if (!socketServer.connected) {
    socketServer.connect()
  }
  const dataForToken = { channelId, userId }
  const token = jwt.sign(
    dataForToken,
    AUTH_SECRET,
    { expiresIn: '0.5 * 60000' }, // 30 seconds
  )

  return {
    success: 'token generated',
    token,
  }
}
