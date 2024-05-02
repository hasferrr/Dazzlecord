import { redirect } from 'next/navigation'

import { sendMessage } from '@/actions/message/send-message'
import { getServerWithAnyChannel } from '@/actions/prisma/server'
import { auth } from '@/auth'
import ChatHeader from '@/components/chat/chat-header'
import ChatInput from '@/components/chat/chat-input'
import ChatWrapper from '@/components/chat/chat-wrapper'
import BigScreen from '@/components/media-query/big-screen'
import MemberSidebar from '@/components/member/member-sidebar'
import DeleteChannelModal from '@/components/modals/channel/delete-channel-modal'
import EditChannelModal from '@/components/modals/channel/edit-channel-modal'
import ServerSidebar from '@/components/server/server-sidebar'
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

  const server = await getServerWithAnyChannel(params.serverId, userId)
  if (!server) {
    redirect('/')
  }

  const channel = server.channels.find((ch) => ch.id === params.channelId)
  if (!channel) {
    redirect('/')
  }

  const member = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId,
    },
  })
  if (!member) {
    redirect('/')
  }

  return (
    <div className="bg-page dark:bg-page-dark h-full w-full
    max-h-screen min-h-screen
    grid grid-cols-[1fr_auto] grid-rows-[3rem_1fr_auto]"
    >
      <div className="col-span-2 h-12">
        <ChatHeader
          title={channel.name}
          iconType={channel.type}
          left={<ServerSidebar server={server} />}
          right={<MemberSidebar serverId={params.serverId} />}
        />
      </div>
      <ChatWrapper
        type="channel"
        userId={userId}
        channelId={params.channelId}
        chatWelcomeName={channel.name}
        currentRole={member.role}
      />
      <div className="row-span-2">
        <BigScreen width={992}>
          <MemberSidebar serverId={params.serverId} />
        </BigScreen>
      </div>
      <div className="px-5">
        <ChatInput
          type="channel"
          channelName={channel.name}
          sendFn={async (values, file) => {
            'use server'

            return sendMessage(
              values,
              file,
              params.channelId,
              params.serverId,
              member.id,
            )
          }}
        />
      </div>
      <DeleteChannelModal channel={channel} />
      <EditChannelModal channel={channel} />
    </div>
  )
}

export default ChannelIdPage
