'use client'

import { useEffect } from 'react'

import { Badge } from '@/components/ui/badge'
import { useIsConnected, useSocket } from '@/context/socket-context'

export const SocketIndicator = () => {
  const socket = useSocket()
  const isConnected = useIsConnected()

  useEffect(() => {
    socket?.connect()
  }, [socket])

  if (!isConnected) {
    return (
      <Badge
        variant="outline"
        className="bg-yellow-600 text-white border-none"
      >
        Reconnecting
      </Badge>
    )
  }

  return (
    <Badge
      variant="outline"
      className="bg-emerald-600 text-white border-none"
      onClick={() => socket?.emit('message', 'HELLO SOCKET')}
    >
      Connected
    </Badge>
  )
}
