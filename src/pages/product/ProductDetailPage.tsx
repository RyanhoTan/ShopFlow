import { Link, useParams } from 'react-router-dom'
import { ProductGallery } from '../../components/product/ProductGallery'
import { ProductInfoPanel } from '../../components/product/ProductInfoPanel'
import { getProductDetail } from '../../data/mockProductDetails'

export function ProductDetailPage() {
  const { id } = useParams()
  const product = getProductDetail(Number(id))

  if (!product) {
    return (
      <main className="flex flex-1 flex-col items-center justify-center gap-4 bg-page p-12">
        <p className="text-[18px] font-semibold text-text-primary">Product not found</p>
        <Link to="/product" className="text-[15px] font-medium text-primary hover:underline">
          Back to products
        </Link>
      </main>
    )
  }

  return (
    <main className="flex flex-1 justify-center bg-page px-12 py-8">
      <div className="flex w-full max-w-336 flex-col gap-10 xl:flex-row">
        <ProductGallery />
        <ProductInfoPanel product={product} />
      </div>
    </main>
  )
}
