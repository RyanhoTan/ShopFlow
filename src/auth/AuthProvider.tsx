import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { getMe, login as loginRequest, refreshSession } from '../api/auth'
import { ApiError } from '../api/client'
import type { AuthSession, AuthUser, LoginCredentials } from '../types/auth'
import { clearStoredSession, getStoredSession, setStoredSession } from './storage'

type AuthContextValue = {
  user: AuthUser | null
  isInitializing: boolean
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  refreshUser: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

function toAuthUser(session: AuthSession): AuthUser {
  const { accessToken: _accessToken, refreshToken: _refreshToken, ...user } = session
  return user
}

async function restoreSession(): Promise<AuthSession | null> {
  const stored = getStoredSession()
  if (!stored) {
    return null
  }

  try {
    const user = await getMe(stored.accessToken)
    return { ...stored, ...user }
  } catch (error) {
    if (!(error instanceof ApiError) || error.status !== 401 || !stored.refreshToken) {
      clearStoredSession()
      return null
    }
  }

  try {
    const tokens = await refreshSession(stored.refreshToken)
    const user = await getMe(tokens.accessToken)
    const session: AuthSession = { ...user, ...tokens }
    setStoredSession(session)
    return session
  } catch {
    clearStoredSession()
    return null
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    let cancelled = false

    restoreSession()
      .then((session) => {
        if (!cancelled) {
          setUser(session ? toAuthUser(session) : null)
        }
      })
      .finally(() => {
        if (!cancelled) {
          setIsInitializing(false)
        }
      })

    return () => {
      cancelled = true
    }
  }, [])

  const login = useCallback(async (credentials: LoginCredentials) => {
    const session = await loginRequest(credentials)
    setStoredSession(session)
    setUser(toAuthUser(session))
  }, [])

  const logout = useCallback(() => {
    clearStoredSession()
    setUser(null)
  }, [])

  const refreshUser = useCallback(() => {
    const session = getStoredSession()
    setUser(session ? toAuthUser(session) : null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isInitializing,
      login,
      logout,
      refreshUser,
    }),
    [user, isInitializing, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
