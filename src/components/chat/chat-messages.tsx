import type { Member } from '@prisma/client'

import { getAllChannelMessage } from '@/actions/message/get-all-channel-messages'

import ChatItem from './chat-item'

const ChatMessages = async ({ channelId, member }: {
  channelId: string
  member: Member
}) => {
  //TODO: Implements react query to fetch messages
  const res = await getAllChannelMessage(channelId)
  if (res.error) {
    return null
  }

  const messages = res.data

  return (
    <div className="overflow-hidden">
      {messages?.map((message, i) => (
        <ChatItem
          key={i}
          message={message}
          currentUserId={member.userId}
          currentUserRole={member.role}
        />
      ))}
    </div>
  )
}

export default ChatMessages
