import { db } from '@/lib/db'

export const getAllServersByUserId = async (userId: string) =>
  await db.server.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  })

export const getServerByUserIdIncludesAll = async (serverId: string) =>
  await db.server.findUnique({
    where: {
      id: serverId,
    },
    include: {
      channels: {
        orderBy: {
          createdAt: 'asc',
        },
      },
      members: {
        include: {
          user: true,
        },
        orderBy: {
          role: 'asc',
        },
      },
    },
  })
