import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { Separator } from '@/components/ui/separator'
import { getServersByUserId } from '@/services/server'

import NavigationAction from './navigation-action'

const NavigationSidebar = async () => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const servers = await getServersByUserId(session.user.id)

  return (
    <div className="space-y-4 flex flex-col items-center h-full w-[4.5rem] text-primary py-3
    bg-[var(--light-navigation)]
    dark:bg-[var(--dark-navigation)]">
      <NavigationAction />
      <Separator className="h-[2px] w-8 rounded-md mx-auto bg-[var(--light-page)] dark:bg-[var(--dark-page)]" />
      TODO:
      {servers.map((server) => {
        return <div key={server.id}>{JSON.stringify(server)}</div>
      })}
    </div>
  )
}

export default NavigationSidebar
