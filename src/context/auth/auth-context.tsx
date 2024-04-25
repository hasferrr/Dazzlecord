'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

interface State { username: string }
type SetState = Dispatch<SetStateAction<State>>

const initialValue = { username: '' }

const AuthContext = createContext<{ state: State, setState: SetState }>(
  { state: initialValue, setState: () => initialValue },
)

export const AuthContextProvider = ({ username, children }: {
  username: string
  children?: React.ReactNode
}) => {
  const [state, setState] = useState({ username })

  const contextValue = useMemo(() => ({ state, setState }), [state, setState])
  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthValue = () => useContext(AuthContext).state
export const useSetAuth = () => useContext(AuthContext).setState

export default AuthContext
