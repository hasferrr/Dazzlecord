import type { Server, Socket } from 'socket.io'

import type { Message } from '../../node_modules/@prisma/client'

export const messageHandler = (io: Server, socket: Socket) => {
  socket.on('message', (
    type: 'channel',
    channelId: string,
    message: Message,
  ) => {
    console.log('message from next server', message)
    if (type === 'channel') {
      io.to(channelId).emit('message:channel', message)
    }
  })
}
