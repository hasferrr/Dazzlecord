import { redirect } from 'next/navigation'

import { getUserById } from '@/actions/prisma/user'
import { auth } from '@/auth'
import { MemberItem } from '@/components/member-item'
import { ModeToggle } from '@/components/mode-toggle'
import UserWrapper from '@/components/user/user-wrapper'

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
    <div className="grid grid-cols-[1fr_auto] gap-2 h-[53px] w-full p-2
      bg-server-footer dark:bg-server-footer-dark">
      <UserWrapper user={user} side="top" className="ml-12">
        <MemberItem
          username={user.username}
          image={user.image}
          desc={user.about}
          className="px-1"
        />
      </UserWrapper>
      <ModeToggle />
    </div>
  )
}

export default ServerFooter
