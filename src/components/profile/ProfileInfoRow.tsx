type ProfileInfoRowProps = {
  label: string
  value: string
}

export function ProfileInfoRow({ label, value }: ProfileInfoRowProps) {
  return (
    <div className="flex h-14 items-center justify-between gap-4 px-5">
      <span className="text-[15px] leading-[1.45] text-text-primary">{label}</span>
      <div className="flex items-center gap-2">
        <span className="text-[15px] leading-[1.45] text-text-secondary">{value}</span>
        <span className="text-[17px] leading-[1.45] text-text-secondary" aria-hidden="true">
          ›
        </span>
      </div>
    </div>
  )
}
