import { useState } from 'react'

type ProductGalleryProps = {
  images: string[]
  alt: string
}

export function ProductGallery({ images, alt }: ProductGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex] ?? images[0]

  return (
    <div className="flex w-full max-w-160 flex-col gap-4">
      <div className="flex h-130 items-center justify-center overflow-hidden rounded-[20px] bg-image">
        {selectedImage ? (
          <img src={selectedImage} alt={alt} className="h-full w-full object-cover" />
        ) : (
          <span className="text-[15px] font-medium leading-[1.45] text-text-secondary">
            Product Image
          </span>
        )}
      </div>

      <div className="grid grid-cols-4 gap-4">
        {images.map((image, index) => {
          const isSelected = index === selectedIndex

          return (
            <button
              key={image}
              type="button"
              aria-label={`View image ${index + 1}`}
              onClick={() => setSelectedIndex(index)}
              className={[
                'h-24 overflow-hidden rounded-[14px] transition-colors',
                isSelected ? 'border-2 border-primary bg-active' : 'bg-image hover:bg-border',
              ].join(' ')}
            >
              <img src={image} alt="" className="h-full w-full object-cover" />
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function ProductGallerySkeleton() {
  return (
    <div className="flex w-full max-w-160 flex-col gap-4" aria-hidden="true">
      <div className="skeleton h-130 rounded-[20px]" />

      <div className="grid grid-cols-4 gap-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div key={index} className="skeleton h-24 rounded-[14px]" />
        ))}
      </div>
    </div>
  )
}
