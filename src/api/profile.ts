import type { UserCart, UserOrderStats, UserProfile } from '../types/profile'
import { apiClient } from './client'

type UserCartsResponse = {
  carts: UserCart[]
}

export function getUserProfile(userId: number): Promise<UserProfile> {
  return apiClient<UserProfile>(`/users/${userId}`)
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
