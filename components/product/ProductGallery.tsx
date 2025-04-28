"use client"

import { useState } from "react"
import { ProductCard } from "./ProductCard"


interface Product {
  id: string
  title: string
  price: number
  imageSrc: string
  imageAlt: string
  category: string
}

interface ProductGalleryProps {
  products: Product[]
}

export function ProductGallery({ products }: ProductGalleryProps) {

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            imageSrc={product.imageSrc}
            imageAlt={product.imageAlt}
            onAddToCart={() => console.log(`Added ${product.title} to cart`)}
            onBuyNow={() => console.log(`Buy now clicked for ${product.title}`)}
          />
        ))}
      </div>
    </div>
  )
}
