import { useState } from 'react'

const THUMBNAIL_COUNT = 4

export function ProductGallery() {
  const [selectedIndex, setSelectedIndex] = useState(0)

  return (
    <div className="flex w-full max-w-160 flex-col gap-4">
      <div className="flex h-130 items-center justify-center rounded-[20px] bg-image">
        <span className="text-[15px] font-medium leading-[1.45] text-text-secondary">
          Product Image
        </span>
      </div>

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: THUMBNAIL_COUNT }, (_, index) => {
          const isSelected = index === selectedIndex

          return (
            <button
              key={index}
              type="button"
              aria-label={`View image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={[
                'h-24 rounded-[14px] transition-colors',
                isSelected ? 'border-2 border-primary bg-active' : 'bg-image hover:bg-border',
              ].join(' ')}
            />
          )
        })}
      </div>
    </div>
  )
}
