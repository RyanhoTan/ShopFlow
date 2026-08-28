import { Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header'

export function RootLayout() {
  return (
    <div className="flex min-h-svh flex-col bg-page font-sans text-text-primary">
      <Header />
      <Outlet />
    </div>
  )
}
