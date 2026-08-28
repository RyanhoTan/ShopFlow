import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { ProductCard, ProductCardSkeleton } from '../../components/product/ProductCard'

const SKELETON_COUNT = 9

export function ProductsListPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts({ category }),
  })

  if (error || (!isLoading && !data)) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center p-12 text-[15px] text-text-secondary">
        Failed to load products.
      </div>
    )
  }

  return (
    <div className="flex min-h-full shrink-0 flex-col gap-6 px-8 py-8 pr-10">
      <section className="rounded-[20px] bg-surface px-8 py-7">
        <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">
          Discover Products
        </h1>
        {data ? (
          <p className="mt-2 text-[15px] leading-[1.45] text-text-secondary">
            {data.total} items from DummyJSON · Search, filter, and browse
          </p>
        ) : (
          <div className="skeleton mt-2 h-5.5 w-72 rounded-full" />
        )}
      </section>

      <section
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        aria-busy={isLoading}
        aria-label={isLoading ? 'Loading products' : undefined}
      >
        {data
          ? data.products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))
          : Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
      </section>
    </div>
  )
}
