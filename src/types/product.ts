export type Product = {
  id: number
  category: string
  title: string
  price: string
  rating: string
  thumbnail: string
}

export type ProductReview = {
  author: string
  comment: string
  stars: number
}

export type ProductDetail = Product & {
  originalPrice: string
  discount: string
  reviewCount: number
  stock: number
  description: string
  reviews: ProductReview[]
}

export type ProductsResult = {
  products: Product[]
  total: number
}

export type Category = {
  slug: string
  name: string
}
