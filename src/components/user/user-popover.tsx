import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import type { UserNoEmailNoPwd } from '@/types'

import UserWrapper from './user-wrapper'

interface UserPopoverProps {
  children: React.ReactNode
  user: UserNoEmailNoPwd
  side?: 'right' | 'top' | 'bottom' | 'left'
  className?: string
  showButton?: boolean
}

const UserPopover = ({
  children,
  user,
  side,
  className,
  showButton = false,
}: UserPopoverProps) => (
  <Popover>
    <PopoverTrigger asChild>
      {children}
    </PopoverTrigger>
    <PopoverContent
      side={side}
      className={cn('border-0 w-[340px] rounded-lg p-0 m-0 bg-server dark:bg-server-dark', className)}
    >
      <UserWrapper user={user} showButton={showButton} />
    </PopoverContent>
  </Popover>
)

export default UserPopover
