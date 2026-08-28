export type Review = {
  author: string
  comment: string
  stars: number
}

export type ProductDetail = {
  id: number
  category: string
  title: string
  price: string
  originalPrice: string
  discount: string
  rating: string
  reviewCount: number
  stock: number
  description: string
  reviews: Review[]
}

export const productDetails: ProductDetail[] = [
  {
    id: 1,
    category: 'smartphones',
    title: 'iPhone 9',
    price: '$549.00',
    originalPrice: '$599.00',
    discount: '-12%',
    rating: '4.69',
    reviewCount: 125,
    stock: 94,
    description:
      'An apple mobile which is nothing like apple. Dual SIM, 12MP camera, A11 Bionic chip with 64GB storage.',
    reviews: [
      { author: 'John Doe', comment: 'Very satisfied!', stars: 5 },
      { author: 'Scarlett Wright', comment: 'Great value.', stars: 4 },
    ],
  },
  {
    id: 2,
    category: 'smartphones',
    title: 'Samsung Galaxy',
    price: '$899.99',
    originalPrice: '$999.99',
    discount: '-10%',
    rating: '4.60',
    reviewCount: 89,
    stock: 42,
    description:
      'Premium Android smartphone with stunning display, powerful processor, and all-day battery life.',
    reviews: [
      { author: 'Alex Kim', comment: 'Excellent phone!', stars: 5 },
      { author: 'Maria Lopez', comment: 'Good camera quality.', stars: 4 },
    ],
  },
  {
    id: 3,
    category: 'laptops',
    title: 'MacBook Pro',
    price: '$1749.99',
    originalPrice: '$1999.99',
    discount: '-13%',
    rating: '4.90',
    reviewCount: 203,
    stock: 18,
    description:
      'High-performance laptop with M-series chip, Retina display, and up to 18 hours of battery life.',
    reviews: [
      { author: 'Chris Park', comment: 'Blazing fast.', stars: 5 },
      { author: 'Emma Wilson', comment: 'Worth every penny.', stars: 5 },
    ],
  },
  {
    id: 4,
    category: 'beauty',
    title: 'Essence Mascara',
    price: '$9.99',
    originalPrice: '$12.99',
    discount: '-23%',
    rating: '4.90',
    reviewCount: 56,
    stock: 150,
    description:
      'Volumizing mascara that delivers dramatic lashes without clumping. Waterproof and long-lasting.',
    reviews: [
      { author: 'Sophie Chen', comment: 'Love this mascara!', stars: 5 },
      { author: 'Lisa Tran', comment: 'Great for daily use.', stars: 4 },
    ],
  },
  {
    id: 5,
    category: 'furniture',
    title: 'Annibale Bed',
    price: '$1899.99',
    originalPrice: '$2199.99',
    discount: '-14%',
    rating: '4.70',
    reviewCount: 34,
    stock: 7,
    description:
      'Elegant Italian-designed bed frame crafted from solid oak with a minimalist aesthetic.',
    reviews: [
      { author: 'David Miller', comment: 'Beautiful craftsmanship.', stars: 5 },
      { author: 'Anna Berg', comment: 'Solid and stylish.', stars: 4 },
    ],
  },
  {
    id: 6,
    category: 'fragrances',
    title: "Dior J'adore",
    price: '$89.99',
    originalPrice: '$109.99',
    discount: '-18%',
    rating: '4.50',
    reviewCount: 78,
    stock: 63,
    description:
      'Iconic floral fragrance with notes of ylang-ylang, Damascus rose, and jasmine. Eau de Parfum.',
    reviews: [
      { author: 'Julia Ross', comment: 'Smells amazing!', stars: 5 },
      { author: 'Nina Patel', comment: 'A classic scent.', stars: 4 },
    ],
  },
]

export function getProductDetail(id: number): ProductDetail | undefined {
  return productDetails.find((product) => product.id === id)
}
