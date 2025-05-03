
import { ProductGallery } from "@/components/product/ProductGallery";
import ProductList from "@/components/shop/ProductList";
import ShopHero from "@/components/shop/ShopHero";
import { Input } from "@/components/ui/input";
import { Search, SlidersHorizontal } from "lucide-react";


export default function Shop() {

  return (
    <div>
      <ShopHero />

      <ProductList />
    </div>
  );
}
//  <div className="max-w-6xl mx-auto p-8">
//       <h1 className="text-3xl font-bold mb-2">Shop</h1>
//       <ProductGallery products={products}  />
//     </div>
