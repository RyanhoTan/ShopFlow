import { createBrowserRouter, Navigate } from 'react-router-dom'
import { AuthLayout } from './layouts/auth/AuthLayout'
import { ProductLayout } from './layouts/ProductLayout'
import { RootLayout } from './layouts/RootLayout'
import { LoginPage } from './pages/auth/LoginPage'
import { RegisterPage } from './pages/auth/RegisterPage'
import { ProductDetailPage } from './pages/product/ProductDetailPage'
import { ProductsListPage } from './pages/product/ProductsListPage'
import { ProfilePage } from './pages/profile/ProfilePage'
import { SearchResultsPage } from './pages/product/SearchResultsPage'

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
    ],
  },
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
      {
        path: 'profile',
        element: <ProfilePage />,
      },
    ],
  },
])
