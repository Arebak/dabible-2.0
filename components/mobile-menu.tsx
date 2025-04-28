"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronDown, Menu, X } from "lucide-react"

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" className="ml-2" aria-label="Menu" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-16 left-0 right-0 bg-white shadow-lg z-50 px-4 py-2 border-t">
          <nav className="flex flex-col space-y-4 py-4">
            <Link href="#" className="text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
              Home
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
              About Us
            </Link>
            <div className="relative">
              <button className="text-gray-700 hover:text-gray-900 py-2 flex justify-between items-center w-full">
                Products
                <ChevronDown className="h-4 w-4" />
              </button>
            </div>
            <Link href="#" className="text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
              Blog
            </Link>
            <Link href="#" className="text-gray-700 hover:text-gray-900 py-2" onClick={() => setIsOpen(false)}>
              Shop
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
