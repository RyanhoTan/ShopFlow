export type Product = {
  id: number
  category: string
  title: string
  price: string
  rating: string
}

export type ProductReview = {
  author: string
  comment: string
  stars: number
}

export type ProductDetail = Product & {
  originalPrice: string
  discount: string
  ratingValue: string
  reviewCount: number
  stock: number
  description: string
  reviews: ProductReview[]
}

export const categories = [
  'All Products',
  'Smartphones',
  'Laptops',
  'Fragrances',
  'Skincare',
  'Furniture',
  'Groceries',
] as const

export const filterChips = ['All', 'Beauty', 'Mobile', 'Home', 'Fashion'] as const

export const products: Product[] = [
  {
    id: 1,
    category: 'smartphones',
    title: 'iPhone 9',
    price: '$549.00',
    rating: '4.8',
  },
  {
    id: 2,
    category: 'smartphones',
    title: 'Samsung Galaxy',
    price: '$899.99',
    rating: '4.6',
  },
  {
    id: 3,
    category: 'laptops',
    title: 'MacBook Pro',
    price: '$1749.99',
    rating: '4.9',
  },
  {
    id: 4,
    category: 'beauty',
    title: 'Essence Mascara',
    price: '$9.99',
    rating: '4.9',
  },
  {
    id: 5,
    category: 'furniture',
    title: 'Annibale Bed',
    price: '$1899.99',
    rating: '4.7',
  },
  {
    id: 6,
    category: 'fragrances',
    title: "Dior J'adore",
    price: '$89.99',
    rating: '4.5',
  },
]

const productDetails: Record<number, Omit<ProductDetail, keyof Product>> = {
  1: {
    originalPrice: '$599.00',
    discount: '-12%',
    ratingValue: '4.69',
    reviewCount: 125,
    stock: 94,
    description:
      'An apple mobile which is nothing like apple. Dual SIM, 12MP camera, A11 Bionic chip with 64GB storage.',
    reviews: [
      { author: 'John Doe', comment: 'Very satisfied!', stars: 5 },
      { author: 'Scarlett Wright', comment: 'Great value.', stars: 4 },
    ],
  },
}

export function getProductDetail(id: number): ProductDetail | undefined {
  const product = products.find((item) => item.id === id)
  if (!product) return undefined

  const detail = productDetails[id]

  return {
    ...product,
    originalPrice: detail?.originalPrice ?? product.price,
    discount: detail?.discount ?? '-10%',
    ratingValue: detail?.ratingValue ?? product.rating,
    reviewCount: detail?.reviewCount ?? 100,
    stock: detail?.stock ?? 50,
    description:
      detail?.description ??
      `Premium ${product.category} product with excellent quality and customer satisfaction.`,
    reviews: detail?.reviews ?? [
      { author: 'John Doe', comment: 'Very satisfied!', stars: 5 },
      { author: 'Scarlett Wright', comment: 'Great value.', stars: 4 },
    ],
  }
}
