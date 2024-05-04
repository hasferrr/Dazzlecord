import UserPopover from '@/components/user/user-popover'
import { formatDate } from '@/helpers/date-helpers'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

interface ChatItemNameTimestampProps {
  message: MessageWithUser | DirectMessageWithUser
}

const ChatItemNameTimestamp = ({
  message,
}: ChatItemNameTimestampProps) => (
  <div className="flex items-center">
    <UserPopover
      user={message.user}
      side="right"
    >
      <div className="max-w-[280px] truncate hover:underline cursor-pointer">
        {message.user.name}
      </div>
    </UserPopover>
    <div>{' '}</div>
    <div className="text-xs mx-1 text-zinc-500 dark:text-zinc-400 pt-1">
      {formatDate(message.createdAt)}
    </div>
  </div>
)

export default ChatItemNameTimestamp
