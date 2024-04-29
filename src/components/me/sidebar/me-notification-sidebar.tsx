import { CircleCheck, CircleX } from 'lucide-react'
import { redirect } from 'next/navigation'

import { acceptFriends } from '@/actions/friend/accept-friends'
import { declineFriends } from '@/actions/friend/decline-friends'
import { getFriends } from '@/actions/friend/get-friends'
import { auth } from '@/auth'
import ActionTooltip from '@/components/action-tooltip'
import MemberItem from '@/components/member-item'
import Section from '@/components/section'
import { ScrollArea } from '@/components/ui/scroll-area'
import UserPopover from '@/components/user/user-popover'

const MeNotificationSidebar = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const friends = await getFriends()
  const pendingFriendRequest = friends?.pendingFriends.filter(
    (friend) => friend.userRequest.id !== userId,
  ) || []

  return (
    <div className="flex flex-col gap-2
    h-full w-60 text-primary p-4
    bg-server dark:bg-server-dark"
    >
      <ScrollArea>
        <div className="w-full flex flex-col gap-y-4">
          {pendingFriendRequest.length
            ? <Section title="Friend Request" />
            : (
              <div className="text-center space-y-4 pt-4">
                <p className="text-xs uppercase font-bold">
                  It&apos;s quiet for now...
                </p>
                <p className="text-xs opacity-80">
                  When a friend starts an activity—like playing a game or
                  hanging out on voice—we&apos;ll show it here!
                </p>
              </div>
            )}
          {pendingFriendRequest
            .map((friend) => (
              <div key={friend.id} className="flex gap-x-3 items-center">
                <UserPopover user={friend.userRequest} side="left">
                  <MemberItem
                    name={friend.userRequest.name}
                    image={friend.userRequest.image}
                    about={friend.userRequest.about}
                    className="w-full"
                  />
                </UserPopover>
                <ActionTooltip side="top" label="Accept friends">
                  <form action={acceptFriends}>
                    <input name="userRequestId" type="hidden" value={friend.userRequestId} required />
                    <button type="submit">
                      <CircleCheck size={27} />
                    </button>
                  </form>
                </ActionTooltip>
                <ActionTooltip side="top" label="Decline">
                  <form action={declineFriends}>
                    <input name="userRequestId" type="hidden" value={friend.userRequestId} required />
                    <button type="submit">
                      <CircleX size={27} />
                    </button>
                  </form>
                </ActionTooltip>
              </div>
            ))}
        </div>
      </ScrollArea>
    </div>
  )
}

export default MeNotificationSidebar
