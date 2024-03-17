import { ScrollArea } from '@/components/ui/scroll-area'
import { getServerByUserIdIncludesAll } from '@/services/server'

import ServerHeader from './server-header'

const ServerSidebar = async ({ serverId }: { serverId: string }) => {
  const server = await getServerByUserIdIncludesAll(serverId)

  return (
    <div className="flex flex-col items-center gap-2
    h-full w-60 text-primary py-3
    bg-[var(--light-server)]
    dark:bg-[var(--dark-server)]">
      <ServerHeader />
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
