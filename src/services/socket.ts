'use client'

import { io } from 'socket.io-client'

// eslint-disable-next-line no-process-env
const URL = process.env['NEXT_PUBLIC_SOCKET_IO_URL'] as string

export const socket = io(URL, {
  addTrailingSlash: false,
  autoConnect: false,
})
