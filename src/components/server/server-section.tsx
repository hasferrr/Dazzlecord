'use client'

import { ChannelType, MemberRole } from '@prisma/client'
import { Plus } from 'lucide-react'

import ActionTooltip from '@/components/action-tooltip'
import { useCreateChannelOpen } from '@/context/modal-context'

interface ServerSectionProps {
  role?: MemberRole
  channelType: ChannelType
}

const labelMap = {
  [ChannelType.TEXT]: 'TEXT CHANNELS',
  [ChannelType.VOICE]: 'VOICE CHANNELS',
  [ChannelType.VIDEO]: 'VIDEO CHANNELS',
}

const ServerSection = ({
  role,
  channelType,
}: ServerSectionProps) => {
  const openCreateChannel = useCreateChannelOpen()

  return (
    <div className="flex items-center justify-between py-2">
      <p className="text-xs uppercase font-bold text-channel-section">
        {labelMap[channelType]}
      </p>
      {role !== MemberRole.GUEST && role !== MemberRole.MODERATOR && (
        <ActionTooltip label="Create Channel" side="top">
          <button
            onClick={openCreateChannel}
            className="transition text-channel-section"
          >
            <Plus className="h-4 w-4" />
          </button>
        </ActionTooltip>
      )}
    </div>
  )
}

export default ServerSection
