import { useQuery } from '@tanstack/react-query'
import { ChevronLeft } from 'lucide-react'
import { Navigate, useNavigate, useSearchParams } from 'react-router-dom'
import { searchProducts } from '../../api/products'
import { ProductCard, ProductCardSkeleton } from '../../components/product/ProductCard'

const SKELETON_COUNT = 9

export function SearchResultsPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q')?.trim() ?? ''

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', 'search', query],
    queryFn: () => searchProducts(query),
    enabled: query.length > 0,
  })

  if (!query) {
    return <Navigate to="/product" replace />
  }

  if (error || (!isLoading && !data)) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center p-12 text-[15px] text-text-secondary">
        Failed to load search results.
      </div>
    )
  }

  return (
    <div className="flex min-h-full shrink-0 flex-col gap-6 px-8 py-8 pr-10">
      <section className="flex flex-col gap-4">
        <div className="flex items-start gap-3">
          <button
            type="button"
            aria-label="Back to products"
            onClick={() => navigate('/product')}
            className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-input text-primary"
          >
            <ChevronLeft className="size-7" strokeWidth={2} />
          </button>

          <div className="min-w-0 pt-0.5">
            <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">
              Results for &ldquo;{query}&rdquo;
            </h1>
            {data ? (
              <p className="mt-2 text-[15px] leading-[1.45] text-text-secondary">
                {data.total} products found · DummyJSON search
              </p>
            ) : (
              <div className="skeleton mt-2 h-5.5 w-56 rounded-full" />
            )}
          </div>
        </div>

        <div className="flex h-10 items-center justify-between">
          <p className="text-[14px] leading-[1.45] text-text-secondary">
            Showing results for {query}
          </p>
          <button type="button" className="text-[15px] font-semibold leading-[1.45] text-primary">
            Sort: Price ↑
          </button>
        </div>
      </section>

      <hr className="border-0 border-t border-border" />

      <section
        className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
        aria-busy={isLoading}
        aria-label={isLoading ? 'Loading search results' : undefined}
      >
        {data
          ? data.products.map((product) => <ProductCard key={product.id} product={product} />)
          : Array.from({ length: SKELETON_COUNT }, (_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
      </section>
    </div>
  )
}
