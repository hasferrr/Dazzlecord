'use client'

import { createContext, type Dispatch, type SetStateAction, useContext, useState } from 'react'

const dummy = { name: '', about: '' }
type State = typeof dummy
type SetState = Dispatch<SetStateAction<State>>

const PreviewProfilesContext = createContext<[State, SetState]>([dummy, () => dummy])

export const PreviewProfilesContextProvider = ({ name, about, children }: {
  name: string
  about: string
  children?: React.ReactNode
}) => {
  const [state, setState] = useState({ name, about })

  return (
    <PreviewProfilesContext.Provider value={[state, setState]}>
      {children}
    </PreviewProfilesContext.Provider>
  )
}

export const usePreviewProfilesValue = () => useContext(PreviewProfilesContext)[0]
export const useSetPreviewProfiles = () => useContext(PreviewProfilesContext)[1]

export default PreviewProfilesContext
