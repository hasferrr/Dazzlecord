'use client'

import { createContext, type Dispatch, useContext, useReducer } from 'react'

import PropTypes from 'prop-types'

type DeleteChannelModal = {
  [key: string]: boolean
}
type DeleteChannelModalDispatch = {
  type: 'APPEND',
  payload: {
    channelId: keyof DeleteChannelModal,
    value: DeleteChannelModal['key'],
  },
}
type DeleteChannelModalReducer = [DeleteChannelModal, Dispatch<DeleteChannelModalDispatch>]

const modalReducer = (
  state: DeleteChannelModal,
  action: DeleteChannelModalDispatch,
): DeleteChannelModal => {
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

const DeleteChannelModalContext = createContext<DeleteChannelModalReducer>([initialValue, () => initialValue])

export const DeleteChannelModalContextProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modal, modalDispatch] = useReducer(modalReducer, initialValue)
  return (
    <DeleteChannelModalContext.Provider value={[modal, modalDispatch]}>
      {children}
    </DeleteChannelModalContext.Provider>
  )
}

DeleteChannelModalContextProvider.propTypes = {
  children: PropTypes.node,
}

const useAbstractDispatch = (channelId: string, value: boolean) => {
  const [, dispatch] = useContext(DeleteChannelModalContext)
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

export const useDeleteChannelValue = () => useContext(DeleteChannelModalContext)[0]
export const useDeleteChannelOpen = (channelId: string) => useAbstractDispatch(channelId, true)
export const useDeleteChannelClose = (channelId: string) => useAbstractDispatch(channelId, false)

export default DeleteChannelModalContext
