import { ChannelType } from '@prisma/client'
import {
  Hash,
  Mic,
  Video,
} from 'lucide-react'

import { MobileToggle } from '@/components/mobile-toggle'

interface ChatHeaderProps {
  name: string
  serverId: string
  channelType: ChannelType
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
}

const ChatHeader = ({
  name,
  serverId,
  channelType,
}: ChatHeaderProps) => {
  const Icon = iconMap[channelType]

  return (
    <div className="flex items-center gap-2
    text-md font-semibold px-3 h-12 w-full
    border-neutral-200 dark:border-neutral-800 border-b-[1.5px]">
      <MobileToggle serverId={serverId} />
      <Icon className="w-5 h-5 text-zinc-500 dark:text-zinc-400" />
      <p className="font-semibold text-md text-black dark:text-white">
        {name}
      </p>
    </div>
  )
}

export default ChatHeader
