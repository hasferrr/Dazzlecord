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
export const useSetServerSettings = () => {
  const [state, setState] = useContext(ServerSettingsContext)
  return (selection: keyof State, val: boolean) =>
    setState({
      ...initialValue,
      serverSettingsPage: state.serverSettingsPage,
      [selection]: val,
    })
}

export const useServerSettingsPageValue = () => useContext(ServerSettingsContext)[0].serverSettingsPage
export const useServerSettingsPageOpen = () => {
  const [state, setState] = useContext(ServerSettingsContext)
  return () => setState({ ...state, serverSettingsPage: true })
}
export const useServerSettingsPageClose = () => {
  const [_, setState] = useContext(ServerSettingsContext)
  return () => setState(initialValue)
}

export default ServerSettingsContext
