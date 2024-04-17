import { redirect } from 'next/navigation'

import { getAllServersByUserId } from '@/actions/prisma/server'
import { auth } from '@/auth'
import CreateServerModal from '@/components/modals/server/create-server-modal'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

import NavigationAction from './navigation-action'
import NavigationHome from './navigation-home'
import NavigationItem from './navigation-item'

const NavigationSidebar = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const servers = await getAllServersByUserId(session.user.id)

  return (
    <div className="flex flex-col items-center gap-2
    h-full w-[4.5rem] text-primary py-3
    bg-[var(--light-navigation)]
    dark:bg-[var(--dark-navigation)]">
      <CreateServerModal />
      <NavigationHome />
      <Separator className="h-[2px] w-8 rounded-md mx-auto bg-zinc-300 dark:bg-[var(--dark-page)]" />
      <ScrollArea className="w-full">
        {servers.map((server) =>
          <div key={server.id} className="flex justify-center mb-2">
            <NavigationItem
              id={server.id}
              name={server.name}
              image={server.image}
            />
          </div>
        )}
        <div className="flex justify-center">
          <NavigationAction />
        </div>
      </ScrollArea>
    </div>
  )
}

export default NavigationSidebar
