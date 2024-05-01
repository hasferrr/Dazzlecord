import type { MemberRole } from '@prisma/client'

import ChatMessages from '@/components/chat/chat-messages'
import ProvidesTheQueryClient from '@/components/react-query/provides-the-query-client'

interface ChatWrapperProps {
  type: 'channel' | 'direct-message'
  userId: string
  channelId: string
  currentRole?: MemberRole
  chatWelcomeName?: string
}

const ChatWrapper = ({
  type,
  userId,
  channelId,
  currentRole,
  chatWelcomeName,
}: ChatWrapperProps) => (
  <div className="flex flex-col-reverse overflow-y-auto">
    <div className="flex-1 flex flex-col justify-end">
      <ProvidesTheQueryClient>
        <ChatMessages
          type={type}
          userId={userId}
          channelId={channelId}
          currentRole={currentRole}
          chatWelcomeName={chatWelcomeName}
        />
      </ProvidesTheQueryClient>
    </div>
  </div>
)

export default ChatWrapper
