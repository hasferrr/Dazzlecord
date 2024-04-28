import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatWrapper from '@/components/chat/chat-wrapper'
import BigScreen from '@/components/media-query/big-screen'
import MemberSidebar from '@/components/member/member-sidebar'
import DeleteChannelModal from '@/components/modals/channel/delete-channel-modal'
import EditChannelModal from '@/components/modals/channel/edit-channel-modal'
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
    return redirect('/')
  }
  const userId = session.user.id

  const channel = await db.channel.findUnique({
    where: {
      id: params.channelId,
    },
    include: {
      server: true,
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
    <div className="bg-page dark:bg-page-dark h-full w-full
    max-h-screen min-h-screen
    grid grid-cols-[1fr_auto] grid-rows-[3rem_1fr_auto]"
    >
      <div className="col-span-2 h-12">
        <ChatHeader
          name={channel.name}
          serverId={channel.serverId}
          channelType={channel.type}
        />
      </div>
      <ChatWrapper
        channelName={channel.name}
        channelId={params.channelId}
        currentMember={member}
      />
      <div className="row-span-2">
        <BigScreen width={992}>
          <MemberSidebar serverId={params.serverId} />
        </BigScreen>
      </div>
      <div className="px-5">
        <ChatInput
          channelName={channel.name}
          channelId={params.channelId}
          serverId={params.serverId}
          memberId={member.id}
        />
      </div>
      <DeleteChannelModal channel={channel} />
      <EditChannelModal channel={channel} />
    </div>
  )
}

export default ChannelIdPage
