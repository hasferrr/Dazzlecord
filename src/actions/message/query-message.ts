'use server'

import { db } from '@/lib/db'

/**
 * Cursor-based pagination
 * https://www.prisma.io/docs/orm/prisma-client/queries/pagination#cursor-based-pagination
 */
export const queryMessages = async (
  pageParam: string | null,
  channelId: string
) => {
  const take = 10
  let messages

  if (!pageParam) {
    // Since this is the first query, there is no cursor to pass in.
    messages = await db.message.findMany({
      where: { channelId },
      take,
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })
  } else {
    // Query for the second > time
    messages = await db.message.findMany({
      where: { channelId },
      take,
      skip: 1,
      cursor: { id: pageParam },
      include: { user: true },
      orderBy: { createdAt: 'desc' },
    })
  }
  return {
    data: messages,
    nextCursor: messages[take - 1] ? messages[take - 1].id : null,
  }
}
