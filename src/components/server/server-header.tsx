'use client'

import { type Member, MemberRole, type Server } from '@prisma/client'
import {
  ChevronDown,
  LogOut,
  PlusCircle,
  Settings,
  Trash,
  UserPlus,
  Users,
} from 'lucide-react'

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  useCreateChannelOpen,
  useDeleteServerOpen,
  useInviteOpen,
  useLeaveServerOpen,
} from '@/context/modal-context'
import { useOpenManageMember, useOpenServerSettingsPage } from '@/context/settings/server-settings'

const ServerHeader = ({
  server,
  currentMember,
}: {
  server: Server,
  currentMember: Member,
}) => {
  const openInvite = useInviteOpen()
  const openDeleteServer = useDeleteServerOpen()
  const openLeaveServer = useLeaveServerOpen()
  const openCreateChannel = useCreateChannelOpen()
  const openServerSettingsPage = useOpenServerSettingsPage()
  const openManageMember = useOpenManageMember()

  const { role } = currentMember
  const isOwner = role === MemberRole.OWNER
  const isModerator = role === MemberRole.MODERATOR
  const isGuest = role === MemberRole.GUEST

  const style = 'px-[8px] py-[6px] text-sm cursor-pointer flex gap-8'
  const blueStyle = `${style} text-indigo-600 dark:text-indigo-400`
  const redStyle = `${style} text-red-600 dark:text-red-400`
  const iconStyle = 'h-4 w-4 ml-auto'

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:outline-none">
          <button className="
          w-full h-12 py-3 px-4 overflow-hidden
          flex items-center text-left align-bottom
          text-md font-semibold border-b-[1.5px] transition
          bg-[--var(--light-server)] dark:bg-[--var(--dark-server)]
          hover:[--var(--light-server-hover)] dark:hover:bg-[--var(--dark-server-hover)]
          "
          >
            <p className="line-clamp-1">{server.name}</p>
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-[6px] py-[8px] w-56">
          {!isGuest && (
            <>
              <DropdownMenuItem className={blueStyle} onClick={openInvite}>
                Invite People
                <UserPlus className={iconStyle} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {!isModerator && !isGuest && (
            <DropdownMenuItem className={style} onClick={openServerSettingsPage}>
              Server Settings
              <Settings className={iconStyle} />
            </DropdownMenuItem>
          )}
          {!isGuest && (
            <DropdownMenuItem className={style} onClick={openManageMember}>
              Manage Members
              <Users className={iconStyle} />
            </DropdownMenuItem>
          )}
          {!isModerator && !isGuest && (
            <DropdownMenuItem className={style} onClick={openCreateChannel}>
              Create Channel
              <PlusCircle className={iconStyle} />
            </DropdownMenuItem>
          )}
          {!isGuest && <DropdownMenuSeparator />}
          {isOwner && (
            <DropdownMenuItem className={redStyle} onClick={openDeleteServer}>
              Delete Server
              <Trash className={iconStyle} />
            </DropdownMenuItem>
          )}
          {!isOwner && (
            <DropdownMenuItem className={redStyle} onClick={openLeaveServer}>
              Leave Server
              <LogOut className={iconStyle} />
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default ServerHeader
