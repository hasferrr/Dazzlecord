import { MemberRole } from '@prisma/client'
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { findMember } from '@/services/member'
import { ServerWithMembersWithUsers } from '@/types/types'

const ServerHeader = async ({ server }: { server: ServerWithMembersWithUsers }) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }

  const currentMember = await findMember(server.id, session.user.id)
  if (!currentMember) {
    return redirect('/')
  }

  const role = currentMember.role
  const isAdmin = role === MemberRole.ADMIN
  const isModerator = role === MemberRole.MODERATOR

  const style = 'px-[8px] py-[6px] text-sm cursor-pointer flex gap-8'
  const blueStyle = `${style} text-indigo-600 dark:text-indigo-400`
  const redStyle = `${style} text-red-600 dark:text-red-400`
  const iconStyle = 'h-4 w-4 ml-auto'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus:outline-none">
        <button className="
        w-full h-12 py-3 px-4 overflow-hidden
        flex items-center text-left align-bottom
        text-md font-semibold border-b-1 shadow-md transition
        bg-[--var(--light-server)] dark:bg-[--var(--dark-server)]
        hover:[--var(--light-server-hover)] dark:hover:bg-[--var(--dark-server-hover)]
        ">
          {server.name}
          <ChevronDown className="h-5 w-5 ml-auto" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="px-[6px] py-[8px] w-56">
        {(isAdmin || isModerator) && (
          <>
            <DropdownMenuItem className={blueStyle}>
              Invite People
              <UserPlus className={iconStyle} />
            </DropdownMenuItem>
            <DropdownMenuSeparator />
          </>
        )}
        {(isAdmin || isModerator) && (
          <DropdownMenuItem className={style}>
            Server Settings
            <Settings className={iconStyle} />
          </DropdownMenuItem>
        )}
        {(isAdmin || isModerator) && (
          <DropdownMenuItem className={style}>
            Manage Members
            <Users className={iconStyle} />
          </DropdownMenuItem>
        )}
        {(isAdmin || isModerator) && (
          <DropdownMenuItem className={style}>
            Create Channel
            <PlusCircle className={iconStyle} />
          </DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {isAdmin && (
          <DropdownMenuItem className={redStyle}>
            Delete Server
            <Trash className={iconStyle} />
          </DropdownMenuItem>
        )}
        {!isAdmin && (
          <DropdownMenuItem className={redStyle}>
            Leave Server
            <LogOut className={iconStyle} />
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ServerHeader
