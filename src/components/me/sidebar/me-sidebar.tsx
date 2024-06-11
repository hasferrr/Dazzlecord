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

  const conversations = await db.conversation.findMany({
    where: {
      OR: [
        {
          userId1: userId,
        },
        {
          userId2: userId,
        },
      ],
      directMessages: {
        some: {},
      },
    },
    include: {
      user1: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
      user2: {
        omit: {
          passwordHash: true,
          email: true,
        },
      },
    },
    orderBy: {
      updatedAt: 'asc',
    },
  })

  const recentDMUsers = conversations.map((conversation) => (
    conversation.user1.id === userId
      ? conversation.user2
      : conversation.user1
  ))

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
