import { Star } from 'lucide-react'
import type { Review } from '../../data/mockProductDetails'

type ReviewCardProps = {
  review: Review
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
    <article className="rounded-[14px] bg-input px-4 py-3.5">
      <div className="mb-1.5 flex items-center justify-between">
        <p className="text-[14px] font-semibold leading-[1.45] text-text-primary">
          {review.author}
        </p>
        <StarRating stars={review.stars} />
      </div>
      <p className="text-[14px] leading-[1.45] text-text-secondary">
        {review.comment}
      </p>
    </article>
  )
}
