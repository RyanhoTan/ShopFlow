import { Star } from 'lucide-react'
import type { ProductDetail } from '../../data/mockProductDetails'
import { ReviewCard } from './ReviewCard'

type ProductInfoPanelProps = {
  product: ProductDetail
}

export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  return (
    <section className="flex w-full max-w-166 flex-col gap-5 rounded-[20px] bg-surface p-9">
      <p className="text-[12px] font-semibold uppercase leading-[1.45] text-primary">
        {product.category}
      </p>

      <h1 className="text-[40px] font-bold leading-[1.05] text-text-primary">{product.title}</h1>

      <div className="flex flex-wrap items-center gap-4">
        <p className="flex items-center gap-1.5 text-[16px] font-semibold leading-[1.45] text-text-primary">
          <Star className="size-4 fill-[#ff9500] text-[#ff9500]" />
          {product.rating}
        </p>
        <p className="text-[15px] leading-[1.45] text-text-secondary">
          {product.reviewCount} reviews
        </p>
        <p className="ml-auto text-[15px] font-medium leading-[1.45] text-success">
          In stock: {product.stock}
        </p>
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <p className="text-[34px] font-bold leading-none text-text-primary">{product.price}</p>
        <p className="text-[18px] font-medium leading-[1.45] text-text-secondary line-through">
          {product.originalPrice}
        </p>
        <p className="text-[14px] font-semibold leading-[1.45] text-primary">{product.discount}</p>
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <h2 className="text-[18px] font-semibold leading-[1.45] text-text-primary">Description</h2>
        <p className="text-[15px] leading-[1.45] text-text-secondary">{product.description}</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          className="h-13 min-w-55 rounded-[14px] bg-primary px-6 text-[17px] font-semibold leading-[1.45] text-white"
        >
          Add to Cart
        </button>
        <button
          type="button"
          className="h-13 min-w-40 rounded-[14px] bg-input px-6 text-[17px] font-semibold leading-[1.45] text-text-primary"
        >
          Buy Now
        </button>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-[18px] font-semibold leading-[1.45] text-text-primary">Reviews</h2>
        <div className="flex flex-col gap-3">
          {product.reviews.map((review) => (
            <ReviewCard key={review.author} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}
