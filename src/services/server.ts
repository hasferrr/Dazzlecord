import { db } from '@/lib/db'

export const getServersByUserId = async (userId: string) => {
  const servers = await db.server.findMany({
    where: {
      members: {
        some: {
          userId,
        },
      },
    },
  })
  return servers
}
