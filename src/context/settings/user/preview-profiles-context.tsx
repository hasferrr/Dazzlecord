'use client'

import {
  createContext, type Dispatch, type SetStateAction, useContext, useState,
} from 'react'

interface State {
  name: string
  about: string | null
  image: string | null
}
type SetState = Dispatch<SetStateAction<State>>

const dummy = { name: '', about: null, image: null }

const PreviewProfilesContext = createContext<[State, SetState]>([dummy, () => dummy])

export const PreviewProfilesContextProvider = ({
  name, about, image, children,
}: {
  name: State['name']
  about: State['about']
  image: State['image']
  children?: React.ReactNode
}) => {
  const [state, setState] = useState({ name, about, image })

  return (
    <PreviewProfilesContext.Provider value={[state, setState]}>
      {children}
    </PreviewProfilesContext.Provider>
  )
}

export const usePreviewProfilesValue = () => useContext(PreviewProfilesContext)[0]
export const useSetAllStatePreviewProfiles = () => useContext(PreviewProfilesContext)[1]
export const useSetPreviewProfiles = () => {
  const [state, setState] = useContext(PreviewProfilesContext)
  return (key: keyof State, value: string | null) => {
    setState({ ...state, [key]: value })
  }
}

export default PreviewProfilesContext
