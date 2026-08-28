import { useQuery } from '@tanstack/react-query'
import { Link, useParams } from 'react-router-dom'
import { ApiError } from '../../api/client'
import { getProduct } from '../../api/products'
import { ProductGallery } from '../../components/product/ProductGallery'
import { ProductInfoPanel } from '../../components/product/ProductInfoPanel'

export function ProductDetailPage() {
  const { id } = useParams()
  const productId = Number(id)

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => getProduct(productId),
    enabled: Number.isFinite(productId) && productId > 0,
  })

  if (!Number.isFinite(productId) || productId <= 0) {
    return (
      <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 bg-page p-12">
        <p className="text-[18px] font-semibold text-text-primary">Product not found</p>
        <Link to="/product" className="text-[15px] font-medium text-primary hover:underline">
          Back to products
        </Link>
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center bg-page p-12 text-[15px] text-text-secondary">
        Loading product...
      </main>
    )
  }

  if (error instanceof ApiError && error.status === 404) {
    return (
      <main className="flex min-h-full flex-1 flex-col items-center justify-center gap-4 bg-page p-12">
        <p className="text-[18px] font-semibold text-text-primary">Product not found</p>
        <Link to="/product" className="text-[15px] font-medium text-primary hover:underline">
          Back to products
        </Link>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="flex min-h-full flex-1 items-center justify-center bg-page p-12 text-[15px] text-text-secondary">
        Failed to load product.
      </main>
    )
  }

  return (
    <main className="flex min-h-full flex-1 justify-center overflow-y-auto bg-page px-12 py-8">
      <div className="flex w-full min-w-0 max-w-336 flex-col gap-10 xl:flex-row xl:items-start">
        <ProductGallery />
        <ProductInfoPanel product={product} />
      </div>
    </main>
  )
}
