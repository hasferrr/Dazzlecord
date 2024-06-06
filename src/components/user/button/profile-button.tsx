'use client'

import { LogOut } from 'lucide-react'

import LogOutButtonWrapper from '@/components/log-out-button-wrapper'
import { Separator } from '@/components/ui/separator'

const ProfileButton = () => (
  <>
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
  </>
)

export default ProfileButton
