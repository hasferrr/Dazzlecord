import UserDirectMessage from '@/components/me/user-direct-message'
import Section from '@/components/section'
import type { FriendWithBothUsers } from '@/types'

interface MeFriendsProps {
  userId: string
  friends: {
    acceptedFriends: FriendWithBothUsers[]
    pendingFriends: FriendWithBothUsers[]
  } | null
}

const MeFriends = ({
  userId,
  friends,
}: MeFriendsProps) => (
  <div className="space-y-4">
    <div className="space-y-1">
      <Section title={`Friends - ${friends ? friends.acceptedFriends.length : 0}`} />
      {friends?.acceptedFriends.map((friend) => {
        const user = friend.userRequest.id !== userId
          ? friend.userRequest
          : friend.userAccept
        return (
          <UserDirectMessage
            key={friend.id}
            user={user}
          />
        )
      })}
    </div>
    <div>
      <Section title={`Pending - ${friends ? friends.pendingFriends.length : 0}`} />
      {friends?.pendingFriends.map((friend) => {
        const user = friend.userRequest.id !== userId
          ? friend.userRequest
          : friend.userAccept
        return (
          <UserDirectMessage
            key={friend.id}
            user={user}
          />
        )
      })}
    </div>
  </div>
)

export default MeFriends
