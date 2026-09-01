import type { UserCart, UserOrderStats, UserProfile } from '../types/profile'
import { apiClient, authHeaders } from './client'

type UserCartsResponse = {
  carts: UserCart[]
}

export function getUserProfile(userId: number): Promise<UserProfile> {
  return apiClient<UserProfile>(`/users/${userId}`)
}

export function updateUserProfile(
  userId: number,
  data: Record<string, unknown>,
  accessToken: string,
): Promise<UserProfile> {
  return apiClient<UserProfile>(`/users/${userId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(accessToken),
    },
    body: JSON.stringify(data),
  })
}

export async function getUserOrderStats(userId: number): Promise<UserOrderStats> {
  const { carts } = await apiClient<UserCartsResponse>(`/users/${userId}/carts`)

  return {
    orderCount: carts.length,
    itemCount: carts.reduce(
      (count, cart) => count + cart.products.reduce((sum, product) => sum + product.quantity, 0),
      0,
    ),
    total: carts.reduce((sum, cart) => sum + cart.discountedTotal, 0),
  }
}
