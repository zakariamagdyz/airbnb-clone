import { PrismaAdapter } from '@next-auth/prisma-adapter'
import bcrypt from 'bcrypt'
import { NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import GithubProvider, { GithubProfile } from 'next-auth/providers/github'
import GoogleProvider, { GoogleProfile } from 'next-auth/providers/google'

import prismadb from '@/libs/prismadb'
import { findUserByEmail } from '@/models/user/services'
import { omitFields } from '@/utils/sanatizeObj'

export const options: NextAuthOptions = {
  adapter: PrismaAdapter(prismadb),
  providers: [
    GithubProvider({
      profile(profile: GithubProfile) {
        return {
          name: profile.name ?? profile.login,
          email: profile.email,
          role: profile.role ?? 'user',
          id: profile.id.toString(),
          image: profile.avatar_url,
        }
      },
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          name: profile.name ?? profile.login,
          email: profile.email,
          role: profile.role ?? 'user',
          id: profile.sub,
          image: profile.picture,
        }
      },
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      id: 'credentials',
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required')
        }
        // Check if user is exist
        const user = await findUserByEmail(credentials.email)
        // Check if password is correct
        if (!user || !(await bcrypt.compare(credentials.password, user.password || ''))) {
          throw new Error('Email or password is incorrect')
        }
        // send user data to been hashed with jwt
        return omitFields(user, ['password'])
      },
    }),
  ],
  pages: { signIn: '/' },

  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
        token.id = user.id
      }
      return token
    },
    // If you want to use the role in client components
    async session({ session, token }) {
      if (session?.user) {
        session.user.role = token.role
        session.user.id = token.id
      }
      return session
    },
  },
}
