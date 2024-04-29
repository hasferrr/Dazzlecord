'use client'

import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { getFriends } from '@/actions/friend/get-friends'
import Section from '@/components/section'
import type { FriendshipWithBothUsers } from '@/types'

interface Friends {
  acceptedFriends: FriendshipWithBothUsers[]
  pendingFriends: FriendshipWithBothUsers[]
}

const MeFriends = () => {
  const [friends, setFriends] = useState<Friends | null>(null)
  const { data: session } = useSession()

  useEffect(() => {
    getFriends().then((res) => {
      setFriends(res)
    })
  }, [])

  return (
    <div className="space-y-4">
      <div>
        <Section title={`Friends - ${friends ? friends.acceptedFriends.length : 0}`} />
        {friends?.acceptedFriends.map((friend) => (
          <div key={friend.id}>
            {friend.userAProfile.id !== session?.user.id
              ? friend.userAProfile.username
              : friend.userBProfile.username}
          </div>
        ))}
      </div>
      <div>
        <Section title={`Pending - ${friends ? friends.pendingFriends.length : 0}`} />
        {friends?.pendingFriends.map((friend) => (
          <div key={friend.id}>
            {friend.userAProfile.id !== session?.user.id
              ? friend.userAProfile.username
              : friend.userBProfile.username}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeFriends
