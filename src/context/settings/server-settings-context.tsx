'use client'

import {
  createContext,
  type Dispatch,
  useContext,
  useMemo,
  useReducer,
} from 'react'

const initialValue = {
  serverSettingsPage: false,
  overview: false,
  members: false,
}

type State = typeof initialValue
type Action =
  | { type: 'SET', payload: State }
  | { type: 'RESET' }
  | { type: 'OPEN_OVERVIEW_PAGE' }
  | { type: 'OPEN_MEMBER_PAGE' }
type Reducer = { value: State, dispatch: Dispatch<Action> }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload }
    case 'RESET':
      return initialValue
    case 'OPEN_OVERVIEW_PAGE':
      return { ...initialValue, serverSettingsPage: true, overview: true }
    case 'OPEN_MEMBER_PAGE':
      return { ...initialValue, serverSettingsPage: true, overview: true }
    default:
      return state
  }
}

const ServerSettingsContext = createContext<Reducer>({
  value: initialValue, dispatch: () => initialValue,
})

export const ServerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [value, dispatch] = useReducer(reducer, initialValue)
  const contextValue = useMemo(() => ({ value, dispatch }), [value, dispatch])
  return (
    <ServerSettingsContext.Provider value={contextValue}>
      {children}
    </ServerSettingsContext.Provider>
  )
}

export const useServerSettingsValue = () => useContext(ServerSettingsContext).value

export const useOpenOverview = () => {
  const { dispatch } = useContext(ServerSettingsContext)
  return () => dispatch({ type: 'OPEN_OVERVIEW_PAGE' })
}

export const useServerSettingsPageValue = () => useContext(ServerSettingsContext)
  .value.serverSettingsPage

export const useOpenServerSettingsPage = useOpenOverview

export const useCloseServerSettingsPage = () => {
  const { dispatch } = useContext(ServerSettingsContext)
  return () => dispatch({ type: 'RESET' })
}

export const useOpenManageMember = () => {
  const { dispatch } = useContext(ServerSettingsContext)
  return () => dispatch({ type: 'OPEN_MEMBER_PAGE' })
}

export default ServerSettingsContext
