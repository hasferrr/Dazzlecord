/* eslint-disable no-process-env */
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import messageRouter from './controllers/messageRouter'
import { connectHandler } from './handlers/connect-handler'
import { roomHandler } from './handlers/room-handler'

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin: process.env['CLIENT_URL'],
  },
  connectionStateRecovery: {},
})

app.use(express.json())
app.use(cors({
  origin: process.env['CLIENT_URL'],
}))

app.get('/', (_req, res) => res.json({ status: 'ok' }))
app.use('/message', messageRouter(io))

io.on('connection', (socket) => {
  connectHandler(io, socket)
  roomHandler(io, socket)
})

const PORT = process.env['PORT'] || 3001
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`)
})
