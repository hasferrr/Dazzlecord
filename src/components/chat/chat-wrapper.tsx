import type { Member } from '@prisma/client'

import ChatMessages from '@/components/chat/chat-messages'
import ProvidesTheQueryClient from '@/components/react-query/provides-the-query-client'

const ChatWrapper = ({
  channelName,
  channelId,
  currentMember,
}: {
  channelName: string
  channelId: string
  currentMember: Member
}) => {
  return (
    <div className="flex flex-col-reverse overflow-y-auto">
      <div className="flex-1 flex flex-col justify-end">
        <ProvidesTheQueryClient>
          <ChatMessages
            channelId={channelId}
            channelName={channelName}
            currentMember={currentMember}
          />
        </ProvidesTheQueryClient>
      </div>
    </div>
  )
}

export default ChatWrapper
