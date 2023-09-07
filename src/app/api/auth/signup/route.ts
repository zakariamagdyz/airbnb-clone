import bcrypt from 'bcrypt'
import { NextResponse } from 'next/server'

import { userInputSchema } from '@/models/user/schema'
import { createUser, findUserByEmail } from '@/models/user/services'
import { handleServerError } from '@/utils/handleServerErr'

export const POST = async (req: Request) => {
  try {
    // Check for body schema
    const body = await req.json()
    const { name, email, password } = await userInputSchema.parseAsync(body)

    // Check if user is exist
    const user = await findUserByEmail(email)
    if (user) return NextResponse.json({ message: 'User already exist' }, { status: 400 })

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12)
    const preparedUser = {
      email,
      name,
      password: hashedPassword,
    }
    // call create user service
    await createUser(preparedUser)
    return NextResponse.json(
      {
        message: 'User has been created successfully, Please visit login page',
      },
      { status: 201 }
    )
  } catch (error) {
    handleServerError(error, '[SIGNUP_POST]')
  }
}
