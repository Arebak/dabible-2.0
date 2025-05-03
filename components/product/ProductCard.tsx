"use client"

import Image from "next/image"
import { ShoppingCart, CreditCard } from "lucide-react"
import { Button } from "../ui/button"

interface ProductCardProps {
  title: string
  price: number
  name: string
  description: string
  default_price: {
    unit_amount: number
    currency: string
  }
  imageSrc: string | (() => Promise<string>)
  imageAlt: string
  onAddToCart?: () => void
  onBuyNow?: () => void
}

export function ProductCard({ title, price, imageSrc, imageAlt, onAddToCart, onBuyNow, name }: ProductCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
  }).format(price)

  return (
    <div className="max-w-[380px]">
      <div className="bg-[#f2f2f2] p-6 rounded-2xl mb-4">
        <div className="flex justify-center">
          <Image
            src={imageSrc || "/placeholder.svg"}
            alt={imageAlt}
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-base font-bold">{title || name}</h3>
        <span className="text-lg font-bold">{formattedPrice}</span>
      </div>

      <div className="flex justify-between items-center">
        <Button
          onClick={onAddToCart}
          variant={"outline"}
          className="flex items-center w-[150px] h-12 justify-center text-xs gap-x-2 px-4 border-2 border-[#1a3a89] text-[#1a3a89] font-medium rounded-lg hover:bg-[#1a3a89]/5 transition-colors"
        >
          <ShoppingCart size={20} />
          ADD TO CART
        </Button>

        <button
          onClick={onBuyNow}
          className="flex items-center w-[150px] h-12 justify-center text-xs gap-x-2  px-4 bg-[#b84a64] text-white font-medium rounded-lg hover:bg-[#a43e57] transition-colors"
        >
          <CreditCard size={20} />
          BUY NOW
        </button>
      </div>
    </div>
  )
}
