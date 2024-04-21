'use server'

import { type Member, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

const {
  OWNER,
  ADMIN,
} = MemberRole

/**
 * only owner can set user/to owner,admin,mod,guest
 * and admin can set user/to admin,mod,guest
 */
export const changeRole = async (
  memberToBeUpdated: Member,
  newRole: MemberRole,
  currentMemberId: string,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  const currentMember = await db.member.findFirst({
    where: {
      id: currentMemberId,
      OR: [
        {
          userId,
          role: OWNER,
        },
        {
          userId,
          role: ADMIN,
        },
      ],
    },
  })
  if (!currentMember) {
    console.log('invalid invoker role')
    return null
  }

  if (newRole === OWNER && currentMember.role !== OWNER) {
    console.log('invalid invoker role (not an owner)')
    return null
  }

  const updatedMember = await db.member.update({
    where: {
      id: memberToBeUpdated.id,
    },
    data: {
      role: newRole,
    },
  })

  return updatedMember
}
