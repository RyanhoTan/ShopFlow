const BASE_URL = 'https://dummyjson.com'

type ApiErrorBody = {
  message?: string
}

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
    let message = response.statusText || 'Request failed'

    try {
      const body = (await response.json()) as ApiErrorBody
      if (body.message) {
        message = body.message
      }
    } catch {
      // Ignore non-JSON error bodies.
    }

    throw new ApiError(message, response.status)
  }

  return response.json() as Promise<T>
}

export function authHeaders(accessToken: string): HeadersInit {
  return { Authorization: `Bearer ${accessToken}` }
}
