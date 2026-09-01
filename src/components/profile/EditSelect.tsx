import { useEffect, useRef, useState } from 'react'
import type { SelectOption } from '../../profile/editFields'

type EditSelectProps = {
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

function getLabel(options: SelectOption[], value: string): string {
  return options.find((option) => option.value === value)?.label ?? value
}

export function EditSelect({ value, options, onChange }: EditSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    function handlePointerDown(event: PointerEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('pointerdown', handlePointerDown)
    return () => document.removeEventListener('pointerdown', handlePointerDown)
  }, [open])

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      <button
        type="button"
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onClick={() => setOpen((current) => !current)}
        className="flex h-11 w-full items-center justify-between rounded-[14px] bg-input px-4 text-left transition-[transform,background-color] duration-100 ease-out hover:bg-border active:scale-[0.99]"
      >
        <span className="text-[15px] leading-[1.45] text-text-primary">
          {getLabel(options, value)}
        </span>
        <span className="text-[14px] leading-[1.45] text-text-secondary" aria-hidden="true">
          {open ? '▴' : '▾'}
        </span>
      </button>

      {open && (
        <div className="dropdown-panel overflow-hidden rounded-[14px] bg-surface">
          {options.map((option, index) => {
            const selected = option.value === value

            return (
              <div key={option.value}>
                <button
                  type="button"
                  onClick={() => {
                    onChange(option.value)
                    setOpen(false)
                  }}
                  className={`flex h-11 w-full items-center justify-between px-4 text-left transition-[transform,background-color,color] duration-100 ease-out active:scale-[0.99] ${
                    selected
                      ? 'bg-active text-primary hover:bg-active'
                      : 'bg-surface text-text-primary hover:bg-input'
                  }`}
                >
                  <span className={`text-[15px] leading-[1.45] ${selected ? 'font-semibold' : ''}`}>
                    {option.label}
                  </span>
                  {selected && (
                    <span className="text-[15px] font-semibold leading-[1.45] text-primary">✓</span>
                  )}
                </button>
                {index < options.length - 1 && <div className="h-px bg-border" />}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
