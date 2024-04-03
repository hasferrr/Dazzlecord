'use client'

import {
  createContext,
  type Dispatch,
  useContext,
  useEffect,
  useReducer,
} from 'react'

import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

type SocketContextType = {
  socket: Socket | null
  isConnected: boolean
}

type SocketContextDispatch =
  | { type: 'SET_SOCKET', payload: SocketContextType['socket'] }
  | { type: 'SET_IS_CONNECTED', payload: SocketContextType['isConnected'] }

type SocketContextReducer = [SocketContextType, Dispatch<SocketContextDispatch>]

const socketContextReducer = (
  state: SocketContextType,
  action: SocketContextDispatch,
): SocketContextType => {
  switch (action.type) {
  case 'SET_SOCKET':
    return { ...state, socket: action.payload }
  case 'SET_IS_CONNECTED':
    return { ...state, isConnected: action.payload }
  default:
    return state
  }
}

const initialValue = {
  socket: null,
  isConnected: false,
}

const SocketContext = createContext<SocketContextReducer>([initialValue, () => initialValue])

export const SocketContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(socketContextReducer, initialValue)

  const setSocket = (val: SocketContextType['socket']) =>
    dispatch({
      type: 'SET_SOCKET',
      payload: val,
    })

  const setIsConnected = (val: SocketContextType['isConnected']) =>
    dispatch({
      type: 'SET_IS_CONNECTED',
      payload: val,
    })

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
    <SocketContext.Provider value={[state, dispatch]}>
      {children}
    </SocketContext.Provider>
  )
}

export const useSocket = () => {
  const [{ socket }] = useContext(SocketContext)
  return socket
}

export const useIsConnected = () => {
  const [{ isConnected }] = useContext(SocketContext)
  return isConnected
}

export default SocketContext
