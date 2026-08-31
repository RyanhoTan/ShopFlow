import { type ReactNode, type SubmitEventHandler } from 'react'

type AuthCardProps = {
  children: ReactNode
  onSubmit: SubmitEventHandler<HTMLFormElement>
}

export function AuthCard({ children, onSubmit }: AuthCardProps) {
  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full max-w-110 flex-col gap-6 rounded-[20px] bg-surface p-9 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.2)]"
    >
      {children}
    </form>
  )
}
