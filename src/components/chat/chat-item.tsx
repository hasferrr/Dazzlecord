'use client'

import type { MemberRole } from '@prisma/client'

import { ProfilePhoto } from '@/components/profile-photo'
import { formatDate, getFileURLFromGCS } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import type { MessageWithUser } from '@/types'

interface ChatItemProps {
  message: MessageWithUser
  currentUserId: String
  currentUserRole: MemberRole
}

const ChatItem = ({
  message,
}: ChatItemProps) => {
  const smolText = cn('text-xs mx-1 text-zinc-500 dark:text-zinc-400')

  return (
    <div className="relative group hover:bg-black/5 p-4 transition w-full
    grid grid-cols-[40px_1fr] grid-flow-row gap-x-4">
      <div className="row-span-2">
        <ProfilePhoto
          username={message.user.username}
          src={getFileURLFromGCS(message.user.image)}
          width={40}
          height={40}
        />
      </div>
      <p>
        <span className="max-w-[280px] truncate">
          {message.user.name}
        </span>
        <span>{' '}</span>
        <span className={cn(smolText)}>
          {formatDate(message.createdAt)}
        </span>
      </p>
      <p className="text-[15px] leading-[1.375rem] whitespace-break-spaces" style={{ wordBreak: 'break-word' }}>
        {message.content}
        {message.isUpdated && (
          <span className={smolText}>
            (edited)
          </span>
        )}
      </p>
    </div>
  )
}

export default ChatItem
