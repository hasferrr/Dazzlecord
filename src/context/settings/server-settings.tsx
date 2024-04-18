'use client'

import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react'

const initialValue = {
  serverSettingsPage: false,
  overview: true,
  members: false,
}

type State = typeof initialValue
type SetState = Dispatch<SetStateAction<State>>

const ServerSettingsContext = createContext<[State, SetState]>([initialValue, () => initialValue])

export const ServerSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [serverSelections, setServerSettings] = useState(initialValue)

  return (
    <ServerSettingsContext.Provider value={[serverSelections, setServerSettings]}>
      {children}
    </ServerSettingsContext.Provider>
  )
}

export const useServerSettings = () => useContext(ServerSettingsContext)

export const useServerSettingsValue = () => useContext(ServerSettingsContext)[0].serverSettingsPage
export const useServerSettingsOpen = () => {
  const [state, setState] = useContext(ServerSettingsContext)
  return () => setState({ ...state, serverSettingsPage: true })
}
export const useServerSettingsClose = () => {
  const [_, setState] = useContext(ServerSettingsContext)
  return () => setState(initialValue)
}

export default ServerSettingsContext
