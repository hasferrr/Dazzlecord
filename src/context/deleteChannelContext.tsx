'use client'

import { createContext, type Dispatch, useContext, useReducer } from 'react'

import PropTypes from 'prop-types'

type ChannelInServer = {
  [key: string]: boolean
}
type ChannelInServerDispatch = {
  type: 'APPEND',
  payload: {
    channelId: keyof ChannelInServer,
    value: ChannelInServer['key'],
  },
}
type ChannelInServerReducer = [ChannelInServer, Dispatch<ChannelInServerDispatch>]

const modalReducer = (
  state: ChannelInServer,
  action: ChannelInServerDispatch,
): ChannelInServer => {
  switch (action.type) {
  case 'APPEND':
    return {
      ...state,
      [action.payload.channelId]: action.payload.value,
    }
  default:
    return state
  }
}

const initialValue = {}

const ChannelInServerContext = createContext<ChannelInServerReducer>([initialValue, () => initialValue])

export const ChannelInServerContextProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modal, modalDispatch] = useReducer(modalReducer, initialValue)
  return (
    <ChannelInServerContext.Provider value={[modal, modalDispatch]}>
      {children}
    </ChannelInServerContext.Provider>
  )
}

ChannelInServerContextProvider.propTypes = {
  children: PropTypes.node,
}

const useAbstractDispatch = (channelId: string, value: boolean) => {
  const [, dispatch] = useContext(ChannelInServerContext)
  return () => {
    dispatch({
      type: 'APPEND',
      payload: {
        channelId,
        value,
      },
    })
  }
}

export const useDeleteChannelValue = () => useContext(ChannelInServerContext)[0]
export const useDeleteChannelOpen = (channelId: string) => useAbstractDispatch(channelId, true)
export const useDeleteChannelClose = (channelId: string) => useAbstractDispatch(channelId, false)

export default ChannelInServerContext
