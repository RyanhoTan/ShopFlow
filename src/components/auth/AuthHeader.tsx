import { Link } from 'react-router-dom'
import reactLogo from '../../assets/react.svg'

export function AuthHeader() {
  return (
    <header className="flex h-18 shrink-0 items-center justify-between border-b border-border bg-surface px-10 py-3">
      <Link to="/product" className="flex items-center gap-2.5">
        <img src={reactLogo} alt="ShopFlow" className="size-9 shrink-0 rounded-[10px]" />
        <span className="text-[22px] font-bold leading-[1.45] text-text-primary">ShopFlow</span>
      </Link>

      <Link
        to="/product"
        className="text-[15px] font-medium leading-[1.45] text-primary"
      >
        Back to products
      </Link>
    </header>
  )
}
