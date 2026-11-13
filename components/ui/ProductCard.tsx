'use client'

import { ImageOff } from 'lucide-react'
import Image from 'next/image'
import type { Product } from '@/data/products'

interface ProductCardProps {
  product: Product
  onClick: (product: Product) => void
  index?: number
}

export default function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <button
      onClick={() => onClick(product)}
      className="text-left w-full group bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
    >
      {/* Photo */}
      <div className="relative h-48 w-full flex-shrink-0 overflow-hidden bg-gray-50">
        {product.imagePath ? (
          <Image
            src={product.imagePath}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <ImageOff size={28} strokeWidth={1} className="opacity-15 text-dark-gray mb-1" />
          </div>
        )}

        {product.badges?.[0] && (
          <div className="absolute top-2 right-2">
            <span className="text-[10px] font-bold uppercase px-2 py-1 bg-brick text-white rounded-pill">
              {product.badges[0]}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <p className="text-[11px] font-heading font-semibold text-dark-gray uppercase tracking-wider mb-1">
          {product.brand}
        </p>
        <h3 className="font-heading font-bold text-charcoal text-sm uppercase leading-snug mb-1.5 group-hover:text-brick transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-dark-gray leading-relaxed line-clamp-2 flex-1 mb-3">
          {product.shortDescription}
        </p>
        <span className="text-brick text-sm font-heading font-medium cursor-pointer hover:underline">
          Request a quote
        </span>
      </div>
    </button>
  )
}
