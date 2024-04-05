import type { Server, Socket } from 'socket.io'

export const messageHandler = async (_io: Server, socket: Socket) => {
  socket.on('message', (message: string) => {
    console.log(`message: ${message}`)
  })
}
