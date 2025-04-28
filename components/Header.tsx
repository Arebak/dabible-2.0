"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronsDown, Heart, ShoppingCart } from "lucide-react";

import { useState } from "react";
import MobileMenu from "./mobile-menu";
import { useRouter } from "next/navigation";

export default function Header() {
  const [showProductsDropdown, setShowProductsDropdown] = useState(false);
  const route = useRouter();

  return (
    <header className="container mx-auto px-4 py-4 relative">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Image
            src="/png/Dabible Foundation Logo.png"
            alt="Dabible Logo"
            width={120}
            height={40}
            className="mr-8"
          />
        </div>

        <nav className="hidden md:flex items-center gap-x-12">
          <Link href="/" className="text-gray-700 hover:text-gray-900">
            Home
          </Link>
          <Link href="/about" className="text-gray-700 hover:text-gray-900">
            About Us
          </Link>
          <div className="relative group">
            <button
              className="text-gray-700 hover:text-gray-900 flex items-center"
              onClick={() => setShowProductsDropdown(!showProductsDropdown)}
              onBlur={() =>
                setTimeout(() => setShowProductsDropdown(false), 100)
              }
            >
              Products <ChevronDown className="ml-1" />
            </button>
            {showProductsDropdown && (
              <div className="absolute left-0 mt-3 w-48 bg-white border rounded-md shadow-lg z-10">
                <div className="py-1">
                  <Link
                    href="#"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Product Category
                  </Link>
                </div>
              </div>
            )}
          </div>
          <Link href="/blog" className="text-gray-700 hover:text-gray-900">
            Blog
          </Link>
          <Link href="/shop" className="text-gray-700 hover:text-gray-900">
            Shop
          </Link>
        </nav>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="flex items-center border-2 border-[#023E8A] text-[#023E8A] "
          >
            <ShoppingCart className="h-4 w-4 mr-1 text-[#023E8A]" />
            <span className="hidden sm:inline">CART</span>
          </Button>
          <Button onClick={() => route.push("/donation")} className="bg-[#C8385E] hover:bg-[#C8385E]/90 text-white">
            <span className="hidden sm:inline">DONATE</span>
            <span className="sm:hidden">
              <Heart className="h-4 w-4" />
            </span>
          </Button>
          {/* Mobile Menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
