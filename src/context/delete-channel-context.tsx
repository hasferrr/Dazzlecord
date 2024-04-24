'use client'

import {
  createContext,
  type Dispatch,
  useContext,
  useMemo,
  useReducer,
} from 'react'

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
type DeleteChannelModalReducer = {
  value: DeleteChannelModal,
  dispatch: Dispatch<DeleteChannelModalDispatch>,
}

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

const DeleteChannelModalContext = createContext<DeleteChannelModalReducer>(
  { value: initialValue, dispatch: () => initialValue },
)

export const DeleteChannelModalContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [value, dispatch] = useReducer(modalReducer, initialValue)
  const contextValue = useMemo(() => ({ value, dispatch }), [value, dispatch])
  return (
    <DeleteChannelModalContext.Provider value={contextValue}>
      {children}
    </DeleteChannelModalContext.Provider>
  )
}

const useAbstractDispatch = (channelId: string, value: boolean) => {
  const { dispatch } = useContext(DeleteChannelModalContext)
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

export const useDeleteChannelValue = () => useContext(DeleteChannelModalContext).value
export const useDeleteChannelOpen = (channelId: string) => useAbstractDispatch(channelId, true)
export const useDeleteChannelClose = (channelId: string) => useAbstractDispatch(channelId, false)

export default DeleteChannelModalContext
