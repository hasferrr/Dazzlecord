import UserPopover from '@/components/user/user-popover'
import { formatDate } from '@/lib/helpers'
import { cn } from '@/lib/utils'
import type { MessageWithUser } from '@/types'

interface ChatItemNameTimestampProps {
  message: MessageWithUser
  className?: string
}

const ChatItemNameTimestamp = ({
  message,
  className,
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
    <div className={cn(className, 'pt-1')}>
      {formatDate(message.createdAt)}
    </div>
  </div>
)

export default ChatItemNameTimestamp
