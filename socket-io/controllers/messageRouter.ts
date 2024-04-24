import { Router } from 'express'
import { Server } from 'socket.io'

const messageRouter = (io: Server) => {
  const router = Router()

  // TODO: implements authentication
  router.post('/', (req, res) => {
    const { message, channelId } = req.body
    if (!message || !channelId) {
      res.status(400).json({ error: 'missing request body' })
      return
    }
    console.log('[NEXT] channel message', message)
    io.to(channelId).emit('message:channel', message)
    res.end()
  })

  return router
}

export default messageRouter
