import { Menu, Users } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet'

interface MobileToggleProps {
  children: React.ReactNode
  side?: 'left' | 'right'
  buttonVariant?: 'menu' | 'users'
}

const MobileToggleV2 = ({
  children,
  side = 'left',
  buttonVariant = 'menu',
}: MobileToggleProps) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="ghost" size="icon">
        {buttonVariant === 'menu'
          ? <Menu />
          : <Users />}
      </Button>
    </SheetTrigger>
    <SheetContent side={side} xbutton={false} className="flex p-0 gap-0 w-fit">
      {children}
    </SheetContent>
  </Sheet>
)

export default MobileToggleV2
