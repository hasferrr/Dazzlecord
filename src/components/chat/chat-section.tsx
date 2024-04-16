import type { Member } from '@prisma/client'

import ChatMessages from '@/components/chat/chat-messages'
import ChatWelcome from '@/components/chat/chat-welcome'
import ProvidesTheQueryClient from '@/components/react-query/provides-the-query-client'

const ChatSection = ({
  channelName,
  channelId,
  currentMember,
}: {
  channelName: string
  channelId: string
  currentMember: Member
}) => {
  return (
    <div className="flex flex-col-reverse pt-4 overflow-y-auto">
      <div className="flex-1 flex flex-col justify-end">
        <ChatWelcome name={channelName} />
        <ProvidesTheQueryClient>
          <ChatMessages
            channelId={channelId}
            currentMember={currentMember}
          />
        </ProvidesTheQueryClient>
      </div>
    </div>
  )
}

export default ChatSection
