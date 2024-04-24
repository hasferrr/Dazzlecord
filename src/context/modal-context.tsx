'use client'

import {
  createContext, type Dispatch, useContext, useReducer,
} from 'react'

const initialValue = {
  invite: false,
  createServer: false,
  deleteServer: false,
  leaveServer: false,
  createChannel: false,
}

type Modal = typeof initialValue
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

const ModalContext = createContext<ModalReducer>([initialValue, () => initialValue])

export const ModalContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [modal, modalDispatch] = useReducer(modalReducer, initialValue)
  return (
    <ModalContext.Provider value={[modal, modalDispatch]}>
      {children}
    </ModalContext.Provider>
  )
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
export const useCreateServerValue = () => useAbstractGetState('createServer')
export const useDeleteServerValue = () => useAbstractGetState('deleteServer')
export const useLeaveServerValue = () => useAbstractGetState('leaveServer')
export const useCreateChannelValue = () => useAbstractGetState('createChannel')

export const useInviteOpen = () => useAbstractDispatch('invite', true)
export const useCreateServerOpen = () => useAbstractDispatch('createServer', true)
export const useDeleteServerOpen = () => useAbstractDispatch('deleteServer', true)
export const useLeaveServerOpen = () => useAbstractDispatch('leaveServer', true)
export const useCreateChannelOpen = () => useAbstractDispatch('createChannel', true)

export const useInviteClose = () => useAbstractDispatch('invite', false)
export const useCreateServerClose = () => useAbstractDispatch('createServer', false)
export const useDeleteServerClose = () => useAbstractDispatch('deleteServer', false)
export const useLeaveServerClose = () => useAbstractDispatch('leaveServer', false)
export const useCreateChannelClose = () => useAbstractDispatch('createChannel', false)

export default ModalContext
