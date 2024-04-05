/* eslint-disable no-process-env */
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import { connectHandler } from './handler/connect-handler'
import { messageHandler } from './handler/message-handler'
import { tokenHandler } from './handler/token-handler'

const app = express()
const server = createServer(app)

app.use(cors({
  origin: process.env['CLIENT_URL'],
}))

const io = new Server(server, {
  path: '/',
  cors: {
    origin: process.env['CLIENT_URL'],
  },
  connectionStateRecovery: {},
})

io.on('connection', (socket) => {
  connectHandler(io, socket)
  messageHandler(io, socket)
  tokenHandler(io, socket)
})

const PORT = process.env['PORT'] || 3001
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
