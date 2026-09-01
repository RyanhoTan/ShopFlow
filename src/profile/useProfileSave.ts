import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { updateUserProfile } from '../api/profile'
import { useAuth } from '../auth/AuthProvider'
import { getStoredSession, setStoredSession } from '../auth/storage'

type SaveProfileInput = {
  userId: number
  data: Record<string, unknown>
  syncAuth?: boolean
}

export function useProfileSave() {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { user, refreshUser } = useAuth()

  const mutation = useMutation({
    mutationFn: async ({ userId, data }: SaveProfileInput) => {
      const session = getStoredSession()
      if (!session?.accessToken) {
        throw new Error('Not authenticated')
      }

      return updateUserProfile(userId, data, session.accessToken)
    },
    onSuccess: (profile, variables) => {
      queryClient.setQueryData(['profile', variables.userId], profile)

      if (variables.syncAuth && user) {
        const session = getStoredSession()
        if (session) {
          setStoredSession({
            ...session,
            firstName: profile.firstName,
            lastName: profile.lastName,
            username: profile.username,
            image: profile.image,
            email: profile.email,
            gender: profile.gender,
          })
          refreshUser()
        }
      }

      navigate('/profile')
    },
  })

  return mutation
}
