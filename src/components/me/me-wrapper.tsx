import { redirect } from 'next/navigation'

import { getFriends } from '@/actions/friend/get-friends'
import { auth } from '@/auth'
import { ScrollArea } from '@/components/ui/scroll-area'

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
    <div className="p-6 space-y-6">
      <MeAddFriend />
      <ScrollArea>
        <MeFriends userId={userId} friends={friends} />
      </ScrollArea>
    </div>
  )
}

export default MeWrapper
