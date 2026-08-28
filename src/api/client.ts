const BASE_URL = 'https://dummyjson.com'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.name = 'ApiError'
    this.status = status
  }
}

export async function apiClient<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${BASE_URL}${path}`, init)

  if (!response.ok) {
    throw new ApiError(response.statusText || 'Request failed', response.status)
  }

  return response.json() as Promise<T>
}
