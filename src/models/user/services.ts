import { User } from '@prisma/client'
import { getServerSession } from 'next-auth'

import prismadb from '@/libs/prismadb'
import { omitFields } from '@/utils/sanatizeObj'

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

export const getCurrentUser = async (): Promise<Omit<User, 'password'> | null> => {
  try {
    const session = await getServerSession(options)

    if (!session?.user.email) return null

    const currentUser = await findUserByEmail(session.user.email)
    if (!currentUser) return null
    return omitFields(currentUser, ['password'])
  } catch (error) {
    return null
  }
}
