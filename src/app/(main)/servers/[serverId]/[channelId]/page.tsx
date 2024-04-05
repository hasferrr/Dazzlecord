import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatMessages from '@/components/chat/chat-messages'
import ChatWelcome from '@/components/chat/chat-welcome'
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
    max-h-screen min-h-screen
    grid grid-cols-[1fr_auto] grid-rows-[3rem_1fr_auto]">
      <div className="col-span-2 h-12">
        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          channelType={channel.type}
        />
      </div>
      <div className="flex flex-col-reverse pt-4 overflow-y-auto">
        <div className="flex-1 flex flex-col justify-end">
          <ChatWelcome name={channel.name} />
          <ChatMessages
            channelId={params.channelId}
            currentMember={member}
          />
        </div>
      </div>
      <div className="row-span-2">
        <BigScreen width={992}>
          <MemberSidebar serverId={params.serverId} />
        </BigScreen>
      </div>
      <div className="px-5">
        <ChatInput
          channelName={channel.name}
          channelId={params.channelId}
        />
      </div>
    </div>
  )
}

export default ChannelIdPage
