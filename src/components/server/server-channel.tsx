'use client'

import {
  type Channel,
  ChannelType,
  MemberRole,
} from '@prisma/client'
import { Edit, Hash, Mic, Trash, Video } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'

import { ActionTooltip } from '@/components/action-tooltip'
import { useDeleteChannelOpen } from '@/context/delete-channel-context'
import { useEditChannelOpen } from '@/context/edit-channel-context'
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
  const router = useRouter()

  const deleteChannelOpen = useDeleteChannelOpen(channel.id)
  const editChannelOpen = useEditChannelOpen(channel.id)

  const Icon = iconMap[channel.type]

  const navigateToChannel = () => {
    router.push(`/servers/${params?.['serverId']}/${channel.id}`)
  }

  return (
    <div>
      <button
        onClick={navigateToChannel}
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
          'truncate font-medium text-sm transition',
          'text-channel-btn-group',
          'text-left',
          'w-[156px] group-hover:w-[116px]',
          params?.['channelId'] === channel.id && 'text-on-channel'
        )}>
          {channel.name}
        </p>
        {role !== MemberRole.GUEST && role !== MemberRole.MODERATOR && (
          <div className="ml-auto flex items-center gap-x-2">
            <ActionTooltip label="Edit">
              <Edit
                onClick={editChannelOpen}
                className="hidden group-hover:block w-4 h-4 text-channel-btn transition"
              />
            </ActionTooltip>
            <ActionTooltip label="Delete">
              <Trash
                onClick={deleteChannelOpen}
                className="hidden group-hover:block w-4 h-4 text-channel-btn transition"
              />
            </ActionTooltip>
          </div>
        )}
      </button>
    </div>
  )
}

export default ServerChannel
