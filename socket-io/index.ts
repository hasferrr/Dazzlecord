/* eslint-disable no-process-env */
import cors from 'cors'
import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'

import messageRouter from './controllers/messageRouter'
import { connectHandler } from './handlers/connect-handler'
import { roomHandler } from './handlers/room-handler'

const origin: string[] = []
for (let i = 1; i <= 3; i += 1) {
  const url = process.env[`CLIENT_URL_${i}`]
  if (url) {
    origin.push(url)
  }
}

console.log(process.env.NODE_ENV)
console.log('Allowed client: ', origin)

const app = express()
const server = createServer(app)

const io = new Server(server, {
  cors: {
    origin,
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
