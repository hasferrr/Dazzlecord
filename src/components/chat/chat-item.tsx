'use client'

import { useState } from 'react'

import { type Member, MemberRole } from '@prisma/client'

import { deleteMessage } from '@/actions/message/delete-message'
import { useIsEditingValue, useSetIsEditing } from '@/context/chat/is-editing-context'
import { cn } from '@/lib/utils'
import type { MessageWithUser } from '@/types'

import ChatItemButton from './item/chat-item-button'
import ChatItemContent from './item/chat-item-content'
import ChatItemDeleteDialog from './item/chat-item-delete-dialog'
import ChatItemEditForm from './item/chat-item-edit-form'
import ChatItemNameTimestamp from './item/chat-item-name-timestamp'
import ChatItemProfilePhoto from './item/chat-item-profile-photo'

interface ChatItemProps {
  message: MessageWithUser
  currentMember: Member
}

const ChatItem = ({
  message,
  currentMember,
}: ChatItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const isEditing = useIsEditingValue()
  const setIsEditing = useSetIsEditing()

  const messageOwner = message.memberId === currentMember.id
  const canDeleteMessage = (messageOwner || (currentMember.role !== MemberRole.GUEST))
  const canEditMessage = messageOwner

  const smolText = cn('text-xs mx-1 text-zinc-500 dark:text-zinc-400')

  return (
    <div className="relative group hover:bg-chat-hover dark:hover:bg-chat-hover-dark p-4 transition w-full
    grid grid-cols-[40px_1fr] grid-flow-row gap-x-4"
    >
      <ChatItemProfilePhoto message={message} />
      <ChatItemNameTimestamp
        message={message}
        className={smolText}
      />
      <p className="text-[15px] leading-[1.375rem] whitespace-break-spaces" style={{ wordBreak: 'break-word' }}>
        {isEditing !== message.id
          ? <ChatItemContent message={message} editedStyle={cn(smolText, 'text-[11px]')} />
          : <ChatItemEditForm message={message} setIsEditing={setIsEditing} />}
      </p>
      <ChatItemButton
        messageId={message.id}
        setIsEditing={setIsEditing}
        setIsDeleting={setIsDeleting}
        canDeleteMessage={canDeleteMessage}
        canEditMessage={canEditMessage}
        deleteAction={() => {
          deleteMessage(message.id)
          setIsDeleting(false)
        }}
      />
      <ChatItemDeleteDialog
        message={message}
        open={isDeleting}
        close={() => setIsDeleting(false)}
        deleteAction={() => {
          deleteMessage(message.id)
          setIsDeleting(false)
        }}
      />
    </div>
  )
}

export default ChatItem
