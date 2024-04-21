'use client'

import { type Member, MemberRole } from '@prisma/client'
import { useRouter } from 'next/navigation'

import { changeRole } from '@/actions/member/change-role'
import { MemberItem } from '@/components/member-item'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { yearDifferenceYearFromNow } from '@/lib/helpers'
import type { MemberWithUser } from '@/types'

interface MembersProps {
  members: MemberWithUser[]
  currentMember: Member
}

const {
  OWNER,
  ADMIN,
  MODERATOR,
  GUEST,
} = MemberRole

const Members = ({
  members,
  currentMember,
}: MembersProps) => {
  const router = useRouter()

  const currentRole = currentMember.role

  const handleChangeRole = async (member: Member, newRole: MemberRole) => {
    if (newRole === member.role) {
      console.log('failed to update: want to update the same role?')
      return null
    }
    const updatedRole = await changeRole(member, newRole, currentMember.id)
    if (!updatedRole) {
      console.log('failed to update')
      return
    }
    console.log('role updated')
    router.refresh()
  }

  const owners: JSX.Element[] = []
  const admins: JSX.Element[] = []
  const moderators: JSX.Element[] = []
  const guests: JSX.Element[] = []

  const makeTableRow = (member: MemberWithUser) => (
    <TableRow>
      <TableCell>
        <MemberItem
          username={member.user.username}
          image={member.user.image}
        />
      </TableCell>
      <TableCell>{yearDifferenceYearFromNow(member.createdAt)}</TableCell>
      <TableCell>
        {currentMember.userId === member.userId || currentRole === MODERATOR
          ? <div className="hover:cursor-not-allowed">
            {member.role}
          </div>
          : <DropdownMenu>
            <DropdownMenuTrigger className="hover:underline">
              {member.role}
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Change Role</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {currentRole === OWNER &&
                <DropdownMenuItem onClick={() => handleChangeRole(member, OWNER)}>
                  {OWNER}
                </DropdownMenuItem>}
              {currentRole !== GUEST &&
                <DropdownMenuItem onClick={() => handleChangeRole(member, ADMIN)}>
                  {ADMIN}
                </DropdownMenuItem>}
              {currentRole !== GUEST &&
                <DropdownMenuItem onClick={() => handleChangeRole(member, MODERATOR)}>
                  {MODERATOR}
                </DropdownMenuItem>}
              {currentRole !== GUEST &&
                <DropdownMenuItem onClick={() => handleChangeRole(member, GUEST)}>
                  {GUEST}
                </DropdownMenuItem>}
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </TableCell>
      <TableCell>
        {currentMember.userId === member.userId
          ? <div className="hover:cursor-not-allowed">
            Select
          </div>
          : <DropdownMenu>
            <DropdownMenuTrigger className="hover:underline">
              Select
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {(currentRole === OWNER
                || currentRole === ADMIN && member.role !== OWNER
                || currentRole === MODERATOR && member.role === GUEST)
                && <DropdownMenuItem className="text-red-500">Kick</DropdownMenuItem>
              }
            </DropdownMenuContent>
          </DropdownMenu>
        }
      </TableCell>
    </TableRow>
  )

  members.map((member) => {
    if (member.role === OWNER) {
      owners.push(makeTableRow(member))
    } else if (member.role === ADMIN) {
      admins.push(makeTableRow(member))
    } else if (member.role === MODERATOR) {
      moderators.push(makeTableRow(member))
    } else {
      guests.push(makeTableRow(member))
    }
  })

  return (
    <div>
      <h1 className="text-lg font-bold pb-5">Server Members</h1>
      <Table className="bg-server dark:bg-server-dark rounded-2xl">
        <TableHeader>
          <TableRow>
            <TableHead className="rounded-tl-2xl w-[300px] min-w-[150px]">Name</TableHead>
            <TableHead>Member Since</TableHead>
            <TableHead>Roles</TableHead>
            <TableHead className="rounded-tr-2xl">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {owners}
          {admins}
          {moderators}
          {guests}
          <TableRow>
            <TableCell colSpan={4} className="rounded-b-2xl">
              Showing {owners.length + admins.length + moderators.length + guests.length} Members
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Members
