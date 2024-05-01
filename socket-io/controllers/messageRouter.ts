import { Router } from 'express'
import { Server } from 'socket.io'

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
    if (type === 'channel') {
      io.to(channelId).emit(`${action}:message:${type}`, message)
    }
    if (type === 'direct-message') {
      io.to(`${userId}${channelId}`).emit(`${action}:message:${type}`, message)
    }

    res.end()
  })

  return router
}

export default messageRouter
