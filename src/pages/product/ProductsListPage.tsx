import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { getProducts } from '../../api/products'
import { ProductCard } from '../../components/product/ProductCard'

export function ProductsListPage() {
  const [searchParams] = useSearchParams()
  const category = searchParams.get('category') ?? 'all'

  const { data, isLoading, error } = useQuery({
    queryKey: ['products', category],
    queryFn: () => getProducts({ category }),
  })

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-[15px] text-text-secondary">
        Loading products...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex flex-1 items-center justify-center p-12 text-[15px] text-text-secondary">
        Failed to load products.
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col gap-6 px-8 py-8 pr-10">
      <section className="rounded-[20px] bg-surface px-8 py-7">
        <h1 className="text-[34px] font-bold leading-[1.05] text-text-primary">
          Discover Products
        </h1>
        <p className="mt-2 text-[15px] leading-[1.45] text-text-secondary">
          {data.total} items from DummyJSON · Search, filter, and browse
        </p>
      </section>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {data.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </section>
    </div>
  )
}
