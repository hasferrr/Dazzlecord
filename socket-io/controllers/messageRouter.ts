import { Router } from 'express'

import { io } from '..'
const messageRouter = Router()

// TODO: implements authentication
messageRouter.post('/', (req, res) => {
  const { message, channelId } = req.body
  if (!message || !channelId) {
    res.status(400).json({ error: 'missing request body' })
    return
  }
  console.log('[NEXT] channel message', message)
  io.to(channelId).emit('message:channel', message)
  res.end()
})

export default messageRouter
