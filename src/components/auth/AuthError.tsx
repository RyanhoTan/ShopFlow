type AuthErrorProps = {
  message: string
}

export function AuthError({ message }: AuthErrorProps) {
  return (
    <div className="flex min-h-11 items-center rounded-xl bg-danger-surface px-3.5 py-3">
      <p className="text-[14px] font-medium leading-[1.45] text-danger">{message}</p>
    </div>
  )
}
