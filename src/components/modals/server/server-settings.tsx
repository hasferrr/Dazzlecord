'use client'

import { useEffect, useState } from 'react'

import {
  useServerSettingsClose,
  useServerSettingsValue,
} from '@/context/modal-context'
import { cn } from '@/lib/utils'

const ServerSettings = () => {
  const [opacity, setOpacity] = useState<'opacity-0' | 'opacity-100'>('opacity-100')
  const serverSettingsValue = useServerSettingsValue()
  const serverSettingsClose = useServerSettingsClose()

  const handleClose = () => {
    setOpacity('opacity-0')
    setTimeout(() => {
      serverSettingsClose()
    }, 200)
  }

  useEffect(() => {
    setOpacity('opacity-100')
  }, [serverSettingsValue])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.code === 'Escape') {
        handleClose()
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => {
      window.removeEventListener('keydown', handleEsc)
    }
  }, [])

  return (
    <>
      {serverSettingsValue &&
        <div className={cn(
          opacity,
          'fixed top-0 left-0 right-0 bottom-0 bg-black/50 z-[1000]',
          'grid grid-cols-[17.375rem_51.25rem_2.25rem] justify-center',
          'transition-all animate-overlayShow',
        )}>
          <div className="py-[60px] pl-[60px] pr-[6px]">
            HELLO LEFT
          </div>
          <div className="py-[60px] px-[40px]">
            HELLO RIGHT
          </div>
          <div className="py-[60px] flex justify-center items-start">
            <button onClick={handleClose}>
              [X]
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default ServerSettings
