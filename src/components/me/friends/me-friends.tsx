'use client'

import { useEffect, useState } from 'react'

import { useSession } from 'next-auth/react'

import { getFriends } from '@/actions/friend/get-friends'
import Section from '@/components/section'
import type { FriendWithBothUsers } from '@/types'

interface Friends {
  acceptedFriends: FriendWithBothUsers[]
  pendingFriends: FriendWithBothUsers[]
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
            {friend.userRequest.id !== session?.user.id
              ? friend.userRequest.username
              : friend.userAccept.username}
          </div>
        ))}
      </div>
      <div>
        <Section title={`Pending - ${friends ? friends.pendingFriends.length : 0}`} />
        {friends?.pendingFriends.map((friend) => (
          <div key={friend.id}>
            {friend.userRequest.id !== session?.user.id
              ? friend.userRequest.username
              : friend.userAccept.username}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeFriends
