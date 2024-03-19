import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { ScrollArea } from '@/components/ui/scroll-area'
import { findMember } from '@/services/member'
import { getServerByUserIdIncludesAll } from '@/services/server'
import { DEPLOYMENT_URL } from '@/utils/config'

import ServerHeader from './server-header'

const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }

  const server = await getServerByUserIdIncludesAll(serverId)
  if (!server) {
    return redirect('/')
  }

  const currentMember = await findMember(server.id, session.user.id)
  if (!currentMember) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col gap-2
    h-full w-60 text-primary
    bg-[var(--light-server)]
    dark:bg-[var(--dark-server)]">
      <ServerHeader
        server={server}
        currentMember={currentMember}
        origin={DEPLOYMENT_URL}
      />
      TODO:
      <ScrollArea className="w-full">
        {server?.channels.map((channel) =>
          <div key={channel.id} className="w-20">
            {JSON.stringify(channel)}
          </div>)
        }
      </ScrollArea>
    </div>
  )
}

export default ServerSidebar
