import { ScrollArea } from '@/components/ui/scroll-area'

import MeAddFriend from './friends/me-add-friend'
import MeFriends from './friends/me-friends'

const MeWrapper = () => (
  <div className="p-6 space-y-6">
    <MeAddFriend />
    <ScrollArea>
      <MeFriends />
    </ScrollArea>
  </div>
)

export default MeWrapper
