'use server'

import { db } from '@/lib/db'

export const getConversationByUsersId = async (
  userId1: string,
  userId2: string,
) => db.conversation.findFirst({
  where: {
    OR: [
      {
        userId1,
        userId2,
      },
      {
        userId1: userId2,
        userId2: userId1,
      },
    ],
  },
})

export const createConversation = async (
  userId1: string,
  userId2: string,
) => db.conversation.create({
  data: {
    userId1,
    userId2,
  },
})
