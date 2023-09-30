import { User } from '@prisma/client'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo } from 'react'
import toast from 'react-hot-toast'

import { WithAuthCheck } from '@/utils/WithAuthChecks'

type useFavoriteProps = {
  listingId: string
  currentUser?: Omit<User, 'password'> | null
}
const useFavorite = ({ currentUser, listingId }: useFavoriteProps) => {
  const router = useRouter()

  const hasFavorited = useMemo(() => currentUser?.favoriteIds.includes(listingId), [listingId, currentUser])

  const toggleFavorite = useCallback(async () => {
    const method = hasFavorited ? 'DELETE' : 'POST'

    try {
      const response = await fetch(`/api/favorites/${listingId}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        throw new Error('Failed to toggle favorite')
      }

      router.refresh()
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message)
      }
    }
  }, [listingId, hasFavorited, router])

  const toggleFavoriteWithAuth = WithAuthCheck(toggleFavorite)

  return {
    hasFavorited,
    toggleFavoriteWithAuth,
  }
}

export default useFavorite
