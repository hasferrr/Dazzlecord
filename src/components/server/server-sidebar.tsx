import { redirect } from 'next/navigation'

import { ScrollArea } from '@/components/ui/scroll-area'
import { getServerByUserIdIncludesAll } from '@/services/server'

import ServerHeader from './server-header'

const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const server = await getServerByUserIdIncludesAll(serverId)
  if (!server) {
    return redirect('/')
  }

  return (
    <div className="flex flex-col gap-2
    h-full w-60 text-primary
    bg-[var(--light-server)]
    dark:bg-[var(--dark-server)]">
      <ServerHeader server={server} />
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
