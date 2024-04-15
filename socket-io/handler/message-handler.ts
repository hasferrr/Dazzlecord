import type { Server, Socket } from 'socket.io'

import type { Message } from '../../node_modules/@prisma/client'

export const messageHandler = (io: Server, socket: Socket) => {
  socket.on('message', (
    message: Message,
    type: 'channel',
    channelId: string,
  ) => {
    console.log('receive a message', message)
    if (type === 'channel') {
      io.to(channelId).emit('message:channel', message)
    }
  })
}
