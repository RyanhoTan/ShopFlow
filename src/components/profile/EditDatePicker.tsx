import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useId, useMemo, useRef, useState } from 'react'
import { formatBirthdayDisplay } from '../../profile/editFields'

type EditDatePickerProps = {
  value: string
  onChange: (value: string) => void
}

type CalendarView = 'days' | 'months' | 'years'

const WEEKDAY_LABELS = ['S', 'M', 'T', 'W', 'T', 'F', 'S'] as const
const MONTH_LABELS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
] as const

const YEARS_PER_PAGE = 12

function parseBirthDate(value: string): Date {
  const [year, month, day] = value.split('-').map(Number)
  return new Date(year, month - 1, day)
}

function toBirthDateValue(date: Date): string {
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
}

function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1)
}

function addMonths(date: Date, amount: number): Date {
  return new Date(date.getFullYear(), date.getMonth() + amount, 1)
}

function addYears(date: Date, amount: number): Date {
  return new Date(date.getFullYear() + amount, date.getMonth(), 1)
}

function isSameDay(left: Date, right: Date): boolean {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  )
}

function buildCalendarDays(month: Date): Date[] {
  const firstDay = startOfMonth(month)
  const start = new Date(firstDay)
  start.setDate(start.getDate() - start.getDay())

  return Array.from({ length: 42 }, (_, index) => {
    const day = new Date(start)
    day.setDate(start.getDate() + index)
    return day
  })
}

function getYearPageStart(year: number): number {
  return Math.floor(year / YEARS_PER_PAGE) * YEARS_PER_PAGE
}

export function EditDatePicker({ value, onChange }: EditDatePickerProps) {
  const selectedDate = useMemo(() => parseBirthDate(value), [value])
  const [open, setOpen] = useState(false)
  const [view, setView] = useState<CalendarView>('days')
  const [viewMonth, setViewMonth] = useState(() => startOfMonth(selectedDate))
  const [yearPageStart, setYearPageStart] = useState(() =>
    getYearPageStart(selectedDate.getFullYear()),
  )
  const rootRef = useRef<HTMLDivElement>(null)
  const triggerId = useId()
  const calendarId = useId()

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

  const days = buildCalendarDays(viewMonth)
  const monthLabel = viewMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  })
  const yearLabel = String(viewMonth.getFullYear())
  const yearRangeLabel = `${yearPageStart}–${yearPageStart + YEARS_PER_PAGE - 1}`
  const years = Array.from({ length: YEARS_PER_PAGE }, (_, index) => yearPageStart + index)
  const today = useMemo(() => {
    const now = new Date()
    return new Date(now.getFullYear(), now.getMonth(), now.getDate())
  }, [])

  function handleOpen() {
    setViewMonth(startOfMonth(selectedDate))
    setYearPageStart(getYearPageStart(selectedDate.getFullYear()))
    setView('days')
    setOpen((current) => !current)
  }

  function handleSelectDay(day: Date) {
    onChange(toBirthDateValue(day))
    setOpen(false)
  }

  function handleSelectMonth(monthIndex: number) {
    setViewMonth(new Date(viewMonth.getFullYear(), monthIndex, 1))
    setView('days')
  }

  function handleSelectYear(year: number) {
    setViewMonth(new Date(year, viewMonth.getMonth(), 1))
    setYearPageStart(getYearPageStart(year))
    setView('months')
  }

  function handlePrevious() {
    if (view === 'days') {
      setViewMonth((current) => addMonths(current, -1))
      return
    }

    if (view === 'months') {
      setViewMonth((current) => addYears(current, -1))
      return
    }

    setYearPageStart((current) => current - YEARS_PER_PAGE)
  }

  function handleNext() {
    if (view === 'days') {
      setViewMonth((current) => addMonths(current, 1))
      return
    }

    if (view === 'months') {
      setViewMonth((current) => addYears(current, 1))
      return
    }

    setYearPageStart((current) => current + YEARS_PER_PAGE)
  }

  function handleHeaderClick() {
    if (view === 'days') {
      setView('months')
      return
    }

    if (view === 'months') {
      setYearPageStart(getYearPageStart(viewMonth.getFullYear()))
      setView('years')
    }
  }

  const headerLabel =
    view === 'days' ? monthLabel : view === 'months' ? yearLabel : yearRangeLabel
  const previousLabel =
    view === 'days' ? 'Previous month' : view === 'months' ? 'Previous year' : 'Previous years'
  const nextLabel =
    view === 'days' ? 'Next month' : view === 'months' ? 'Next year' : 'Next years'

  return (
    <div ref={rootRef} className="relative flex flex-col gap-2">
      <button
        id={triggerId}
        type="button"
        aria-expanded={open}
        aria-controls={calendarId}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
        }}
        onClick={handleOpen}
        className="flex h-11 w-full items-center justify-between rounded-[14px] bg-input px-4 text-left transition-[transform,background-color] duration-100 ease-out hover:bg-border active:scale-[0.99]"
      >
        <span className="text-[15px] leading-[1.45] text-text-primary">
          {formatBirthdayDisplay(value)}
        </span>
        {open ? (
          <span className="text-[14px] leading-[1.45] text-text-secondary" aria-hidden="true">
            ▴
          </span>
        ) : (
          <CalendarDays className="size-4 text-text-secondary" strokeWidth={2} aria-hidden="true" />
        )}
      </button>

      {open && (
        <div
          id={calendarId}
          role="dialog"
          aria-label="Choose birthday"
          className="dropdown-panel overflow-hidden rounded-[14px] bg-surface"
        >
          <div className="flex items-center justify-between px-4 py-3">
            <button
              type="button"
              aria-label={previousLabel}
              onClick={handlePrevious}
              className="flex size-8 items-center justify-center rounded-full text-text-secondary transition-[transform,background-color] duration-100 ease-out hover:bg-input active:scale-90"
            >
              <ChevronLeft className="size-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              onClick={handleHeaderClick}
              disabled={view === 'years'}
              className="rounded-md px-2 py-1 text-[15px] font-semibold leading-[1.45] text-text-primary transition-colors duration-100 ease-out enabled:hover:bg-input enabled:active:scale-[0.98] disabled:cursor-default"
            >
              {headerLabel}
            </button>
            <button
              type="button"
              aria-label={nextLabel}
              onClick={handleNext}
              className="flex size-8 items-center justify-center rounded-full text-text-secondary transition-[transform,background-color] duration-100 ease-out hover:bg-input active:scale-90"
            >
              <ChevronRight className="size-4" strokeWidth={2} />
            </button>
          </div>

          {view === 'days' && (
            <>
              <div className="grid grid-cols-7 px-3 pb-1">
                {WEEKDAY_LABELS.map((label, index) => (
                  <span
                    key={`${label}-${index}`}
                    className="py-1 text-center text-[12px] font-semibold leading-[1.45] tracking-[0.02em] text-text-secondary"
                  >
                    {label}
                  </span>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-y-1 px-3 pb-4">
                {days.map((day) => {
                  const inMonth = day.getMonth() === viewMonth.getMonth()
                  const selected = isSameDay(day, selectedDate)
                  const isToday = isSameDay(day, today)

                  return (
                    <button
                      key={day.toISOString()}
                      type="button"
                      aria-label={day.toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                      aria-pressed={selected}
                      onClick={() => handleSelectDay(day)}
                      className={`mx-auto flex size-9 items-center justify-center rounded-full text-[14px] leading-[1.45] transition-[transform,background-color,color] duration-100 ease-out active:scale-90 ${
                        selected
                          ? 'bg-primary font-semibold text-white'
                          : inMonth
                            ? isToday
                              ? 'font-semibold text-primary ring-1 ring-primary/30 hover:bg-input'
                              : 'text-text-primary hover:bg-input'
                            : 'text-text-secondary/60 hover:bg-input'
                      }`}
                    >
                      {day.getDate()}
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {view === 'months' && (
            <div className="grid grid-cols-3 gap-2 px-4 pb-4">
              {MONTH_LABELS.map((label, monthIndex) => {
                const selected =
                  viewMonth.getMonth() === monthIndex &&
                  selectedDate.getFullYear() === viewMonth.getFullYear() &&
                  selectedDate.getMonth() === monthIndex

                return (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    aria-pressed={selected}
                    onClick={() => handleSelectMonth(monthIndex)}
                    className={`flex h-11 items-center justify-center rounded-xl text-[15px] leading-[1.45] transition-[transform,background-color,color] duration-100 ease-out active:scale-[0.98] ${
                      selected
                        ? 'bg-primary font-semibold text-white'
                        : 'text-text-primary hover:bg-input'
                    }`}
                  >
                    {label}
                  </button>
                )
              })}
            </div>
          )}

          {view === 'years' && (
            <div className="grid grid-cols-3 gap-2 px-4 pb-4">
              {years.map((year) => {
                const selected = selectedDate.getFullYear() === year

                return (
                  <button
                    key={year}
                    type="button"
                    aria-label={String(year)}
                    aria-pressed={selected}
                    onClick={() => handleSelectYear(year)}
                    className={`flex h-11 items-center justify-center rounded-xl text-[15px] leading-[1.45] transition-[transform,background-color,color] duration-100 ease-out active:scale-[0.98] ${
                      selected
                        ? 'bg-primary font-semibold text-white'
                        : 'text-text-primary hover:bg-input'
                    }`}
                  >
                    {year}
                  </button>
                )
              })}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
