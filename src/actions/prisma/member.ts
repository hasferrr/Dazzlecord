'use server'

import { db } from '@/lib/db'

export const findMember = async (serverId: string, userId: string) =>
  await db.member.findFirst({
    where: {
      serverId,
      userId,
    },
  })
