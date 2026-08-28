import { Star } from 'lucide-react'
import type { ProductDetail } from '../../types/product'
import { ReviewCard } from './ReviewCard'

type ProductInfoPanelProps = {
  product: ProductDetail
}

export function ProductInfoPanel({ product }: ProductInfoPanelProps) {
  return (
    <section className="flex w-full min-w-0 max-w-166 flex-col gap-5 rounded-[20px] bg-surface p-9">
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
        <div className="flex min-w-0 flex-col gap-3">
          {product.reviews.map((review, index) => (
            <ReviewCard key={`${review.author}-${index}`} review={review} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ReviewCardSkeleton() {
  return (
    <article className="w-full min-w-0 rounded-[14px] bg-input px-4 py-3.5">
      <div className="mb-1.5 flex items-start justify-between gap-3">
        <div className="skeleton h-4 w-28 rounded-full" />
        <div className="skeleton h-3.5 w-20 rounded-full" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="skeleton h-3.5 w-full rounded-full" />
        <div className="skeleton h-3.5 w-4/5 rounded-full" />
      </div>
    </article>
  )
}

export function ProductInfoPanelSkeleton() {
  return (
    <section
      className="flex w-full min-w-0 max-w-166 flex-col gap-5 rounded-[20px] bg-surface p-9"
      aria-hidden="true"
    >
      <div className="skeleton h-4 w-24 rounded-full" />
      <div className="skeleton h-10 w-full rounded-[14px]" />
      {/* <div className="skeleton h-10 w-4/5 rounded-[14px]" /> */}

      <div className="flex flex-wrap items-center gap-4">
        <div className="skeleton h-5 w-16 rounded-full" />
        <div className="skeleton h-5 w-24 rounded-full" />
        <div className="skeleton ml-auto h-5 w-28 rounded-full" />
      </div>

      <div className="flex flex-wrap items-end gap-3">
        <div className="skeleton h-9 w-28 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
        <div className="skeleton h-5 w-12 rounded-full" />
      </div>

      <hr className="border-border" />

      <div className="flex flex-col gap-2">
        <div className="skeleton h-5 w-28 rounded-full" />
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-full rounded-full" />
          <div className="skeleton h-4 w-full rounded-full" />
          <div className="skeleton h-4 w-5/6 rounded-full" />
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <div className="skeleton h-13 min-w-55 rounded-[14px]" />
        <div className="skeleton h-13 min-w-40 rounded-[14px]" />
      </div>

      <div className="flex flex-col gap-3">
        <div className="skeleton h-5 w-20 rounded-full" />
        <div className="flex min-w-0 flex-col gap-3">
          {Array.from({ length: 2 }, (_, index) => (
            <ReviewCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
