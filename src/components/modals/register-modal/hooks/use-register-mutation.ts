import React from 'react'

type RegisterMutationVariables = {
  name: string
  email: string
  password: string
}

type RegisterSuccessResponse = {
  message: string
}

type RegisterErrorResponse = {
  message: string
}

const useRegisterMutation = () => {
  const [isLoading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<RegisterErrorResponse>()
  const mutate = React.useCallback(async function (
    registerData: RegisterMutationVariables
  ): Promise<RegisterSuccessResponse> {
    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(registerData),
      })
      const data = await response.json()
      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong!')
      }

      return data
    } catch (error) {
      if (error instanceof Error) {
        setError(error)
      }
      throw error
    } finally {
      setLoading(false)
    }
  }, [])

  return { mutate, isLoading, error }
}

export default useRegisterMutation
