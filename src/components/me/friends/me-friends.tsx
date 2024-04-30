import { redirect } from 'next/navigation'

import { getFriends } from '@/actions/friend/get-friends'
import { auth } from '@/auth'
import MemberItem from '@/components/member-item'
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
      <div className="space-y-1">
        <Section title={`Friends - ${friends ? friends.acceptedFriends.length : 0}`} />
        {friends?.acceptedFriends.map((friend) => {
          const user = friend.userRequest.id !== userId
            ? friend.userRequest
            : friend.userAccept
          return (
            <MemberItem
              key={friend.id}
              name={user.name}
              image={user.image}
              about={user.about}
              className="w-full p-2"
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
            <MemberItem
              key={friend.id}
              name={user.name}
              image={user.image}
              about={user.about}
              className="w-full p-2"
            />
          )
        })}
      </div>
    </div>
  )
}

export default MeFriends
