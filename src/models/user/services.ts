import { getServerSession } from 'next-auth'

import prismadb from '@/libs/prismadb'

import { options } from '../../app/api/auth/[...nextauth]/options'
import { UserData } from './schema'

export const findUserByEmail = async (email: string) => {
  return prismadb.user.findUnique({
    where: { email },
  })
}
export const createUser = async (userData: UserData) => {
  return prismadb.user.create({ data: userData })
}

export const getCurrentUser = async () => {
  try {
    const session = await getServerSession(options)

    if (!session?.user.email) return null

    const currentUser = await findUserByEmail(session.user.email)
    if (!currentUser) return null
    return currentUser
  } catch (error) {
    return null
  }
}
