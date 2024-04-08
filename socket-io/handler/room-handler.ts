/* eslint-disable no-process-env */
import jwt from 'jsonwebtoken'
import type { Server, Socket } from 'socket.io'

const leaveAllRooms = (socket: Socket) => {
  socket.rooms.forEach((room) => {
    if (room !== socket.id) {
      socket.leave(room)
    }
  })
}

export const roomHandler = async (_io: Server, socket: Socket) => {
  socket.on('joinChannelRoom', (
    { channelId, userId }: { channelId: string, userId: string },
    token: string,
  ) => {
    if (!token) {
      console.log('no token', { channelId, userId })
      return
    }

    let decodedToken
    try {
      decodedToken = jwt.verify(
        token,
        process.env['AUTH_SECRET'] as string,
      ) as { [key: string]: string }

      if (decodedToken['channelId'] !== channelId || decodedToken['userId'] !== userId) {
        console.log('invalid token', { channelId, userId })
        return
      }
    } catch (error) {
      console.log('invalid token', { channelId, userId })
      console.log(error)
      return
    }

    leaveAllRooms(socket)
    socket.join(decodedToken['channelId'])
  })
}
