import { Star } from 'lucide-react'
import type { Product } from '../../data/mockProducts'

type ProductCardProps = {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="overflow-hidden rounded-[20px] bg-surface">
      <div className="h-[200px] bg-image" />

      <div className="flex flex-col gap-2 p-5">
        <p className="text-[12px] font-semibold uppercase leading-[1.45] text-primary">
          {product.category}
        </p>

        <h3 className="text-[16px] font-semibold leading-[1.45] text-text-primary">
          {product.title}
        </h3>

        <div className="flex items-center justify-between">
          <p className="text-[18px] font-bold leading-[1.45] text-text-primary">
            {product.price}
          </p>

          <p className="flex items-center gap-1 text-[13px] font-medium leading-[1.45] text-text-secondary">
            <Star className="size-3.5 fill-[#ff9500] text-[#ff9500]" />
            {product.rating}
          </p>
        </div>
      </div>
    </article>
  )
}
