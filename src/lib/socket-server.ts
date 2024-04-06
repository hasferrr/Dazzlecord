import { io } from 'socket.io-client'

import { NEXT_PUBLIC_SOCKET_IO_URL } from '@/utils/config'

const URL = NEXT_PUBLIC_SOCKET_IO_URL

/**
 * This is socket.io-client for next js server (as a middleware for client
 * and socket.io server)
 */
export const socketServer = io(URL, {
  autoConnect: false,
})
