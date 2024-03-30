'use client'

import {
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'

import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null
  isConnected: boolean
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
})

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [isConnected, setIsConnected] = useState(false)

  useEffect(() => {
    // eslint-disable-next-line no-process-env
    const URL = process.env['NEXT_PUBLIC_SITE_URL'] as string

    const socketInstance = io(URL, {
      path: '/api/socket/io',
      addTrailingSlash: false,
      autoConnect: false,
    })

    socketInstance.on('connect', () => {
      setIsConnected(true)
    })

    socketInstance.on('disconnect', () => {
      setIsConnected(false)
    })

    setSocket(socketInstance)
  }, [])

  return (
    <SocketContext.Provider value={{ socket, isConnected }}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const { socket } = useContext(SocketContext)
  return socket
}

export const useIsConnected = () => {
  const { isConnected } = useContext(SocketContext)
  return isConnected
}

export default SocketContext
