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
  buttonNode?: React.ReactNode
}

const UserPopover = ({
  children,
  user,
  side,
  className,
  buttonNode,
}: UserPopoverProps) => (
  <Popover>
    <PopoverTrigger asChild>
      {children}
    </PopoverTrigger>
    <PopoverContent
      side={side}
      className={cn('border-0 w-[340px] rounded-lg p-0 m-0 bg-server dark:bg-server-dark', className)}
    >
      <UserWrapper user={user} buttonNode={buttonNode} />
    </PopoverContent>
  </Popover>
)

export default UserPopover
