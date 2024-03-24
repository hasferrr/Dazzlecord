'use client'

import {
  type Channel,
  ChannelType,
  MemberRole,
  type Server,
} from '@prisma/client'
import { Edit, Hash, Mic, Trash, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ActionTooltip } from '@/components/action-tooltip'
import { cn } from '@/lib/utils'

interface ServerChannelProps {
  role?: MemberRole
  channel: Channel
}

const iconMap = {
  [ChannelType.TEXT]: Hash,
  [ChannelType.VOICE]: Mic,
  [ChannelType.VIDEO]: Video,
}

const ServerChannel = ({
  role,
  channel,
}: ServerChannelProps) => {
  const params = useParams()

  const Icon = iconMap[channel.type]

  return (
    <button
      onClick={() => { }}
      className={cn(
        'flex items-center gap-x-2',
        'p-2 w-full',
        'group rounded-md transition',
        'hover:bg-zinc-700/10',
        'dark:hover:bg-zinc-700/50',
        params?.['channelId'] === channel.id && 'bg-zinc-700/20 dark:bg-zinc-700'
      )}
    >
      <Icon className="w-5 h-5 text-channel-btn-no-hover" />
      <p className={cn(
        'line-clamp-1 font-medium text-sm transition',
        'text-channel-btn-group',
      )}>
        {channel.name}
      </p>
      {role !== MemberRole.GUEST && (
        <div className="ml-auto flex items-center gap-x-2">
          <ActionTooltip label="Edit">
            <Edit className="hidden group-hover:block w-4 h-4 text-channel-btn transition" />
          </ActionTooltip>
          <ActionTooltip label="Delete">
            <Trash className="hidden group-hover:block w-4 h-4 text-channel-btn transition" />
          </ActionTooltip>
        </div>
      )}
    </button>
  )
}

export default ServerChannel
