export type AuthUser = {
  id: number
  username: string
  email: string
  firstName: string
  lastName: string
  gender: string
  image: string
}

export type AuthSession = AuthUser & {
  accessToken: string
  refreshToken: string
}

export type LoginCredentials = {
  username: string
  password: string
}

export type RefreshSessionResult = {
  accessToken: string
  refreshToken: string
}
