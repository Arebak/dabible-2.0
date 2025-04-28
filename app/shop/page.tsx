import { ProductGallery } from "@/components/product/ProductGallery"

const products = [
  {
    id: "1",
    title: "T-shirt with Tape Details",
    price: 120,
    imageSrc: "/png/shirts/black.png",
    imageAlt: "Black t-shirt with NEW RULES text and tape details",
    category: "T-shirts",
  },
  {
    id: "2",
    title: "Hoodie with Logo Print",
    price: 180,
    imageSrc: "/png/shirts/peach.png",
    imageAlt: "Hoodie with logo print",
    category: "Hoodies",
  },
  {
    id: "3",
    title: "Slim Fit Jeans",
    price: 95,
    imageSrc: "/png/shirts/tgreen.png",
    imageAlt: "Slim fit jeans",
    category: "Pants",
  },
  {
    id: "4",
    title: "Graphic Print T-shirt",
    price: 85,
    imageSrc: "/png/shirts/stripes.png",
    imageAlt: "Graphic print t-shirt",
    category: "T-shirts",
  },
  {
    id: "5",
    title: "Cargo Pants",
    price: 110,
    imageSrc: "/png/shirts/black.png",
    imageAlt: "Cargo pants",
    category: "Pants",
  },
  {
    id: "6",
    title: "Zip-up Hoodie",
    price: 150,
    imageSrc: "/png/shirts/black.png",
    imageAlt: "Zip-up hoodie",
    category: "Hoodies",
  },
]


export default function ShopPage() {
  return (
    <div className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-2">Shop</h1>
      <ProductGallery products={products}  />
    </div>
  )
}
