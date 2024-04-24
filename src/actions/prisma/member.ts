'use server'

import { db } from '@/lib/db'

export const findMember = async (serverId: string, userId: string) => db.member.findFirst({
  where: {
    serverId,
    userId,
  },
})

export const getAllMembersByServerIdSorted = async (serverId: string) => db.member.findMany({
  where: { serverId },
  orderBy: { user: { username: 'asc' } },
  include: { user: true },
})
