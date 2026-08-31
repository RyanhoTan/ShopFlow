import type {
  AuthSession,
  AuthUser,
  LoginCredentials,
  RefreshSessionResult,
} from '../types/auth'
import { apiClient, authHeaders } from './client'

export function login(credentials: LoginCredentials): Promise<AuthSession> {
  return apiClient<AuthSession>('/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      ...credentials,
      expiresInMins: 30,
    }),
  })
}

export function getMe(accessToken: string): Promise<AuthUser> {
  return apiClient<AuthUser>('/auth/me', {
    headers: authHeaders(accessToken),
    credentials: 'include',
  })
}

export function refreshSession(refreshToken: string): Promise<RefreshSessionResult> {
  return apiClient<RefreshSessionResult>('/auth/refresh', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({
      refreshToken,
      expiresInMins: 30,
    }),
  })
}
