import bcryptjs from 'bcryptjs'
import type { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

import { loginSchema } from './schemas'
import { getUserByUsername } from './services/user'

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedFields = loginSchema.safeParse(credentials)

        if (!validatedFields.success) {
          return null
        }

        const { username, password } = validatedFields.data

        const user = await getUserByUsername(username)
        if (!user || !user.passwordHash) {
          return null
        }

        const isPasswordMatch = await bcryptjs.compare(password, user.passwordHash)
        if (!isPasswordMatch) {
          return null
        }

        return user
      },
    }),
  ],
} satisfies NextAuthConfig
