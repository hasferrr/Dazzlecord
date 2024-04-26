'use client'

import ProfilePhoto from '@/components/profile-photo'
import UserPopover from '@/components/user/user-popover'
import { useIsEditingValue, useSetIsEditing } from '@/context/chat/is-editing-context'
import { formatDate, getFileURLFromGCS } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import type { MessageWithUser } from '@/types'

import ChatItemButton from './item/chat-item-button'
import ChatItemEditForm from './item/chat-item-edit-form'

interface ChatItemProps {
  message: MessageWithUser
}

const ChatItem = ({
  message,
}: ChatItemProps) => {
  const isEditing = useIsEditingValue()
  const setIsEditing = useSetIsEditing()

  const smolText = cn('text-xs mx-1 text-zinc-500 dark:text-zinc-400')

  return (
    <div className="relative group hover:bg-chat-hover dark:hover:bg-chat-hover-dark p-4 transition w-full
    grid grid-cols-[40px_1fr] grid-flow-row gap-x-4"
    >
      <div className="row-span-2 cursor-pointer">
        <UserPopover
          user={message.user}
          side="right"
        >
          <div>
            <ProfilePhoto
              username={message.user.username}
              src={getFileURLFromGCS(message.user.image)}
              width={40}
              height={40}
            />
          </div>
        </UserPopover>
      </div>
      <div className="flex items-center">
        <UserPopover
          user={message.user}
          side="right"
        >
          <div className="max-w-[280px] truncate hover:underline cursor-pointer">
            {message.user.name}
          </div>
        </UserPopover>
        <div>{' '}</div>
        <div className={cn(smolText, 'pt-1')}>
          {formatDate(message.createdAt)}
        </div>
      </div>
      <p className="text-[15px] leading-[1.375rem] whitespace-break-spaces" style={{ wordBreak: 'break-word' }}>
        {isEditing !== message.id
          ? (
            <>
              {message.content}
              {message.isUpdated && (
                <span className={smolText}>
                  (edited)
                </span>
              )}
            </>
          )
          : (
            <ChatItemEditForm
              content={message.content}
              setIsEditing={setIsEditing}
            />
          )}
      </p>
      <ChatItemButton
        messageId={message.id}
        setIsEditing={setIsEditing}
      />
    </div>
  )
}

export default ChatItem
