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
  settingsPage: false,
  profiles: false,
}

type State = typeof initialValue
type SetState = Dispatch<SetStateAction<State>>

const UserSettingsContext = createContext<{ state: State, setState: SetState }>(
  { state: initialValue, setState: () => initialValue },
)

export const UserSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState(initialValue)

  const contextValue = useMemo(() => ({ state, setState }), [state, setState])
  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export const useUserSettingsValue = () => useContext(UserSettingsContext).state
export const useUserSettingsPageValue = () => useContext(UserSettingsContext).state.settingsPage

export const useCloseUserSettingsPage = () => {
  const { setState } = useContext(UserSettingsContext)
  return () => setState(initialValue)
}

export const useOpenUserSettingsPage = () => {
  const { setState } = useContext(UserSettingsContext)
  return () => setState({ ...initialValue, settingsPage: true, profiles: true })
}

export default UserSettingsContext
