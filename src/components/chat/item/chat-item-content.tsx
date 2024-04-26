import type { MessageWithUser } from '@/types'

interface ChatItemContentProps {
  message: MessageWithUser
  editedStyle?: string
}

const ChatItemContent = ({
  message,
  editedStyle,
}: ChatItemContentProps) => (
  <>
    {message.content}
    {message.isUpdated && (
      <span className={editedStyle}>
        (edited)
      </span>
    )}
  </>
)

export default ChatItemContent
