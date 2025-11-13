import NextAuth, { type DefaultSession, type NextAuthConfig } from 'next-auth'
import { PrismaAdapter } from '@auth/prisma-adapter'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { db } from '@/lib/db'
import { UserRole } from '@/types'

declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string
      role: UserRole
      outletId?: string
    } & DefaultSession['user']
  }

  interface User {
    role: UserRole
    outletId?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role: UserRole
    outletId?: string
  }
}

export const authOptions: NextAuthConfig = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.email as string
          },
          include: {
            employee: true
          }
        })

        if (!user || !user.password) {
          return null
        }

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        )

        if (!isPasswordValid) {
          return null
        }

        return {
          id: user.id,
          email: user.email,
          role: user.role,
          outletId: user.employee?.outletId,
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.outletId = user.outletId
      }
      return token
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role
        session.user.outletId = token.outletId
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/login',
    error: '/auth/error'
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth(authOptions)