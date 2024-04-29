import { redirect } from 'next/navigation'

import { getFriends } from '@/actions/friend/get-friends'
import { auth } from '@/auth'
import Section from '@/components/section'

const MeFriends = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const friends = await getFriends()

  return (
    <div className="space-y-4">
      <div>
        <Section title={`Friends - ${friends ? friends.acceptedFriends.length : 0}`} />
        {friends?.acceptedFriends.map((friend) => (
          <div key={friend.id}>
            {friend.userRequest.id !== userId
              ? friend.userRequest.username
              : friend.userAccept.username}
          </div>
        ))}
      </div>
      <div>
        <Section title={`Pending - ${friends ? friends.pendingFriends.length : 0}`} />
        {friends?.pendingFriends.map((friend) => (
          <div key={friend.id}>
            {friend.userRequest.id !== userId
              ? friend.userRequest.username
              : friend.userAccept.username}
          </div>
        ))}
      </div>
    </div>
  )
}

export default MeFriends
