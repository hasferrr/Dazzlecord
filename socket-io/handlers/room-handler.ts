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
  const handleRoomJoin = (
    roomType: 'channel' | 'direct-message',
    { channelId, userId }: { channelId: string; userId: string },
    token: string,
  ) => {
    if (!token) {
      console.log('no token', { channelId, userId })
      return
    }

    let decodedToken
    try {
      decodedToken = jwt.verify(token, process.env['AUTH_SECRET'] as string) as {
        channelId: string;
        userId: string;
      }

      if (
        decodedToken.channelId !== channelId
        || decodedToken.userId !== userId
      ) {
        console.log('invalid token', { channelId, userId })
        return
      }
    } catch (error) {
      console.log('invalid token', { channelId, userId })
      console.log(error)
      return
    }

    leaveAllRooms(socket)
    if (roomType === 'channel') {
      socket.join(decodedToken.channelId)
    } else if (roomType === 'direct-message') {
      socket.join(`${decodedToken.userId}:${decodedToken.channelId}`)
    }
  }

  socket.on('join:channel:room', ({ channelId, userId }: { channelId: string; userId: string }, token: string) => {
    handleRoomJoin('channel', { channelId, userId }, token)
  })

  socket.on('join:direct-message:room', ({ channelId, userId }: { channelId: string; userId: string }, token: string) => {
    handleRoomJoin('direct-message', { channelId, userId }, token)
  })
}
