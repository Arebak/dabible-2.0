import { useEffect, useState } from "react";

interface FilterProps {
  sizes?: string[] | null;
  colors?: string[] | null;
  category?: string;
}

const useCustomFilter = (
  sizes: string[] | null,
  colors: string[] | null,
  category: string
) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/producs.json"); // ✅ spelling fix
        if (!res.ok) throw new Error("Network response was not ok");
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    fetchProducts();
  }, []);
  useEffect(() => {
    if (!sizes?.length && !colors?.length && !category) {
      setFilteredProducts(products); // no filters — show all
      return;
    }
    // Convert selected sizes & colors to lowercase sets for faster lookups
    const lowerSizes = sizes
      ? new Set(sizes.map((s) => s.toLowerCase()))
      : null;
    const lowerColors = colors
      ? new Set(colors.map((c) => c.toLowerCase()))
      : null;
    const lowerCategory = category ? category.toLowerCase() : null;

    const result = products.filter((product) => {
      const matchesSize =
        lowerSizes &&
        product?.sizes?.some((size) => lowerSizes.has(size.toLowerCase()));

      const matchesColor =
        lowerColors &&
        product?.colors?.some((color) => lowerColors.has(color.toLowerCase()));

      const matchesCategory =
        lowerCategory && product.category.toLowerCase() === lowerCategory;

      return matchesSize || matchesColor || matchesCategory;
    });

    setFilteredProducts(result);
    console.log(result);
    console.log(colors);
    console.log(sizes);
  }, [sizes, colors, category, products]);

  return filteredProducts;
};

export default useCustomFilter;
