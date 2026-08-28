import { Outlet } from 'react-router-dom'
import { Header } from '../components/layout/Header'

export function RootLayout() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-page font-sans text-text-primary">
      <Header />
      <div className="flex min-h-0 flex-1 flex-col">
        <Outlet />
      </div>
    </div>
  )
}
