import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import UserDirectMessage from '@/components/me/user-direct-message'
import Section from '@/components/section'
import ServerFooter from '@/components/server/server-footer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { db } from '@/lib/db'

import MeHeader from './me-header'

const MeSidebar = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const user = await db.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      directMessages: {
        where: {
          OR: [
            { userId },
            { receiverId: userId },
          ],
        },
        include: {
          user: true,
          receiver: true,
        },
      },
      receiverDirectMessages: {
        where: {
          OR: [
            { userId },
            { receiverId: userId },
          ],
        },
        include: {
          user: true,
          receiver: true,
        },
      },
    },
  })
  const recentDMUsers = user?.directMessages?.map((dm) => (
    dm.user.id === userId
      ? dm.receiver
      : dm.user
  )).concat(
    user?.receiverDirectMessages?.map((dm) => (
      dm.user.id === userId
        ? dm.receiver
        : dm.user
    )),
  )

  return (
    <div className="flex flex-col gap-2 h-full w-60 text-primary bg-server dark:bg-server-dark">
      <MeHeader />
      <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
        <div>
          <Section title="Direct Messages" />
          <div className="flex flex-col gap-[2px]">
            {recentDMUsers?.map((user) => (
              <UserDirectMessage
                key={user.id}
                user={user}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
      <div className="grow" />
      <ServerFooter />
    </div>
  )
}

export default MeSidebar
