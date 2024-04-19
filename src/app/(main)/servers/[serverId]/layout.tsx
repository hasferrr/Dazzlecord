import { redirect } from 'next/navigation'

import { getServerIncludesAllChannel } from '@/actions/prisma/server'
import BigScreen from '@/components/media-query/big-screen'
import CreateChannelModal from '@/components/modals/channel/create-channel-modal'
import InvitationModal from '@/components/modals/invitation-modal'
import CreateServerModal from '@/components/modals/server/create-server-modal'
import DeleteServerModal from '@/components/modals/server/delete-server-modal'
import LeaveServerModal from '@/components/modals/server/leave-server-modal'
import ServerSidebar from '@/components/server/server-sidebar'
import { ORIGIN_URL } from '@/utils/config'

const ServerIdLayout = async ({ children, params }: {
  children: React.ReactNode
  params: { serverId: string }
}) => {
  const server = await getServerIncludesAllChannel(params.serverId)
  if (!server) {
    return redirect('/')
  }

  return (
    <>
      <div className="flex-col h-full inset-y-0">
        <BigScreen>
          <ServerSidebar server={server} />
        </BigScreen>
      </div>
      {children}
      <CreateServerModal />
      <InvitationModal origin={ORIGIN_URL} inviteCode={server.inviteCode} />
      <LeaveServerModal server={server} />
      <DeleteServerModal server={server} />
      <CreateChannelModal serverId={server.id} />
    </>
  )
}

export default ServerIdLayout
