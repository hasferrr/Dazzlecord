import type { DirectMessageWithUser, MessageWithUser } from '@/types'

interface ChatItemContentProps {
  message: MessageWithUser | DirectMessageWithUser
}

const ChatItemContent = ({
  message,
}: ChatItemContentProps) => (
  <>
    {message.content}
    {message.isUpdated && (
      <span className="text-[11px] mx-1 text-zinc-500 dark:text-zinc-400">
        (edited)
      </span>
    )}
  </>
)

export default ChatItemContent
