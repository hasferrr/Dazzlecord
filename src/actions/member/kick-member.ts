'use server'

import { type Member, MemberRole } from '@prisma/client'
import { redirect } from 'next/navigation'

import { auth } from '@/auth'
import { db } from '@/lib/db'

const {
  OWNER,
  ADMIN,
  MODERATOR,
  GUEST,
} = MemberRole

/**
 * owner can kick owner,admin,mod,guest
 * admin can kick admin,mod,guest
 * mod can kick guest
 * user cannot kick itself
 */
export const kickMember = async (
  memberToBeKicked: Member,
  currentMemberId: string,
) => {
  const session = await auth()
  if (!session) {
    return redirect('/')
  }
  const userId = session.user.id

  try {
    const currentMember = await db.member.findFirst({
      where: {
        id: currentMemberId,
        userId,
        role: { not: GUEST },
      },
    })
    if (!currentMember) {
      console.log('invalid invoker role')
      return null
    }

    if (currentMember.role === ADMIN && memberToBeKicked.role === OWNER) {
      console.log('invalid invoker role (not an owner)')
      return null
    }

    if (currentMember.role === MODERATOR && memberToBeKicked.role !== GUEST) {
      console.log('invalid invoker role (mods cannot kick a non-guest role)')
      return null
    }

    const deletedMember = await db.member.delete({
      where: {
        id: memberToBeKicked.id,
      },
    })
    return deletedMember
  } catch (error) {
    console.log(error)
    return null
  }
}
