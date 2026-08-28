import type { Category, Product, ProductDetail, ProductsResult } from '../types/product'
import { apiClient } from './client'

type DummyReview = {
  rating: number
  comment: string
  reviewerName: string
}

type DummyProduct = {
  id: number
  title: string
  description: string
  category: string
  price: number
  discountPercentage: number
  rating: number
  stock: number
  thumbnail: string
  reviews?: DummyReview[]
}

type ProductsResponse = {
  products: DummyProduct[]
  total: number
}

type DummyCategory = {
  slug: string
  name: string
  url: string
}

function formatPrice(price: number): string {
  return `$${price.toFixed(2)}`
}

function formatDiscount(discountPercentage: number): string {
  return `-${Math.round(discountPercentage)}%`
}

function formatOriginalPrice(price: number, discountPercentage: number): string {
  const original = price / (1 - discountPercentage / 100)
  return formatPrice(original)
}

function mapProduct(product: DummyProduct): Product {
  return {
    id: product.id,
    category: product.category,
    title: product.title,
    price: formatPrice(product.price),
    rating: product.rating.toFixed(1),
    thumbnail: product.thumbnail,
  }
}

function mapProductDetail(product: DummyProduct): ProductDetail {
  return {
    ...mapProduct(product),
    originalPrice: formatOriginalPrice(product.price, product.discountPercentage),
    discount: formatDiscount(product.discountPercentage),
    reviewCount: product.reviews?.length ?? 0,
    stock: product.stock,
    description: product.description,
    reviews: (product.reviews ?? []).map((review) => ({
      author: review.reviewerName,
      comment: review.comment,
      stars: review.rating,
    })),
  }
}

export function getProducts(): Promise<ProductsResult> {
  return apiClient<ProductsResponse>('/products?limit=100').then((data) => ({
    products: data.products.map(mapProduct),
    total: data.total,
  }))
}

export function getProduct(id: number): Promise<ProductDetail> {
  return apiClient<DummyProduct>(`/products/${id}`).then(mapProductDetail)
}

export function getCategories(): Promise<Category[]> {
  return apiClient<DummyCategory[]>('/products/categories').then((categories) =>
    categories.map(({ slug, name }) => ({ slug, name })),
  )
}
