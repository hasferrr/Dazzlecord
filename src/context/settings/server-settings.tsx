'use client'

import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react'

const initialValue = {
  serverSettingsPage: false,
  overview: false,
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

export const useServerSettingsValue = () => useContext(ServerSettingsContext)[0]
export const useServerSettingsPageValue = () => useContext(ServerSettingsContext)[0].serverSettingsPage
export const useCloseServerSettingsPage = () => {
  const [_, setState] = useContext(ServerSettingsContext)
  return () => setState(initialValue)
}

export const useOpenServerSettingsPage = () => {
  const [_, setState] = useContext(ServerSettingsContext)
  return () => setState({ ...initialValue, serverSettingsPage: true, overview: true })
}

export const useOpenManageMember = () => {
  const [_, setState] = useContext(ServerSettingsContext)
  return () => setState({ ...initialValue, serverSettingsPage: true, members: true })
}

export default ServerSettingsContext
