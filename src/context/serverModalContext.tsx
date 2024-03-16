'use client'

import { createContext, Dispatch, useContext, useReducer } from 'react'

import PropTypes from 'prop-types'

type ServerModal = boolean
type ServerModalDispatch = { type: 'SET', payload: ServerModal }
type ServerModalReducer = [ServerModal, Dispatch<ServerModalDispatch>]

const modalReducer = (state: ServerModal, action: ServerModalDispatch): ServerModal => {
  switch (action.type) {
  case 'SET':
    return action.payload
  default:
    return state
  }
}

const ServerModalContext = createContext<ServerModalReducer>([false, () => false])

export const ServerModalContextProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modal, modalDispatch] = useReducer(modalReducer, false)
  return (
    <ServerModalContext.Provider value={[modal, modalDispatch]}>
      {children}
    </ServerModalContext.Provider>
  )
}

ServerModalContextProvider.propTypes = {
  children: PropTypes.node,
}

export const useServerModal = () => {
  const [value] = useContext(ServerModalContext)
  return value
}

export const useOnOpen = () => {
  const [, dispatch] = useContext(ServerModalContext)
  return () => {
    dispatch({
      type: 'SET',
      payload: true,
    })
  }
}

export const useOnClose = () => {
  const [, dispatch] = useContext(ServerModalContext)
  return () => {
    dispatch({
      type: 'SET',
      payload: false,
    })
  }
}

export default ServerModalContext
