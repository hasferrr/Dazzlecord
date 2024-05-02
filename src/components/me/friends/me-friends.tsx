'use client'

import { useRouter } from 'next/navigation'

import MemberItem from '@/components/member-item'
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
}: MeFriendsProps) => {
  const router = useRouter()

  return (
    <div className="space-y-4">
      <div className="space-y-1">
        <Section title={`Friends - ${friends ? friends.acceptedFriends.length : 0}`} />
        {friends?.acceptedFriends.map((friend) => {
          const user = friend.userRequest.id !== userId
            ? friend.userRequest
            : friend.userAccept
          return (
            <button
              key={friend.id}
              onClick={() => router.push(`/channels/me/${user.id}`)}
              className="w-full"
            >
              <MemberItem
                name={user.name}
                image={user.image}
                about={user.about}
                className="w-full p-2"
              />
            </button>
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
            <button
              key={friend.id}
              onClick={() => router.push(`/channels/me/${user.id}`)}
              className="w-full"
            >
              <MemberItem
                name={user.name}
                image={user.image}
                about={user.about}
                className="w-full p-2"
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default MeFriends
