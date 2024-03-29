import { Menu, Users } from 'lucide-react'

import MemberSidebar from '@/components/member/member-sidebar'
import NavigationSidebar from '@/components/navigation/navigation-sidebar'
import ServerSidebar from '@/components/server/server-sidebar'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

export const MobileToggle = ({
  serverId,
  type = 'server',
  side = 'left',
}: {
  serverId?: string
  type?: 'server' | 'members'
  side?: 'left' | 'right'
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          {type === 'server'
            ? <Menu />
            : <Users />
          }
        </Button>
      </SheetTrigger>
      <SheetContent side={side} xbutton={false} className="flex p-0 gap-0 w-fit" >
        {type === 'server'
          ? <>
            <NavigationSidebar />
            {serverId && <ServerSidebar serverId={serverId} />}
          </>
          : <>
            {serverId && <MemberSidebar serverId={serverId} />}
          </>
        }
      </SheetContent>
    </Sheet>
  )
}
