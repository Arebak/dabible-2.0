"use client";

import { useState } from "react";
import { ProductCard } from "./ProductCard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";

const ITEMS_PER_PAGE = 9;

export function ProductGallery({ products = [] }: ProductGalleryProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const safeProducts = Array.isArray(products) ? products : [];
  const totalPages = Math.ceil(safeProducts.length / ITEMS_PER_PAGE);

  console.log("Products:", safeProducts);

  const paginatedProducts = safeProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="w-full flex gap-8 flex-wrap justify-center">
        {paginatedProducts?.map((product) => (
          <Link href={`/shop/${product.id}`} key={product.id}>
            <ProductCard
              key={product.id}
              title={product.title}
              price={product.price}
              imageSrc={product.imageSrc}
              imageAlt={product.imageAlt}
              onAddToCart={() => console.log(`Added ${product.title} to cart`)}
              onBuyNow={() => console.log(`Buy now clicked for ${product.title}`)} name={""} description={""} default_price={{
                unit_amount: 0,
                currency: ""
              }}            />
          </Link>
        ))}
      </div>

      <Pagination className="my-8 justify-center">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              onClick={() => goToPage(currentPage - 1)}
              className={
                currentPage === 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem key={i}>
              <button
                onClick={() => goToPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === i + 1
                    ? "bg-black text-white"
                    : "hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              onClick={() => goToPage(currentPage + 1)}
              className={
                currentPage === totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
