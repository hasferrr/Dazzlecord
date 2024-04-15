import type { Server, Socket } from 'socket.io'

import type { Message } from '../../node_modules/@prisma/client'

export const messageHandler = (io: Server, socket: Socket) => {
  socket.on('message', (message: string) => {
    console.log('message', message)
  })

  // TODO: socket authentication
  socket.on('message:channel', (
    message: Message,
    channelId: string,
  ) => {
    console.log('[NEXT] channel message', message)
    io.to(channelId).emit('message:channel', message)
  })
}
