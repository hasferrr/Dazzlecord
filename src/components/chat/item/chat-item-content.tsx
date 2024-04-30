import type { MessageWithUser } from '@/types'

interface ChatItemContentProps {
  message: MessageWithUser
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
