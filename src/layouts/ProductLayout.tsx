import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'

export function ProductLayout() {
  return (
    <div className="flex flex-1">
      <Sidebar />
      <main className="flex min-w-0 flex-1 bg-page">
        <Outlet />
      </main>
    </div>
  )
}
