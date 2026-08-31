import { Search, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export function SearchInput() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const queryParam = searchParams.get('q') ?? ''
  const [value, setValue] = useState(queryParam)

  useEffect(() => {
    setValue(queryParam)
  }, [queryParam])

  function submit() {
    const trimmed = value.trim()
    if (!trimmed) {
      return
    }

    navigate(`/product/search?q=${encodeURIComponent(trimmed)}`)
  }



  return (
    <div className="flex h-11 w-130 max-w-full items-center gap-2.5 rounded-[14px] border border-primary bg-surface pl-4 pr-3">
      <Search className="size-4.5 shrink-0 text-text-secondary" strokeWidth={2} />
      <input
        type="text"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            submit()
          }
        }}
        placeholder="Search products…"
        className="min-w-0 flex-1 bg-transparent text-[15px] leading-[1.45] text-text-primary outline-none placeholder:text-text-secondary"
      />
      {value && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={() => setValue('')}
          className="flex size-7 shrink-0 items-center justify-center rounded-full bg-border text-text-secondary"
        >
          <X className="size-3.5" strokeWidth={2} />
        </button>
      )}
      <button
        type="button"
        aria-label="Search"
        onClick={submit}
        className="flex size-9 shrink-0 items-center justify-center rounded-[10px] bg-primary text-surface"
      >
        <Search className="size-4.25" strokeWidth={2.5} />
      </button>
    </div>
  )
}
