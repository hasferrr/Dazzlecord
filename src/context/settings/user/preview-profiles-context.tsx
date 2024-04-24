'use client'

import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
  useMemo,
  useState,
} from 'react'

interface State {
  name: string
  about: string | null
  image: string | null
}
type SetState = Dispatch<SetStateAction<State>>

const initialValue = { name: '', about: null, image: null }

const PreviewProfilesContext = createContext<{ state: State, setState: SetState }>(
  { state: initialValue, setState: () => initialValue },
)

export const PreviewProfilesContextProvider = ({
  name, about, image, children,
}: {
  name: State['name']
  about: State['about']
  image: State['image']
  children?: React.ReactNode
}) => {
  const [state, setState] = useState({ name, about, image })

  const contextValue = useMemo(() => ({ state, setState }), [state, setState])
  return (
    <PreviewProfilesContext.Provider value={contextValue}>
      {children}
    </PreviewProfilesContext.Provider>
  )
}

export const usePreviewProfilesValue = () => useContext(PreviewProfilesContext).state
export const useSetAllStatePreviewProfiles = () => useContext(PreviewProfilesContext).setState
export const useSetPreviewProfiles = () => {
  const { state, setState } = useContext(PreviewProfilesContext)
  return (key: keyof State, value: string | null) => {
    setState({ ...state, [key]: value })
  }
}

export default PreviewProfilesContext
