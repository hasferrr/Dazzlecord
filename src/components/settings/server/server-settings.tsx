/* eslint-disable react-hooks/exhaustive-deps */

'use client'

import { useEffect, useState } from 'react'

import { type Member, MemberRole, type Server } from '@prisma/client'
import { CircleX } from 'lucide-react'

import BigScreen from '@/components/media-query/big-screen'
import MobileScreen from '@/components/media-query/mobile-screen'
import MobileToggleV2 from '@/components/mobile-toggle-v2'
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area'
import {
  useCloseServerSettingsPage,
  useServerSettingsPageValue,
  useServerSettingsValue,
} from '@/context/settings/server-settings'
import { cn } from '@/lib/utils'
import type { MemberWithUser } from '@/types'

import Members from './members'
import Overview from './overview'
import ServerSelections from './server-selections'

interface ServerSettingsProps {
  server: Server
  currentMember: Member
  serverMembers: MemberWithUser[]
}

const ServerSettings = ({
  server,
  currentMember,
  serverMembers,
}: ServerSettingsProps) => {
  const [opacity, setOpacity] = useState<'opacity-0' | 'opacity-100'>('opacity-100')
  const serverSettingsValue = useServerSettingsValue()
  const serverSettingsPageValue = useServerSettingsPageValue()
  const closeServerSettingsPage = useCloseServerSettingsPage()

  const handleClose = () => {
    setOpacity('opacity-0')
    setTimeout(() => {
      closeServerSettingsPage()
    }, 200)
  }

  useEffect(() => {
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

  const serverSelectionsComponent = (
    <ServerSelections
      serverName={server.name}
      currentMember={currentMember}
    />
  )

  return serverSettingsPageValue
    ? (
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
              {serverSelectionsComponent}
            </MobileToggleV2>
          </div>
        </MobileScreen>
        <BigScreen>
          {serverSelectionsComponent}
        </BigScreen>
        <ScrollArea className="md:w-[52rem] py-[60px] md:px-[40px] px-1">
          {serverSettingsValue.overview && currentMember.role !== MemberRole.MODERATOR
            && <Overview server={server} />}
          {serverSettingsValue.members
            && <Members members={serverMembers} currentMember={currentMember} />}
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
        <div className="w-[72px] md:pr-[40px] pr-[12px] py-[60px] flex items-start justify-end flex-grow">
          <button onClick={handleClose}>
            <CircleX className="h-8 w-8" />
          </button>
        </div>
      </div>
    )
    : <div />
}

export default ServerSettings
