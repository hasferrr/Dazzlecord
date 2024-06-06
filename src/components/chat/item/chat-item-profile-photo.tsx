'use client'

import ProfilePhoto from '@/components/profile-photo'
import MemberButton from '@/components/user/button/member-button'
import UserPopover from '@/components/user/user-popover'
import { getFileURLFromGCS } from '@/helpers/helpers'
import type { DirectMessageWithUser, MessageWithUser } from '@/types'

interface ChatItemProfilePhotoProps {
  message: MessageWithUser | DirectMessageWithUser
  userId?: string
}

const ChatItemProfilePhoto = ({
  userId,
  message,
}: ChatItemProfilePhotoProps) => (
  <div className="row-span-2 cursor-pointer">
    <UserPopover
      user={message.user}
      side="right"
      buttonNode={userId && userId !== message.user.id
        ? <MemberButton userId={message.user.id} />
        : null}
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
