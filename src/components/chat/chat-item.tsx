'use client'

import { useState } from 'react'

import { MemberRole } from '@prisma/client'

import { deleteDirectMessage } from '@/actions/direct-message/delete-direct-message'
import { editDirectMessage } from '@/actions/direct-message/edit-direct-message'
import { deleteMessage } from '@/actions/message/delete-message'
import { editMessage } from '@/actions/message/edit-message'
import { useIsEditingValue, useSetIsEditing } from '@/context/chat/is-editing-context'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

import ChatItemButton from './item/chat-item-button'
import ChatItemContent from './item/chat-item-content'
import ChatItemDeleteDialog from './item/chat-item-delete-dialog'
import ChatItemEditForm from './item/chat-item-edit-form'
import ChatItemNameTimestamp from './item/chat-item-name-timestamp'
import ChatItemProfilePhoto from './item/chat-item-profile-photo'

interface ChatItemBasic {
  userId: string,
  currentRole: MemberRole
}

interface ChatItemMessage extends ChatItemBasic {
  type: 'channel'
  message: MessageWithUser
}

interface ChatItemDirectMessage extends ChatItemBasic {
  type: 'direct-message'
  message: DirectMessageWithUser
}

type ChatItemProps = ChatItemMessage | ChatItemDirectMessage

const ChatItem = ({
  type,
  message,
  userId,
  currentRole,
}: ChatItemProps) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const isEditing = useIsEditingValue()
  const setIsEditing = useSetIsEditing()

  const messageOwner = message.userId === userId
  const canDeleteMessage = (messageOwner || (currentRole !== MemberRole.GUEST))
  const canEditMessage = messageOwner

  return (
    <div className="relative group hover:bg-chat-hover dark:hover:bg-chat-hover-dark p-4 transition w-full
    grid grid-cols-[40px_1fr] grid-flow-row gap-x-4"
    >
      <ChatItemProfilePhoto message={message} />
      <ChatItemNameTimestamp message={message} />
      <p className="text-[15px] leading-[1.375rem] whitespace-break-spaces" style={{ wordBreak: 'break-word' }}>
        {isEditing !== message.id
          ? <ChatItemContent message={message} />
          : (
            <ChatItemEditForm
              message={message}
              setIsEditing={setIsEditing}
              editAction={(values) => {
                if (type === 'channel') {
                  return editMessage(
                    values,
                    message.channelId,
                    message.serverId,
                    message.memberId,
                    message.id,
                  )
                }
                return editDirectMessage(
                  values,
                  message.receiverId,
                  message.id,
                )
              }}
            />
          )}
      </p>
      <ChatItemButton
        messageId={message.id}
        setIsEditing={setIsEditing}
        setIsDeleting={setIsDeleting}
        canDeleteMessage={canDeleteMessage}
        canEditMessage={canEditMessage}
        deleteAction={() => {
          if (type === 'channel') {
            deleteMessage(message.id)
          } else {
            deleteDirectMessage(message.id)
          }
          setIsDeleting(false)
        }}
      />
      <ChatItemDeleteDialog
        message={message}
        open={isDeleting}
        close={() => setIsDeleting(false)}
        deleteAction={() => {
          if (type === 'channel') {
            deleteMessage(message.id)
          } else {
            deleteDirectMessage(message.id)
          }
          setIsDeleting(false)
        }}
      />
    </div>
  )
}

export default ChatItem
