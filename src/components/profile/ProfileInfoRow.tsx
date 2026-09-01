import { Link } from 'react-router-dom'

type ProfileInfoRowProps = {
  label: string
  value: string
  to?: string
}

export function ProfileInfoRow({ label, value, to }: ProfileInfoRowProps) {
  const content = (
    <>
      <span className="text-[15px] leading-[1.45] text-text-primary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[15px] leading-[1.45] text-text-secondary">{value}</span>
        {to && (
          <span className="text-[17px] leading-[1.45] text-text-secondary" aria-hidden="true">
            ›
          </span>
        )}
      </div>
    </>
  )

  if (to) {
    return (
      <Link
        to={to}
        className="flex h-14 items-center justify-between gap-4 px-5 transition-colors hover:bg-input/60"
      >
        {content}
      </Link>
    )
  }

  return <div className="flex h-14 items-center justify-between gap-4 px-5">{content}</div>
}
