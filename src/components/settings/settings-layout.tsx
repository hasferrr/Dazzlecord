/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect, useState } from 'react'

import { CircleX } from 'lucide-react'

import BigScreen from '@/components/media-query/big-screen'
import MobileScreen from '@/components/media-query/mobile-screen'
import MobileToggleV2 from '@/components/mobile-toggle-v2'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'

import LabelSelection from './label-selection'

interface SettingsLayoutProps {
  label: string
  isSettingsPageOpen: boolean
  closeSettingsPage: () => void
  selectionComponents: JSX.Element
  children: React.ReactNode
}

const SettingsLayout = ({
  label,
  isSettingsPageOpen,
  closeSettingsPage,
  selectionComponents,
  children,
}: SettingsLayoutProps) => {
  const [opacity, setOpacity] = useState<'opacity-0' | 'opacity-100'>('opacity-100')

  const handleClose = () => {
    setOpacity('opacity-0')
    setTimeout(() => {
      closeSettingsPage()
    }, 200)
  }

  useEffect(() => {
    setOpacity('opacity-100')
  }, [isSettingsPageOpen])

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
      {isSettingsPageOpen
        && (
        <div className={cn(
          opacity,
          'bg-page dark:bg-page-dark',
          'flex fixed top-0 left-0 right-0 bottom-0 z-40',
          'transition-all animate-overlayShow',
        )}
        >
          <MobileScreen>
            <div className="pl-3 pt-[55px]">
              <MobileToggleV2 side="left">
                <div className="bg-server dark:bg-server-dark flex flex-grow flex-shrink-0 justify-end">
                  <ScrollArea className="pl-4">
                    <div className="py-[60px] w-[13rem] flex flex-col gap-y-1">
                      <LabelSelection
                        title={label}
                        className="pl-2"
                      />
                      {selectionComponents}
                    </div>
                  </ScrollArea>
                </div>
              </MobileToggleV2>
            </div>
          </MobileScreen>
          <BigScreen>
            <div className="bg-server dark:bg-server-dark flex flex-grow flex-shrink-0 justify-end">
              <ScrollArea className="pl-4">
                <div className="py-[60px] w-[13rem] flex flex-col gap-y-1">
                  <LabelSelection
                    title={label}
                    className="pl-2"
                  />
                  {selectionComponents}
                </div>
              </ScrollArea>
            </div>
          </BigScreen>
          <ScrollArea className="md:w-[52rem] py-[60px] md:px-[40px] px-1">
            {children}
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <div className="w-[72px] md:pr-[40px] pr-[12px] py-[60px] flex items-start justify-end flex-grow">
            <button onClick={handleClose}>
              <CircleX className="h-8 w-8" />
            </button>
          </div>
        </div>
        )}
    </>
  )
}

export default SettingsLayout
