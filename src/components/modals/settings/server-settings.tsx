'use client'

import { useEffect, useState } from 'react'

import { CircleX } from 'lucide-react'

import BigScreen from '@/components/media-query/big-screen'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  useServerSettingsClose,
  useServerSettingsValue,
} from '@/context/modal-context'
import { cn } from '@/lib/utils'

import ButtonSelection from './button-selection'
import LabelSelection from './label-selection'

const ServerSettings = ({ serverName }: {
  serverName: string
}) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
            <div className="bg-server dark:bg-server-dark flex flex-grow flex-shrink-0 justify-end">
              <ScrollArea className="pl-[40px]">
                <div className="py-[60px] w-[13rem]
                flex flex-col gap-y-1">
                  <LabelSelection
                    title={serverName}
                    className="pl-2"
                  />
                  <ButtonSelection
                    title="Overview"
                    activeCondition={true}
                  />
                  <ButtonSelection
                    title="Members"
                    activeCondition={false}
                  />
                  <ButtonSelection
                    title="Delete Server"
                    activeCondition={false}
                  />
                </div>
              </ScrollArea>
            </div>
          </BigScreen>
          <div className="w-[52rem] py-[60px] px-[40px]">
            Server Overview
          </div>
          <div className="w-[3rem] py-[60px] flex items-start flex-grow flex-shrink-0">
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
