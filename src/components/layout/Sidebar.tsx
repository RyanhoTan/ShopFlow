import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getCategories } from '../../api/products'

const allProductsCategory = { slug: 'all', name: 'All Products' }

export function Sidebar() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeCategory = searchParams.get('category') ?? 'all'

  const { data: categories, isLoading, error } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  const items = [allProductsCategory, ...(categories ?? [])]

  function selectCategory(slug: string) {
    if (slug === 'all') {
      setSearchParams({})
      return
    }

    setSearchParams({ category: slug })
  }

  return (
    <aside className="flex w-65 shrink-0 flex-col gap-1 bg-surface px-6 py-8">
      <p className="mb-3 px-3.5 text-[13px] font-semibold uppercase tracking-wide text-text-secondary">
        Categories
      </p>

      <nav className="flex flex-col gap-1">
        {isLoading && (
          <p className="px-3.5 py-2.5 text-[15px] text-text-secondary">Loading...</p>
        )}

        {error && (
          <p className="px-3.5 py-2.5 text-[15px] text-text-secondary">Failed to load categories.</p>
        )}

        {!isLoading &&
          !error &&
          items.map((category) => {
            const isActive = category.slug === activeCategory

            return (
              <button
                key={category.slug}
                type="button"
                onClick={() => selectCategory(category.slug)}
                className={[
                  'rounded-xl px-3.5 py-2.5 text-left text-[15px] leading-[1.45] transition-colors',
                  isActive
                    ? 'bg-active font-semibold text-primary'
                    : 'font-medium text-text-primary hover:bg-page',
                ].join(' ')}
              >
                {category.name}
              </button>
            )
          })}
      </nav>
    </aside>
  )
}
