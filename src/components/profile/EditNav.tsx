import { Link, useNavigate } from 'react-router-dom'

type EditNavProps = {
  title: string
  onSave: () => void
  isSaving?: boolean
  saveDisabled?: boolean
}

export function EditNav({ title, onSave, isSaving = false, saveDisabled = false }: EditNavProps) {
  const navigate = useNavigate()

  return (
    <nav className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-surface px-10">
      <Link
        to="/profile"
        onClick={(event) => {
          event.preventDefault()
          navigate(-1)
        }}
        className="text-[17px] leading-[1.45] text-primary"
      >
        Cancel
      </Link>
      <h1 className="text-[17px] font-semibold leading-[1.45] text-text-primary">{title}</h1>
      <button
        type="button"
        onClick={onSave}
        disabled={isSaving || saveDisabled}
        className="text-[17px] font-semibold leading-[1.45] text-primary disabled:opacity-50"
      >
        {isSaving ? 'Saving…' : 'Save'}
      </button>
    </nav>
  )
}
