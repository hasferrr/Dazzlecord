import type { MessageWithUser } from '@/types'

interface ChatItemContentProps {
  message: MessageWithUser
  className?: string
}

const ChatItemContent = ({
  message,
  className,
}: ChatItemContentProps) => (
  <>
    {message.content}
    {message.isUpdated && (
      <span className={className}>
        (edited)
      </span>
    )}
  </>
)

export default ChatItemContent
