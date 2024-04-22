import { Button } from '@/components/ui/button'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

import UserInformation from './user-information'
import UserPhoto from './user-photo'

const UserWrapper = () => {
  return (
    <div>
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          className="relative w-[340px] max-h-[530px] rounded-lg p-0 m-0 bg-server dark:bg-server-dark"
        >
          <div className="absolute rounded-t-lg bg-[rgb(188,156,154)] h-[3.75rem] w-full" />
          <div className="p-4 m-0 space-y-3">
            <UserPhoto />
            <UserInformation />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}

export default UserWrapper
