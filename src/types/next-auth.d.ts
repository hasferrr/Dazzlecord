import NextAuth, { type DefaultSession } from 'next-auth'
import { JWT } from 'next-auth/jwt'

/**
 * TypeScript NextAuth.js
 * https://next-auth.js.org/getting-started/typescript
 */

declare module 'next-auth' {
  interface Session {
    user: DefaultSession['user'] & {
      id: string
      username: string
      image: string | null
    }
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    username?: string
    image: string | null
  }
}
