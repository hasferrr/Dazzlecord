'use client'

import { useEffect, useState } from 'react'

import BigScreen from '@/components/media-query/big-screen'
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
          'bg-page dark:bg-page-dark',
          'flex fixed top-0 left-0 right-0 bottom-0 z-[1000]',
          'transition-all animate-overlayShow',
        )}>
          <BigScreen>
            <div className="py-[60px] bg-server dark:bg-server-dark flex flex-grow flex-shrink-0 justify-end">
              <div className="w-[14rem]">
                HELLO LEFT
              </div>
            </div>
          </BigScreen>
          <div className="w-[52rem] py-[60px] px-[40px]">
            HELLO RIGHT
          </div>
          <div className="w-[3rem] py-[60px] flex items-start flex-grow flex-shrink-0">
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
