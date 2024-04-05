import type { Server, Socket } from 'socket.io'

export const connectHandler = async (_io: Server, socket: Socket) => {
  console.log('a user connected')
  socket.emit('connected', true)

  socket.on('disconnect', () => {
    console.log('a user disconnected')
    socket.emit('disconnected', true)
  })
}
