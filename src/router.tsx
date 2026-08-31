import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { ProductLayout } from './layouts/ProductLayout'
import { ProductDetailPage } from './pages/product/ProductDetailPage'
import { ProductsListPage } from './pages/product/ProductsListPage'
import { SearchResultsPage } from './pages/product/SearchResultsPage'

export const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/product" replace />,
      },
      {
        path: 'product',
        element: <ProductLayout />,
        children: [
          {
            index: true,
            element: <ProductsListPage />,
          },
          {
            path: 'search',
            element: <SearchResultsPage />,
          },
        ],
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
])
