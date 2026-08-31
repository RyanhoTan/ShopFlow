import { useId, useState } from 'react'

type AuthInputProps = {
  label: string
  value: string
  onChange: (value: string) => void
  placeholder: string
  type?: 'text' | 'email' | 'password'
  autoComplete?: string
  showPasswordToggle?: boolean
}

export function AuthInput({
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  autoComplete,
  showPasswordToggle = false,
}: AuthInputProps) {
  const id = useId()
  const [visible, setVisible] = useState(false)
  const inputType = showPasswordToggle ? (visible ? 'text' : 'password') : type

  return (
    <div className="flex w-full flex-col gap-2">
      <label htmlFor={id} className="text-[13px] font-semibold leading-[1.45] text-text-primary">
        {label}
      </label>
      <div className="flex h-11 w-full items-center gap-2.5 rounded-[14px] bg-input px-4">
        <input
          id={id}
          type={inputType}
          value={value}
          autoComplete={autoComplete}
          placeholder={placeholder}
          onChange={(event) => onChange(event.target.value)}
          className="min-w-0 flex-1 bg-transparent text-[15px] leading-[1.45] text-text-primary outline-none placeholder:text-text-secondary"
        />
        {showPasswordToggle && (
          <button
            type="button"
            onClick={() => setVisible((current) => !current)}
            className="shrink-0 text-[13px] font-semibold leading-[1.45] text-primary"
          >
            {visible ? 'Hide' : 'Show'}
          </button>
        )}
      </div>
    </div>
  )
}
