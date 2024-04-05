import type { Server, Socket } from 'socket.io'

const tokens: Set<string> = new Set()

export const tokenHandler = async (_io: Server, socket: Socket) => {
  socket.on('addToken', (token: string) => {
    tokens.add(token)
  })
}
