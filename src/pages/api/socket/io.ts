import type { Server as HttpServer } from 'http'
import type { Socket } from 'net'
import type { NextApiRequest, NextApiResponse } from 'next'
import { Server } from 'socket.io'

import { logger } from '@/actions/logger'

// TODO: Move socket io to separate backend!!!
const ioHandler = (
  _req: NextApiRequest,
  res: NextApiResponse & {
    socket: Socket & {
      server: HttpServer & {
        io: Server
      }
    }
  },
) => {
  if (res.socket.server.io) {
    res.end()
    return
  }

  const httpServer: HttpServer = res.socket.server
  const io = new Server(httpServer, {
    path: '/api/socket/io',
    addTrailingSlash: false,
    connectionStateRecovery: {},
  })

  io.on('connection', (socket) => {
    logger('=====> a user connected')
    socket.emit('connected', true)

    socket.on('disconnect', () => {
      logger('=====> a user disconnected')
      socket.emit('disconnected', true)
    })

    socket.on('message', (message: string) => {
      logger(`message: ${message}`)
    })
  })

  res.socket.server.io = io
  res.end()
}


export default ioHandler
