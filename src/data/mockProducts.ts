export type Product = {
  id: number
  category: string
  title: string
  price: string
  rating: string
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
