import { createBrowserRouter, Navigate } from 'react-router-dom'
import { RootLayout } from './layouts/RootLayout'
import { ProductLayout } from './layouts/ProductLayout'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { ProductsListPage } from './pages/ProductsListPage'

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
        ],
      },
      {
        path: 'product/:id',
        element: <ProductDetailPage />,
      },
    ],
  },
])
