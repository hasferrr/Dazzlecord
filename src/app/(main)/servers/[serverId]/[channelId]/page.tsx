import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import BigScreen from '@/components/media-query/big-screen'
import MemberSidebar from '@/components/member/member-sidebar'
import { db } from '@/lib/db'

interface ChannelIdPageProps {
  params: {
    serverId: string;
    channelId: string;
  }
}

const ChannelIdPage = async ({
  params,
}: ChannelIdPageProps) => {
  const session = await auth()
  if (!session) {
    throw Error('Unauthorized')
  }
  const userId = session.user.id

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
  })

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId,
    },
  })

  if (!channel || !member) {
    redirect('/')
  }

  return (
    <div className="bg-white dark:bg-[var(--dark-page)] h-full w-full
    grid grid-cols-[1fr_auto] grid-rows-[3rem_auto]">
      <div className="col-span-2 h-12">
        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          channelType={channel.type}
        />
      </div>
      <div>
        Hello Chat!
      </div>
      <BigScreen>
        <MemberSidebar />
      </BigScreen>
    </div>
  )
}

export default ChannelIdPage
