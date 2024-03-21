'use client'

import { createContext, Dispatch, useContext, useReducer } from 'react'

import PropTypes from 'prop-types'

interface Modal {
  server: boolean
  invite: boolean
  delete: boolean
  leave: boolean
  channel: boolean
}
type ModalDispatch = { type: 'SET', payload: Modal }
type ModalReducer = [Modal, Dispatch<ModalDispatch>]

const modalReducer = (state: Modal, action: ModalDispatch): Modal => {
  switch (action.type) {
  case 'SET':
    return action.payload
  default:
    return state
  }
}

const initialValue = {
  server: false,
  invite: false,
  delete: false,
  leave: false,
  channel: false,
}

const ModalContext = createContext<ModalReducer>([initialValue, () => initialValue])

export const ModalContextProvider: React.FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const [modal, modalDispatch] = useReducer(modalReducer, initialValue)
  return (
    <ModalContext.Provider value={[modal, modalDispatch]}>
      {children}
    </ModalContext.Provider>
  )
}

ModalContextProvider.propTypes = {
  children: PropTypes.node,
}

const useAbstractGetState = (type: keyof Modal) => {
  const [value] = useContext(ModalContext)
  return value[type]
}

const useAbstractDispatch = (type: keyof Modal, value: boolean) => {
  const [state, dispatch] = useContext(ModalContext)

  return () => {
    dispatch({
      type: 'SET',
      payload: {
        ...state,
        [type]: value,
      },
    })
  }
}

export const useInviteValue = () => useAbstractGetState('invite')
export const useServerValue = () => useAbstractGetState('server')
export const useDeleteServerValue = () => useAbstractGetState('delete')
export const useLeaveServerValue = () => useAbstractGetState('leave')
export const useCreateChannelValue = () => useAbstractGetState('channel')

export const useInviteOpen = () => useAbstractDispatch('invite', true)
export const useServerOpen = () => useAbstractDispatch('server', true)
export const useDeleteServerOpen = () => useAbstractDispatch('delete', true)
export const useLeaveServerOpen = () => useAbstractDispatch('leave', true)
export const useCreateChannelOpen = () => useAbstractDispatch('channel', true)

export const useInviteClose = () => useAbstractDispatch('invite', false)
export const useServerClose = () => useAbstractDispatch('server', false)
export const useDeleteServerClose = () => useAbstractDispatch('delete', false)
export const useLeaveServerClose = () => useAbstractDispatch('leave', false)
export const useCreateChannelClose = () => useAbstractDispatch('channel', false)

export default ModalContext
