import { MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { getAllMembersByServerIdSorted } from '@/actions/prisma/member'
import { getServerIncludesAllChannel } from '@/actions/prisma/server'
import { auth } from '@/auth'
import BigScreen from '@/components/media-query/big-screen'
import CreateChannelModal from '@/components/modals/channel/create-channel-modal'
import InvitationModal from '@/components/modals/invitation-modal'
import CreateServerModal from '@/components/modals/server/create-server-modal'
import DeleteServerModal from '@/components/modals/server/delete-server-modal'
import LeaveServerModal from '@/components/modals/server/leave-server-modal'
import ServerSidebar from '@/components/server/server-sidebar'
import ServerSettings from '@/components/settings/server/server-settings'
import { db } from '@/lib/db'
import { ORIGIN_URL } from '@/utils/config'

const ServerIdLayout = async ({ children, params }: {
  children: React.ReactNode
  params: { serverId: string }
}) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const server = await getServerIncludesAllChannel(params.serverId)
  if (!server) {
    return redirect('/')
  }

  const currentMember = await db.member.findFirst({
    where: {
      serverId: params.serverId,
      userId,
    },
  })
  if (!currentMember) {
    return redirect('/')
  }

  const members = await getAllMembersByServerIdSorted(params.serverId)
  if (!members) {
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
      {currentMember.role === MemberRole.OWNER &&
        <DeleteServerModal server={server} />}
      <CreateChannelModal serverId={server.id} />
      {currentMember.role !== MemberRole.GUEST &&
        <ServerSettings
          server={server}
          currentMember={currentMember}
          serverMembers={members}
        />}
    </>
  )
}

export default ServerIdLayout
