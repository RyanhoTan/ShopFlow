import type { ReactNode } from 'react'
import { ProfileInfoRow } from './ProfileInfoRow'

export type ProfileField = {
  key: string
  label: string
  value: string
  editTo?: string
}

type ProfileSectionProps = {
  title: string
  fields: ProfileField[]
}

export function ProfileSection({ title, fields }: ProfileSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h2 className="px-1 text-[13px] font-semibold uppercase tracking-wide text-text-secondary">
        {title}
      </h2>
      <div className="overflow-hidden rounded-[20px] bg-surface">
        {fields.map((field, index) => (
          <div key={field.key}>
            <ProfileInfoRow label={field.label} value={field.value} to={field.editTo} />
            {index < fields.length - 1 && <div className="h-px bg-border" />}
          </div>
        ))}
      </div>
    </section>
  )
}

type ProfileMetricProps = {
  value: ReactNode
  label: string
}

export function ProfileMetric({ value, label }: ProfileMetricProps) {
  return (
    <div className="flex flex-col gap-1 rounded-[20px] bg-surface px-6 py-5">
      <p className="text-[28px] font-bold leading-[1.05] text-text-primary">{value}</p>
      <p className="text-[13px] leading-[1.45] text-text-secondary">{label}</p>
    </div>
  )
}
