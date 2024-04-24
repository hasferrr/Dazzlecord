import { ChannelType } from '@prisma/client'
import {
  Hash,
  Mic,
  Video,
} from 'lucide-react'
import { redirect } from 'next/navigation'

import { getServerWithAnyChannel } from '@/actions/prisma/server'
import { auth } from '@/auth'
import MobileScreen from '@/components/media-query/mobile-screen'
import MemberSidebar from '@/components/member/member-sidebar'
import MobileToggleV2 from '@/components/mobile-toggle-v2'
import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import ServerSidebar from '@/components/server/server-sidebar'
import SocketIndicator from '@/components/socket-indicator'

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
}

interface ChatHeaderProps {
  name: string
  serverId?: string
  channelType: ChannelType
}

const ChatHeader = async ({
  name,
  serverId,
  channelType,
}: ChatHeaderProps) => {
  const Icon = iconMap[channelType]

  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  let server
  try {
    if (serverId) {
      server = await getServerWithAnyChannel(serverId, userId)
    }
  } catch (error) {
    console.log(error)
  }

  return (
    <div className="flex items-center gap-2
    text-md font-semibold px-3 h-12 w-full
    border-neutral-200 dark:border-neutral-800 border-b-[1.5px]">
      <MobileScreen>
        <MobileToggleV2>
          <NavigationSidebar />
          {server && <ServerSidebar server={server} />}
        </MobileToggleV2>
      </MobileScreen>
      <div>
        <Icon className="w-5 h-5 text-[#A1A1AA] dark:text-[#B5BAC1]" />
      </div>
      <p className="font-semibold text-md text-black dark:text-white line-clamp-1">
        {name}
      </p>
      <div className="grow" />
      {serverId && <>
        <SocketIndicator />
        <MobileScreen width={992}>
          <MobileToggleV2 side="right" buttonVariant="users">
            <MemberSidebar serverId={serverId} />
          </MobileToggleV2>
        </MobileScreen>
      </>}
    </div>
  )
}

export default ChatHeader
