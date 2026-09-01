import { useId } from 'react'

type EditLabeledInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export function EditLabeledInput({ label, value, onChange, placeholder }: EditLabeledInputProps) {
  const id = useId()

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[15px] leading-[1.45] text-text-primary">
        {label}
      </label>
      <div className="flex h-11 w-full items-center rounded-[14px] bg-input px-4">
        <input
          id={id}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[15px] leading-[1.45] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </div>
    </div>
  )
}
