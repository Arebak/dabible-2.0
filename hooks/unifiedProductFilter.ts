import { useEffect, useState } from "react";

interface Product {
  id: string;
  name: string;
  sizes?: string[];
  colors?: string[];
  category: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface SourceOptions {
  stripe?: boolean;
  local?: boolean;
}

const useUnifiedProductFilter = (
  sizes: string[] | null,
  colors: string[] | null,
  category: string,
  sources: SourceOptions
) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);


  useEffect(() => {
    const fetchProducts = async () => {
        setLoading(true);
        const results: Product[] = [];

        try {
            if (sources.stripe) {
            const res = await fetch("/api/products");
            if (res.ok) {
                const data = await res.json();
                results.push(...(data?.data || data || []));
            }
            }

            if (sources.local) {
            const res = await fetch("/products.json");
            if (res.ok) {
                const data = await res.json();
                results.push(...(data || []));
            }
            }

            setAllProducts(results);
        } catch (error) {
            console.error("Failed to fetch products:", error);
        } finally {
            setLoading(false);
        }
    };

    fetchProducts();
  }, [sources]);

  useEffect(() => {
    if (!sizes?.length && !colors?.length && !category) {
      setFilteredProducts(allProducts);
      return;
    }

    const lowerSizes = sizes ? new Set(sizes.map((s) => s.toLowerCase())) : null;
    const lowerColors = colors ? new Set(colors.map((c) => c.toLowerCase())) : null;
    const lowerCategory = category?.toLowerCase() ?? null;

    const result = allProducts.filter((product) => {
      const matchesSize = lowerSizes && product.sizes?.some((s) => lowerSizes.has(s.toLowerCase()));
      const matchesColor = lowerColors && product.colors?.some((c) => lowerColors.has(c.toLowerCase()));
      const matchesCategory = lowerCategory && product.category?.toLowerCase() === lowerCategory;
      return matchesSize || matchesColor || matchesCategory;
    });

    setFilteredProducts(result);
  }, [sizes, colors, category, allProducts]);
  console.log("Filtered Products:", filteredProducts);
  console.log("All Products:", allProducts);

  return { products: filteredProducts, loading };
};

export default useUnifiedProductFilter;
