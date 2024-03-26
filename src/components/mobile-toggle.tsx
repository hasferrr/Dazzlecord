import { Menu } from 'lucide-react'

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
}: {
  serverId: string
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" xbutton={false} className="flex p-0 gap-0 w-fit" >
        <NavigationSidebar />
        {serverId && <ServerSidebar serverId={serverId} />}
      </SheetContent>
    </Sheet>
  )
}
