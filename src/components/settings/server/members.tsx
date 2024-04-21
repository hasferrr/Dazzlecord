'use client'

import { type Member, MemberRole } from '@prisma/client'

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

const Members = ({
  members,
  currentMember,
}: MembersProps) => {
  const memberTableRows = members.map((member, i) => {
    return (
      <TableRow key={i}>
        <TableCell>
          <MemberItem
            username={member.user.username}
            image={member.user.image}
          />
        </TableCell>
        <TableCell>{yearDifferenceYearFromNow(member.createdAt)}</TableCell>
        <TableCell>
          {currentMember.userId === member.userId
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
                {currentMember.role === MemberRole.OWNER &&
                  <DropdownMenuItem>{MemberRole.OWNER}</DropdownMenuItem>}
                {currentMember.role !== MemberRole.GUEST &&
                  <DropdownMenuItem>{MemberRole.ADMIN}</DropdownMenuItem>}
                {currentMember.role !== MemberRole.GUEST &&
                  <DropdownMenuItem>{MemberRole.GUEST}</DropdownMenuItem>}
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
                {currentMember.role === MemberRole.OWNER &&
                  <DropdownMenuItem className="text-red-500">Kick</DropdownMenuItem>}
                {currentMember.role === MemberRole.ADMIN &&
                  member.role !== MemberRole.OWNER &&
                  <DropdownMenuItem className="text-red-500">Kick</DropdownMenuItem>}
              </DropdownMenuContent>
            </DropdownMenu>
          }
        </TableCell>
      </TableRow>
    )
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
          {memberTableRows}
          <TableRow>
            <TableCell colSpan={4} className="rounded-b-2xl">Showing {memberTableRows.length} Members</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default Members
