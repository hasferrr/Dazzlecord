import type { User } from '@prisma/client'
import { LogOut } from 'lucide-react'

import LogOutButtonWrapper from '@/components/log-out-button-wrapper'
import { Separator } from '@/components/ui/separator'
import { formatDateMinimal } from '@/lib/helpers'
import { cn } from '@/lib/utils'

interface UserInformationProps {
  children?: React.ReactNode
  user: User
  showButton: boolean
}

const UserInformation = ({
  children,
  user,
  showButton,
}: UserInformationProps) => (
  <div className="break-words text-[13px] w-[308px] p-3 bg-text dark:bg-text-dark rounded-lg space-y-3">
    <div>
      <p className="text-base font-bold">{user.name}</p>
      <p>{user.username}</p>
    </div>
    <Separator />
    <div>
      <h2 className="font-bold uppercase">About me</h2>
      <p className="whitespace-break-spaces max-h-[215px] overflow-auto thin-scrollbar">
        {user.about}
      </p>
    </div>
    <div>
      <h2 className="font-bold uppercase">Deezcord Member since</h2>
      <p>{formatDateMinimal(user.createdAt)}</p>
    </div>
    <div className={cn(!showButton && 'hidden', 'space-y-2')}>
      <Separator />
      <button className="flex items-center gap-2 hover:bg-server-hover dark:hover:bg-server-hover-dark w-full p-[6px] rounded-sm transition-all">
        <div className="bg-green-500 rounded-full w-3 h-3" />
        <div>Online</div>
      </button>
      <Separator />
      <LogOutButtonWrapper
        className="flex items-center gap-2 hover:bg-red-500 hover:text-white w-full p-[6px] rounded-sm transition-all"
      >
        <LogOut size={18} />
        <div>Log Out</div>
      </LogOutButtonWrapper>
    </div>
    {children}
  </div>
)

export default UserInformation
