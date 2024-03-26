import { PrismaAdapter } from '@auth/prisma-adapter'
import NextAuth from 'next-auth'

import { getUserById } from '@/actions/prisma/user'
import authConfig from '@/auth.config'
import { db } from '@/lib/db'

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  /**
   * Callbacks Auth.js
   * https://authjs.dev/guides/basics/callbacks
   */
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }

      if (token.username && session.user) {
        session.user.username = token.username
      }

      return session
    },
    async jwt({ token }) {
      if (!token.sub) {
        return token
      }

      const existingUser = await getUserById(token.sub)
      if (!existingUser) {
        return token
      }

      token.username = existingUser.username
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
