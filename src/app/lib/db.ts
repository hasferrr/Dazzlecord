import { PrismaClient } from '@prisma/client'

import { NODE_ENV } from '@/utils/config'

export const db = globalThis.prisma || new PrismaClient()

declare global {
  var prisma: PrismaClient | undefined
}

if (NODE_ENV !== 'production') {
  globalThis.prisma = db
}
