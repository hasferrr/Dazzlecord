import { redirect } from 'next/navigation'

import { getUserById } from '@/actions/prisma/user'
import { auth } from '@/auth'
import MemberItem from '@/components/member-item'
import TriggerButton from '@/components/settings/user/trigger-button'
import UserPopover from '@/components/user/user-popover'

const ServerFooter = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const user = await getUserById(userId)
  if (!user) {
    return redirect('/')
  }

  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 h-[53px] w-full py-2 px-3 items-center
      bg-server-footer dark:bg-server-footer-dark"
    >
      <UserPopover user={user} side="top" className="ml-12" showButton>
        <MemberItem
          name={user.name}
          image={user.image}
          about={user.about}
          className="px-1"
        />
      </UserPopover>
      <TriggerButton />
    </div>
  )
}

export default ServerFooter
