'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

const initialValue = false

type State = string | false
type SetState = Dispatch<SetStateAction<State>>

const IsEditingContext = createContext<{ state: State, setState: SetState }>(
  { state: initialValue, setState: () => initialValue },
)

export const IsEditingContextProvider = ({ children }: { children?: React.ReactNode }) => {
  const [state, setState] = useState<string | false>(initialValue)

  const contextValue = useMemo(() => ({ state, setState }), [state, setState])
  return (
    <IsEditingContext.Provider value={contextValue}>
      {children}
    </IsEditingContext.Provider>
  )
}

export const useIsEditingValue = () => {
  const { state } = useContext(IsEditingContext)
  return state
}

export const useSetIsEditing = () => {
  const { setState } = useContext(IsEditingContext)
  return setState
}

export default IsEditingContext
