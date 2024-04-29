'use client'

import { SessionProvider } from 'next-auth/react'

import MeAddFriend from './friends/me-add-friend'
import MeFriends from './friends/me-friends'
import { ScrollArea } from '../ui/scroll-area'

const MePage = () => (
  <div className="p-6 space-y-6">
    <MeAddFriend />
    <ScrollArea>
      <SessionProvider>
        <MeFriends />
      </SessionProvider>
    </ScrollArea>
  </div>
)

export default MePage
