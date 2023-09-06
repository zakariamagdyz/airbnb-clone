import { signIn, signOut } from 'next-auth/react'
import { useCallback, useState } from 'react'

// export const login = async (userData: UserData) => {
//   const res = await fetch("/api/auth/signup", {
//     method: "POST",
//     body: JSON.stringify(userData),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });

//   const data = await res.json();

//   if (!res.ok) {
//     throw new Error(data.message || "Something went wrong");
//   }
//   return data;
// };

type LoginValues = {
  email: string
  password: string
}

type Options = { variables: LoginValues }

export const useLoginMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const loginFn = useCallback(async (options: Options) => {
    setError(undefined)
    setIsLoading(true)
    try {
      const res = await signIn('credentials', {
        email: options.variables.email,
        password: options.variables.password,
        redirect: false,
        callbackUrl: '/',
      })
      if (res?.error) throw new Error(res.error)
      return res
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        throw error
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return [loginFn, { isLoading, error }] as const
}

export const useLogoutMutation = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>()

  const logoutFn = useCallback(async () => {
    setError(undefined)
    setIsLoading(true)
    try {
      const res = await signOut()
      return res
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
        throw error
      }
    } finally {
      setIsLoading(false)
    }
  }, [])

  return [logoutFn, { isLoading, error }] as const
}
