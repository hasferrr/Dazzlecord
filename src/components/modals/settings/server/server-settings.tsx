/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { useEffect, useState } from 'react'

import { CircleX } from 'lucide-react'

import BigScreen from '@/components/media-query/big-screen'
import MobileScreen from '@/components/media-query/mobile-screen'
import { MobileToggleV2 } from '@/components/mobile-toggle-v2'
import {
  useServerSettingsPageClose,
  useServerSettingsPageValue,
  useServerSettingsValue,
  useSetServerSettings,
} from '@/context/settings/server-settings'
import { cn } from '@/lib/utils'

import Members from './members'
import Overview from './overview'
import ServerSelections from './server-selections'

const ServerSettings = ({ serverName }: {
  serverName: string
}) => {
  const [opacity, setOpacity] = useState<'opacity-0' | 'opacity-100'>('opacity-100')
  const setServerSettings = useSetServerSettings()
  const serverSettingsValue = useServerSettingsValue()
  const serverSettingsPageValue = useServerSettingsPageValue()
  const serverSettingsPageClose = useServerSettingsPageClose()

  const handleClose = () => {
    setOpacity('opacity-0')
    setTimeout(() => {
      serverSettingsPageClose()
    }, 200)
  }

  useEffect(() => {
    setServerSettings('overview', true)
    setOpacity('opacity-100')
  }, [serverSettingsPageValue])

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

  const serverSelectionsComponent = <ServerSelections serverName={serverName} />

  return (
    <>
      {serverSettingsPageValue &&
        <div className={cn(
          opacity,
          'bg-page dark:bg-page-dark',
          'flex fixed top-0 left-0 right-0 bottom-0 z-40',
          'transition-all animate-overlayShow',
        )}>
          <MobileScreen>
            <div className="pl-[20px] pt-[52.5px]">
              <MobileToggleV2 side="left">
                {serverSelectionsComponent}
              </MobileToggleV2>
            </div>
          </MobileScreen>
          <BigScreen>
            {serverSelectionsComponent}
          </BigScreen>
          <div className="w-[52rem] py-[60px] px-[40px]">
            {serverSettingsValue.overview && <Overview />}
            {serverSettingsValue.members && <Members />}
          </div>
          <div className="w-[72px] py-[60px] flex items-start flex-grow flex-shrink-0">
            <button onClick={handleClose}>
              <CircleX className="h-8 w-8" />
            </button>
          </div>
        </div>
      }
    </>
  )
}

export default ServerSettings
