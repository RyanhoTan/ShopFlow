import { categories } from '../../data/mockProducts'

export function Sidebar() {
  return (
    <aside className="flex w-[260px] shrink-0 flex-col gap-1 bg-surface px-6 py-8">
      <p className="mb-3 px-3.5 text-[13px] font-semibold uppercase tracking-wide text-text-secondary">
        Categories
      </p>

      <nav className="flex flex-col gap-1">
        {categories.map((category) => {
          const isActive = category === 'All Products'

          return (
            <a
              key={category}
              href="#"
              className={[
                'rounded-xl px-3.5 py-2.5 text-[15px] leading-[1.45] transition-colors',
                isActive
                  ? 'bg-active font-semibold text-primary'
                  : 'font-medium text-text-primary hover:bg-page',
              ].join(' ')}
            >
              {category}
            </a>
          )
        })}
      </nav>
    </aside>
  )
}
