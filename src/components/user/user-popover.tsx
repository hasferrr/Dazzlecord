import type { User } from '@prisma/client'

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'

import UserWrapper from './user-wrapper'

interface UserPopoverProps {
  children: React.ReactNode
  user: User
  side?: 'right' | 'top' | 'bottom' | 'left'
  className?: string
}

const UserPopover = ({
  children,
  user,
  side,
  className,
}: UserPopoverProps) => (
  <Popover>
    <PopoverTrigger asChild>
      {children}
    </PopoverTrigger>
    <PopoverContent
      side={side}
      className={cn('border-0 w-[340px] rounded-lg p-0 m-0 bg-server dark:bg-server-dark', className)}
    >
      <UserWrapper user={user} />
    </PopoverContent>
  </Popover>
)

export default UserPopover
