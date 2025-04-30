"use client";

import { Search, SlidersHorizontal } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { ProductGallery } from "../product/ProductGallery";
import FilterSidebar from "./FilterSidebar";
import useCustomFilter from "@/hooks/customFilter";

const ProductList = () => {
  const [FilterVisible, setFilterVisible] = useState(false);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const filteredValues = useCustomFilter(selectedSizes, selectedColors, "");

  return (
    <div className="">
      <div className="l-container flex justify-between items-center">
        <h1 className="text-3xl text-[#023E8A] font-bold mb-2 font-domine">
          Shop more products
        </h1>

        <div className=" flex gap-x-6 items-center">
          <div
            className="border border-[#A3A3A3] flex gap-x-4 items-center p-2 rounded-md cursor-pointer"
            onClick={() => setFilterVisible(!FilterVisible)}
          >
            <span className="text-sm">Filter</span>
            <SlidersHorizontal />
          </div>
          <div className="border border-[#A3A3A3] bg-[#F0F0F0] flex items-center px-3 rounded-full w-[312px]">
            <Search className="text-[#00000066]" />
            <Input className="!ring-0 !border-0 !outline-0" />
          </div>
        </div>
      </div>

      {/* products  */}
      <div className="l-container flex gap-x-5 ">
        {FilterVisible && (
          <FilterSidebar
            setSelectedSizes={setSelectedSizes}
            setSelectedColors={setSelectedColors}
            setCategory={setCategory}
          />
        )}
        <ProductGallery products={filteredValues} />
      </div>
    </div>
  );
};
export default ProductList;
