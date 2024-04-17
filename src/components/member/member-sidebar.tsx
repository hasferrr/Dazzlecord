import { type Member, MemberRole, type User } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getAllMembersByServerIdSorted } from '@/actions/prisma/member'
import { MemberItem } from '@/components/member-item'
import { ScrollArea } from '@/components/ui/scroll-area'

import MemberSection from './member-section'

const MemberSidebar = async ({ serverId }: { serverId: string }) => {
  const members = await getAllMembersByServerIdSorted(serverId)
  if (!members) {
    return redirect('/')
  }

  const owners: JSX.Element[] = []
  const admins: JSX.Element[] = []
  const guests: JSX.Element[] = []

  const memberList = (m: (Member & { user: User })) => (
    <MemberItem
      key={m.id}
      username={m.user.username}
      image={m.user.image}
      desc=""
      className="w-full p-2"
    />
  )

  members.forEach((member) => {
    if (member.role === MemberRole.OWNER) {
      owners.push(memberList(member))
    } else if (member.role === MemberRole.ADMIN) {
      admins.push(memberList(member))
    } else {
      guests.push(memberList(member))
    }
  })

  return (
    <div className="flex flex-col gap-2
      h-full w-60 text-primary py-2
      bg-[var(--light-server)] dark:bg-[var(--dark-server)]">
      <ScrollArea className="w-full px-4 flex flex-col gap-y-4">
        {owners.length > 0 &&
          <div className="mb-2">
            <MemberSection title="owners" />
            <div className="flex flex-col">
              {owners}
            </div>
          </div>
        }
        {admins.length > 0 &&
          <div className="mb-2">
            <MemberSection title="admins" />
            <div className="flex flex-col">
              {admins}
            </div>
          </div>
        }
        {guests.length > 0 &&
          <div className="mb-2">
            <MemberSection title="members" />
            <div className="flex flex-col">
              {guests}
            </div>
          </div>
        }
      </ScrollArea>
    </div>
  )
}

export default MemberSidebar
