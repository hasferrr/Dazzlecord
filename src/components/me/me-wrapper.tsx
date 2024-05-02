import { redirect } from 'next/navigation'

import { getFriends } from '@/actions/friend/get-friends'
import { auth } from '@/auth'

import MeAddFriend from './friends/me-add-friend'
import MeFriends from './friends/me-friends'

const MeWrapper = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const friends = await getFriends()

  return (
    <div className="p-6 space-y-6 overflow-y-auto">
      <MeAddFriend />
      <MeFriends userId={userId} friends={friends} />
    </div>
  )
}

export default MeWrapper
