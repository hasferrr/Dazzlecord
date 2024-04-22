'use client'

import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react'

const initialValue = {
  settingsPage: false,
  profiles: false,
}

type State = typeof initialValue
type SetState = Dispatch<SetStateAction<State>>

const UserSettingsContext = createContext<[State, SetState]>([initialValue, () => initialValue])

export const UserSettingsContextProvider = ({ children }: {
  children?: React.ReactNode
}) => {
  const [serverSelections, setUserSettings] = useState(initialValue)

  return (
    <UserSettingsContext.Provider value={[serverSelections, setUserSettings]}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export const useUserSettingsValue = () => useContext(UserSettingsContext)[0]
export const useUserSettingsPageValue = () => useContext(UserSettingsContext)[0].settingsPage

export const useCloseUserSettingsPage = () => {
  const [_, setState] = useContext(UserSettingsContext)
  return () => setState(initialValue)
}

export const useOpenUserSettingsPage = () => {
  const [_, setState] = useContext(UserSettingsContext)
  return () => setState({ ...initialValue, settingsPage: true, profiles: true })
}

export default UserSettingsContext
