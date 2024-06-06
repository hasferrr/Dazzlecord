'use client'

import { Separator } from '@/components/ui/separator'
import { formatDateMinimal } from '@/helpers/date-helpers'
import type { UserNoEmailNoPwd } from '@/types'

interface UserInformationProps {
  children?: React.ReactNode
  user: UserNoEmailNoPwd
  buttonNode?: React.ReactNode
}

const UserInformation = ({
  children,
  user,
  buttonNode,
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
    {buttonNode && <div className="space-y-2">{buttonNode}</div>}
    {children}
  </div>
)

export default UserInformation
