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

      if (token.image && session.user) {
        session.user.image = token.image
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
      token.image = existingUser.image
      return token
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: 'jwt' },
  ...authConfig,
})
