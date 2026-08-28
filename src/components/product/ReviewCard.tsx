import { Star } from 'lucide-react'
import type { ProductReview } from '../../types/product'

type ReviewCardProps = {
  review: ProductReview
}

function StarRating({ stars }: { stars: number }) {
  return (
    <div className="flex gap-0.5 text-[13px] leading-[1.45] text-[#ff9500]">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={[
            'size-3.5',
            index < stars ? 'fill-[#ff9500] text-[#ff9500]' : 'text-border',
          ].join(' ')}
        />
      ))}
    </div>
  )
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <article className="w-full min-w-0 rounded-[14px] bg-input px-4 py-3.5">
      <div className="mb-1.5 flex min-w-0 items-start justify-between gap-3">
        <p className="min-w-0 flex-1 wrap-break-word text-[14px] font-semibold leading-[1.45] text-text-primary">
          {review.author}
        </p>
        <div className="shrink-0">
          <StarRating stars={review.stars} />
        </div>
      </div>
      <p className="wrap-break-word text-[14px] leading-[1.45] text-text-secondary">{review.comment}</p>
    </article>
  )
}
