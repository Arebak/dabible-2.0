"use client";

import { useState } from "react";
import Image from "next/image";
import { CreditCard, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
// import { Check } from "lucide-react";

export default function ShopHero() {
  const [selectedColor, setSelectedColor] = useState<string>("black");
  const colors = ["black", "pink", "blue", "white", "grey"];

  const handleAddToCart = () => {
    console.log(`Added Solar Audio Bible in ${selectedColor} to cart`);
  };

  // const handleBuyNow = () => {
  //   console.log(
  //     `Proceeding to checkout with Solar Audio Bible in ${selectedColor}`
  //   );
  // };

  return (
    <div className="relative bg-white flex justify-center items-end overflow-hidden pt-6 sm:pt-12 md:pt-[70px] min-h-[400px] sm:min-h-[450px] md:min-h-[518px] bg-[url(/png/blue.png)] bg-right bg-contain bg-no-repeat mb-10 sm:mb-16 md:mb-20">
      {/* Faded oval background */}
      <div
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full rounded-full"
        style={{
          background:
            "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
        }}
      />
      <div className="w-full max-w-7xl relative z-10 px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="space-y-4 sm:space-y-6">
            {/* Shipping badge */}
            <div className="flex items-start gap-x-2 sm:gap-x-3">
              <Image
                src="/png/arrow.png"
                width={60}
                height={38}
                alt="teal arrow"
                className="w-[60px] sm:w-[75px] h-auto"
              />
              <span className="text-[#189CAB] font-bold uppercase tracking-wide text-base sm:text-lg font-mada">
                Available for worldwide shipping
              </span>
            </div>

            {/* Product title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#062D3E] tracking-tight font-domine">
              SOLAR AUDIO BIBLE
            </h1>

            {/* Price */}
            <div className="text-4xl sm:text-5xl font-bold text-red-600 font-domine">
              $50.99
            </div>

            {/* Color selection */}
            <div className="flex items-center flex-wrap gap-2">
              <h3 className="text-base sm:text-lg font-semibold text-slate-900 w-full sm:w-auto mb-2 sm:mb-0">
                Color:
              </h3>
              {colors.map((color) => (
                <Button
                  variant={"outline"}
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "flex items-center justify-center w-14 sm:w-16 h-10 sm:h-12 text-sm sm:text-base capitalize border transition-all rounded-md hover:bg-[#023E8A] hover:text-white",
                    selectedColor === color
                      ? "bg-[#023E8A] text-white"
                      : "border-gray-300 bg-transparent hover:border-slate-300"
                  )}
                >
                  {color}
                </Button>
              ))}
            </div>

            {/* Action buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-x-8 pt-4 max-w-[600px]">
              <Button
                variant="outline"
                size="lg"
                onClick={handleAddToCart}
                className="uppercase bg-transparent flex items-center w-full h-11 sm:h-12 justify-center text-xs sm:text-sm gap-x-2 px-4 border-2 border-[#1a3a89] text-[#1a3a89] font-medium rounded-lg hover:bg-[#1a3a89]/5 transition-colors"
              >
                <ShoppingCart className="h-4 sm:h-5 w-4 sm:w-5" />
                Add to cart
              </Button>

              <button className="flex items-center w-full h-11 sm:h-12 justify-center text-xs sm:text-sm gap-x-2 px-4 bg-[#b84a64] text-white font-medium rounded-lg hover:bg-[#a43e57] transition-colors">
                <CreditCard className="h-4 sm:h-5 w-4 sm:w-5" />
                BUY NOW
              </button>
            </div>
          </div>

          {/* Product image */}
          <div className="relative w-full aspect-square sm:aspect-[4/3] md:aspect-[816/500] max-w-[816px] mx-auto">
            <Image
              src="/png/audio.png"
              alt="Solar Audio Bible devices in multiple colors"
              className="object-contain"
              priority
              fill
            />
          </div>
        </div>
      </div>
    </div>
  );
}
