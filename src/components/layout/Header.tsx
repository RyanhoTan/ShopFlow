import { Search, ShoppingCart } from 'lucide-react'
import reactLogo from '../../assets/react.svg'

export function Header() {
  return (
    <header className="flex h-18 shrink-0 items-center justify-between border-b border-border bg-surface px-10 py-3">
      <div className="flex items-center gap-2.5">
        <img
          src={reactLogo}
          alt="ShopFlow"
          className="size-9 shrink-0 rounded-[10px]"
        />
        <span className="text-[22px] font-bold leading-[1.45] text-text-primary">
          ShopFlow
        </span>
      </div>

      <label className="flex h-11 w-130 max-w-full items-center gap-2.5 rounded-[14px] bg-input px-4">
        <Search className="size-4.5 shrink-0 text-text-secondary" strokeWidth={2} />
        <input
          type="search"
          placeholder="Search products…"
          className="w-full bg-transparent text-[15px] leading-[1.45] text-text-primary outline-none placeholder:text-text-secondary"
        />
      </label>

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Cart"
          className="flex size-11 items-center justify-center rounded-full bg-input text-text-primary"
        >
          <ShoppingCart className="size-4.5" strokeWidth={2} />
        </button>
        <div className="size-11 shrink-0 rounded-full bg-active" />
      </div>
    </header>
  )
}
