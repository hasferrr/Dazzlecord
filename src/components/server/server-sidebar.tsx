import { type Channel, ChannelType } from '@prisma/client'
import { redirect } from 'next/navigation'

import { findMember } from '@/actions/prisma/member'
import { getServerByUserIdIncludesAll } from '@/actions/prisma/server'
import { auth } from '@/auth'
import { ScrollArea } from '@/components/ui/scroll-area'
import { DEPLOYMENT_URL } from '@/utils/config'

import ServerChannel from './server-channel'
import ServerFooter from './server-footer'
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

  const textChannel: JSX.Element[] = []
  const voiceChannel: JSX.Element[] = []
  const videoChannel: JSX.Element[] = []

  const serverChannel = (ch: Channel) => (
    <ServerChannel
      key={ch.id}
      role={currentMember.role}
      channel={ch}
    />
  )

  server.channels.forEach((channel) => {
    if (channel.type === ChannelType.TEXT) {
      textChannel.push(serverChannel(channel))
    } else if (channel.type === ChannelType.VOICE) {
      voiceChannel.push(serverChannel(channel))
    } else {
      videoChannel.push(serverChannel(channel))
    }
  })

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
      <ScrollArea className="w-full px-4 flex flex-col gap-y-2">
        {textChannel.length > 0 && (
          <div>
            <ServerSection
              role={currentMember.role}
              channelType={ChannelType.TEXT}
            />
            <div className="flex flex-col gap-[2px]">
              {textChannel}
            </div>
          </div>
        )}
        {voiceChannel.length > 0 && (
          <div>
            <ServerSection
              role={currentMember.role}
              channelType={ChannelType.VOICE}
            />
            <div className="flex flex-col gap-[2px]">
              {voiceChannel}
            </div>
          </div>
        )}
        {videoChannel.length > 0 && (
          <div>
            <ServerSection
              role={currentMember.role}
              channelType={ChannelType.VIDEO}
            />
            <div className="flex flex-col gap-[2px]">
              {videoChannel}
            </div>
          </div>
        )}
      </ScrollArea>
      <div className="grow" />
      <ServerFooter
        username={session.user.username}
        desc={currentMember.role}
        image={session.user.image}
      />
    </div>
  )
}

export default ServerSidebar
