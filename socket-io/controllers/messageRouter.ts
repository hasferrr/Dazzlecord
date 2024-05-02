import { Router } from 'express'
import { Server } from 'socket.io'

import { makeRoomId } from '../helpers/make-room-id'

const messageRouter = (io: Server) => {
  const router = Router()

  // TODO: implements authentication
  router.post('/', (req, res) => {
    const {
      message,
      userId,
      channelId,
      action,
      type,
    } = req.body

    if (!message || !channelId) {
      res.status(400).json({ error: 'missing request body' })
      return
    }

    console.log('message', message)

    /**
     * Broadcast message to specific rooom io.to(ROOM)
     * See room-handler.ts
     * Broadcast to the ${action}:message:${type}, ex "SEND:message:direct-message"
     */
    io.to(makeRoomId(userId, channelId, type)).emit(`${action}:message:${type}`, message)

    res.end()
  })

  return router
}

export default messageRouter
