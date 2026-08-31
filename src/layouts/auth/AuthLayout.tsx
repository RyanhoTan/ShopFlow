import { Outlet } from 'react-router-dom'
import { AuthHeader } from '../../components/auth/AuthHeader'

function AuthAmbientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div className="absolute inset-0 bg-active/22" />
      <div className="absolute -top-35 -right-5 size-140 rounded-full bg-primary/16 blur-[80px]" />
      <div className="absolute -bottom-12 -left-25 size-120 rounded-full bg-[#c7dcff]/70 blur-[70px]" />
      <div className="absolute top-[21%] left-[33%] size-90 rounded-full bg-primary/8 blur-[60px]" />
    </div>
  )
}

export function AuthLayout() {
  return (
    <div className="flex h-svh flex-col overflow-hidden bg-page font-sans text-text-primary">
      <div className="relative z-10 shrink-0">
        <AuthHeader />
        <div className="h-0.75 bg-primary/35" aria-hidden />
      </div>
      <main className="relative flex min-h-0 flex-1 flex-col overflow-hidden">
        <AuthAmbientBackground />
        <div className="relative z-10 flex min-h-0 flex-1 flex-col justify-safe-center overflow-y-auto px-10 py-12">
          <div className="mx-auto w-full max-w-110">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  )
}
