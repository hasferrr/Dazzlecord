import { MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getAllMembersByServerIdSorted } from '@/actions/prisma/member'
import { auth } from '@/auth'
import MemberItem from '@/components/member-item'
import { ScrollArea } from '@/components/ui/scroll-area'
import MemberButton from '@/components/user/button/member-button'
import UserPopover from '@/components/user/user-popover'
import type { MemberWithUser } from '@/types'

import MemberSection from './member-section'

const MemberSidebar = async ({ serverId }: {
  serverId: string
}) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const members = await getAllMembersByServerIdSorted(serverId)
  if (!members) {
    return redirect('/')
  }

  const owners: JSX.Element[] = []
  const admins: JSX.Element[] = []
  const moderators: JSX.Element[] = []
  const guests: JSX.Element[] = []

  const memberList = (m: MemberWithUser) => (
    <UserPopover
      key={m.id}
      user={m.user}
      side="left"
      buttonNode={userId !== m.user.id ? <MemberButton userId={m.user.id} /> : null}
    >
      <MemberItem
        key={m.id}
        name={m.user.name}
        image={m.user.image}
        about={m.user.about}
        className="w-full p-2"
      />
    </UserPopover>
  )

  members.forEach((member) => {
    if (member.role === MemberRole.OWNER) {
      owners.push(memberList(member))
    } else if (member.role === MemberRole.ADMIN) {
      admins.push(memberList(member))
    } else if (member.role === MemberRole.MODERATOR) {
      moderators.push(memberList(member))
    } else {
      guests.push(memberList(member))
    }
  })

  return (
    <div className="flex flex-col gap-2
      h-full w-60 text-primary py-2
      bg-[var(--light-server)] dark:bg-[var(--dark-server)]"
    >
      <ScrollArea className="w-full px-4 flex flex-col gap-y-4">
        {owners.length > 0
          && (
            <div className="mb-2">
              <MemberSection title="owners" />
              <div className="flex flex-col">
                {owners}
              </div>
            </div>
          )}
        {admins.length > 0
          && (
            <div className="mb-2">
              <MemberSection title="admins" />
              <div className="flex flex-col">
                {admins}
              </div>
            </div>
          )}
        {moderators.length > 0
          && (
            <div className="mb-2">
              <MemberSection title="moderators" />
              <div className="flex flex-col">
                {moderators}
              </div>
            </div>
          )}
        {guests.length > 0
          && (
            <div className="mb-2">
              <MemberSection title="members" />
              <div className="flex flex-col">
                {guests}
              </div>
            </div>
          )}
      </ScrollArea>
    </div>
  )
}

export default MemberSidebar
