import type { ReactNode } from 'react'

type EditFieldCardProps = {
  children: ReactNode
}

export function EditFieldCard({ children }: EditFieldCardProps) {
  return <div className="rounded-[20px] bg-surface p-5">{children}</div>
}

type EditHintProps = {
  children: ReactNode
}

export function EditHint({ children }: EditHintProps) {
  return <p className="text-[13px] leading-[1.45] text-text-secondary">{children}</p>
}
