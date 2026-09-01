type EditTextInputProps = {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  type?: 'text' | 'email' | 'tel'
  autoFocus?: boolean
}

export function EditTextInput({
  value,
  onChange,
  placeholder,
  type = 'text',
  autoFocus = false,
}: EditTextInputProps) {
  return (
    <div className="flex h-11 w-full items-center rounded-[14px] bg-input px-4">
      <input
        type={type}
        value={value}
        autoFocus={autoFocus}
        placeholder={placeholder}
        onChange={(event) => onChange(event.target.value)}
        className="min-w-0 flex-1 bg-transparent text-[15px] leading-[1.45] text-text-primary outline-none placeholder:text-text-secondary"
      />
    </div>
  )
}
