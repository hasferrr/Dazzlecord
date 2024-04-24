'use server'

import { db } from '@/lib/db'

export const getAllServersByUserId = async (userId: string) => db.server.findMany({
  where: {
    members: {
      some: {
        userId,
      },
    },
  },
})

export const getServerIncludesAllChannel = async (serverId: string) => db.server.findUnique({
  where: {
    id: serverId,
  },
  include: {
    channels: {
      orderBy: {
        createdAt: 'asc',
      },
    },
  },
})

export const getServerWithAnyChannel = async (serverId: string, userId: string) => db.server.findUnique({
  where: {
    id: serverId,
    members: {
      some: {
        userId,
      },
    },
  },
  include: {
    channels: true,
  },
})
