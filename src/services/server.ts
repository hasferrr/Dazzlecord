import { db } from '@/lib/db'

export const getServersByUserId = async (userId: string) =>
  await db.server.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  })
