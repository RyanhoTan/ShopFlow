import { Outlet } from 'react-router-dom'
import { Sidebar } from '../components/layout/Sidebar'

export function ProductLayout() {
  return (
    <div className="flex min-h-0 flex-1 overflow-hidden">
      <Sidebar />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto bg-page">
        <Outlet />
      </main>
    </div>
  )
}
