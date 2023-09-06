import prismadb from '@/libs/prismadb'

import { UserData } from './schema'

export const findUserByEmail = async (email: string) => {
  return prismadb.user.findUnique({
    where: { email },
  })
}
export const createUser = async (userData: UserData) => {
  return prismadb.user.create({ data: userData })
}
