import { ProductCard } from '../../components/product/ProductCard'
import { filterChips, products } from '../../data/mockProducts'

export function ProductsListPage() {
  return (
    <div className="flex flex-1 flex-col gap-6 px-8 py-8 pr-10">
      <section className="rounded-[20px] bg-surface px-8 py-7">
        <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">
          Discover Products
        </h1>
        <p className="mt-2 text-[15px] leading-[1.45] text-text-secondary">
          194 items from DummyJSON · Search, filter, and browse
        </p>
      </section>

      <div className="flex flex-wrap gap-2.5">
        {filterChips.map((chip) => {
          const isActive = chip === 'All'

          return (
            <button
              key={chip}
              type="button"
              className={[
                'rounded-full px-4 py-2 text-[14px] leading-[1.45] transition-colors',
                isActive
                  ? 'bg-active font-semibold text-primary'
                  : 'font-medium text-text-primary hover:bg-surface',
              ].join(' ')}
            >
              {chip}
            </button>
          )
        })}
      </div>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
