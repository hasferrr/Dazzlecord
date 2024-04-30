'use client'

import React, {
  createContext, type Dispatch, useContext, useMemo,
  useReducer,
} from 'react'

const initialValue = {
  settingsPage: false,
  profiles: false,
  appearance: false,
}

type State = typeof initialValue
type Action =
  | { type: 'SET', payload: State }
  | { type: 'RESET' }
  | { type: 'OPEN_PROFILES_PAGE' }
  | { type: 'OPEN_APPEARANCE_PAGE' }
type Reducer = { value: State, dispatch: Dispatch<Action> }

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET':
      return { ...state, ...action.payload }
    case 'RESET':
      return initialValue
    case 'OPEN_PROFILES_PAGE':
      return { ...initialValue, settingsPage: true, profiles: true }
    case 'OPEN_APPEARANCE_PAGE':
      return { ...initialValue, settingsPage: true, appearance: true }
    default:
      return state
  }
}

const UserSettingsContext = createContext<Reducer>({
  value: initialValue, dispatch: () => undefined,
})

export const UserSettingsContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [value, dispatch] = useReducer(reducer, initialValue)
  const contextValue = useMemo(() => ({ value, dispatch }), [value, dispatch])
  return (
    <UserSettingsContext.Provider value={contextValue}>
      {children}
    </UserSettingsContext.Provider>
  )
}

export const useUserSettingsValue = () => useContext(UserSettingsContext).value

export const useOpenProfilesPage = () => {
  const { dispatch } = useContext(UserSettingsContext)
  return () => dispatch({ type: 'OPEN_PROFILES_PAGE' })
}

export const useUserSettingsPageValue = () => useContext(UserSettingsContext)
  .value.settingsPage

export const useOpenUserSettingsPage = useOpenProfilesPage

export const useCloseUserSettingsPage = () => {
  const { dispatch } = useContext(UserSettingsContext)
  return () => dispatch({ type: 'RESET' })
}

export const useOpenAppearanceSettingsPage = () => {
  const { dispatch } = useContext(UserSettingsContext)
  return () => dispatch({ type: 'OPEN_APPEARANCE_PAGE' })
}

export default UserSettingsContext
