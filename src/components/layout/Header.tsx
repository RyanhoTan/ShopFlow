import { ShoppingCart } from 'lucide-react'
import { Link } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'
import { SearchInput } from './SearchInput'

export function Header() {
  return (
    <header className="flex h-18 shrink-0 items-center justify-between border-b border-border bg-surface px-10 py-3">
      <div className="flex items-center gap-2.5">
        <img src={reactLogo} alt="ShopFlow" className="size-9 shrink-0 rounded-[10px]" />
        <span className="text-[22px] font-bold leading-[1.45] text-text-primary">ShopFlow</span>
      </div>

      <SearchInput />

      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Cart"
          className="flex size-11 items-center justify-center rounded-full bg-input text-text-primary"
        >
          <ShoppingCart className="size-4.5" strokeWidth={2} />
        </button>
        <Link
          to="/login"
          aria-label="Sign in"
          className="size-11 shrink-0 rounded-full bg-active"
        />
      </div>
    </header>
  )
}
