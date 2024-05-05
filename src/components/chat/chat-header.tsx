import { ChannelType } from '@prisma/client'
import {
  Hash,
  Mic,
  UserRoundSearch,
  Video,
} from 'lucide-react'

import MobileScreen from '@/components/media-query/mobile-screen'
import MobileToggleV2 from '@/components/mobile-toggle-v2'
import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import SocketIndicator from '@/components/socket-indicator'

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
  PERSON: UserRoundSearch,
}

interface ChatHeaderProps {
  title: string
  iconType: keyof typeof iconMap | JSX.Element
  right: React.ReactNode
  left: React.ReactNode
}

const ChatHeader = async ({
  title,
  iconType,
  right,
  left,
}: ChatHeaderProps) => {
  const icon = typeof iconType === 'string'
    ? (() => {
      const LucideIcon = iconMap[iconType]
      return <LucideIcon className="w-5 h-5 text-[#A1A1AA] dark:text-[#B5BAC1]" />
    })()
    : iconType

  return (
    <div className="flex items-center gap-2
    text-md font-semibold px-3 h-12 w-full
    border-neutral-200 dark:border-neutral-800 border-b-[1.5px]"
    >
      {left && (
        <MobileScreen>
          <MobileToggleV2>
            <NavigationSidebar />
            {left}
          </MobileToggleV2>
        </MobileScreen>
      )}
      <div>
        {icon}
      </div>
      <p className="font-semibold text-md text-black dark:text-white line-clamp-1">
        {title}
      </p>
      <div className="grow" />
      <SocketIndicator />
      {right && (
        <MobileScreen width={992}>
          <MobileToggleV2 side="right" buttonVariant="users">
            {right}
          </MobileToggleV2>
        </MobileScreen>
      )}
    </div>
  )
}

export default ChatHeader
