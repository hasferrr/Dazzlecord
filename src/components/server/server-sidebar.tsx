import { ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { ScrollArea } from '@/components/ui/scroll-area'
import { findMember } from '@/services/member'
import { getServerByUserIdIncludesAll } from '@/services/server'
import { DEPLOYMENT_URL } from '@/utils/config'

import ServerChannel from './server-channel'
import ServerHeader from './server-header'
import ServerSection from './server-section'

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
        session={session}
      />
      <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
        {server.channels.length && (
          <div>
            <ServerSection
              role={currentMember.role}
              channelType={ChannelType.TEXT}
            />
            <div className="flex flex-col gap-[2px]">
              {server.channels.map((channel) => (
                <ServerChannel
                  key={channel.id}
                  role={currentMember.role}
                  channel={channel}
                />
              ))}
            </div>
          </div>
        )}
      </ScrollArea>
    </div>
  )
}

export default ServerSidebar
