'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const initialValue = {
  serverSettingsPage: false,
  overview: false,
  members: false,
}

type State = typeof initialValue
type SetState = Dispatch<SetStateAction<State>>

const ServerSettingsContext = createContext<{ state: State, setState: SetState }>(
  { state: initialValue, setState: () => initialValue },
)

export const ServerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState(initialValue)

  const contextValue = useMemo(() => ({ state, setState }), [state, setState])
  return (
    <ServerSettingsContext.Provider value={contextValue}>
      {children}
    </ServerSettingsContext.Provider>
  )
}

export const useServerSettingsValue = () => useContext(ServerSettingsContext).state

export const useServerSettingsPageValue = () => {
  const { state } = useContext(ServerSettingsContext)
  return state.serverSettingsPage
}

export const useCloseServerSettingsPage = () => {
  const { setState } = useContext(ServerSettingsContext)
  return () => setState(initialValue)
}

export const useOpenServerSettingsPage = () => {
  const { setState } = useContext(ServerSettingsContext)
  return () => setState({ ...initialValue, serverSettingsPage: true, overview: true })
}

export const useOpenManageMember = () => {
  const { setState } = useContext(ServerSettingsContext)
  return () => setState({ ...initialValue, serverSettingsPage: true, members: true })
}

export default ServerSettingsContext
