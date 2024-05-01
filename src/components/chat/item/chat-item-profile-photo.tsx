import ProfilePhoto from '@/components/profile-photo'
import UserPopover from '@/components/user/user-popover'
import { getFileURLFromGCS } from '@/lib/helpers'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

interface ChatItemProfilePhotoProps {
  message: MessageWithUser | DirectMessageWithUser
}

const ChatItemProfilePhoto = ({
  message,
}: ChatItemProfilePhotoProps) => (
  <div className="row-span-2 cursor-pointer">
    <UserPopover
      user={message.user}
      side="right"
    >
      <div>
        <ProfilePhoto
          username={message.user.username}
          src={message.user.image ? getFileURLFromGCS(message.user.image) : message.user.image}
          width={40}
          height={40}
        />
      </div>
    </UserPopover>
  </div>
)

export default ChatItemProfilePhoto
