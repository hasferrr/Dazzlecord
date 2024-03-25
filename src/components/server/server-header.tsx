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
import type { Session } from 'next-auth'

import ChannelModal from '@/components/modals/channel-modal'
import DeleteServerModal from '@/components/modals/delete-server-modal'
import InvitationModal from '@/components/modals/invitation-modal'
import LeaveServerModal from '@/components/modals/leave-server-modal'
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
} from '@/context/modalContext'

const ServerHeader = ({
  server,
  currentMember,
  origin,
  session,
}: {
  server: Server,
  currentMember: Member,
  origin: string,
  session: Session
}) => {
  const openInvite = useInviteOpen()
  const openDeleteServer = useDeleteServerOpen()
  const openLeaveServer = useLeaveServerOpen()
  const openCreateChannel = useCreateChannelOpen()

  const role = currentMember.role
  const isOwner = role === MemberRole.OWNER
  const isAdmin = role === MemberRole.ADMIN

  const style = 'px-[8px] py-[6px] text-sm cursor-pointer flex gap-8'
  const blueStyle = `${style} text-indigo-600 dark:text-indigo-400`
  const redStyle = `${style} text-red-600 dark:text-red-400`
  const iconStyle = 'h-4 w-4 ml-auto'

  return (
    <div>
      <InvitationModal origin={origin} inviteCode={server.inviteCode} />
      <DeleteServerModal server={server} currentUserId={session.user.id} />
      <LeaveServerModal server={server} userId={session.user.id} />
      <ChannelModal serverId={server.id} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="focus:outline-none">
          <button className="
          w-full h-12 py-3 px-4 overflow-hidden
          flex items-center text-left align-bottom
          text-md font-semibold border-b-[1.5px] transition
          bg-[--var(--light-server)] dark:bg-[--var(--dark-server)]
          hover:[--var(--light-server-hover)] dark:hover:bg-[--var(--dark-server-hover)]
          ">
            <p className="line-clamp-1">{server.name}</p>
            <ChevronDown className="h-5 w-5 ml-auto" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="px-[6px] py-[8px] w-56">
          {(isOwner || isAdmin) && (
            <>
              <DropdownMenuItem className={blueStyle} onClick={openInvite}>
                Invite People
                <UserPlus className={iconStyle} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {(isOwner || isAdmin) && (
            <DropdownMenuItem className={style}>
              Server Settings
              <Settings className={iconStyle} />
            </DropdownMenuItem>
          )}
          {(isOwner || isAdmin) && (
            <DropdownMenuItem className={style}>
              Manage Members
              <Users className={iconStyle} />
            </DropdownMenuItem>
          )}
          {(isOwner || isAdmin) && (
            <>
              <DropdownMenuItem className={style} onClick={openCreateChannel}>
                Create Channel
                <PlusCircle className={iconStyle} />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
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
