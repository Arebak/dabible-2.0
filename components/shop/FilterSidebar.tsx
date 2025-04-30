"use client";

import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import UseCustomFilter from "@/hooks/customFilter";

type Size = {
  name: string;
  selected: boolean;
};
type Colors = {
  name: string;
  hex: string;
  selected: boolean;
};

const categories = ["T-shirts", "Shorts", "Shirts", "Hoodie", "Jeans"];

interface FilterSidebarProps {
  setSelectedSizes: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedColors: React.Dispatch<React.SetStateAction<string[]>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  setSelectedSizes,
  setSelectedColors,
  setCategory,
}) => {
  const [sizes, setSizes] = useState<Size[]>([
    { name: "XX-Small", selected: true },
    { name: "X-Small", selected: true },
    { name: "Small", selected: true },
    { name: "Medium", selected: false },
    { name: "Large", selected: false },
    { name: "X-Large", selected: false },
    { name: "XX-Large", selected: false },
    { name: "3X-Large", selected: false },
    { name: "4X-Large", selected: false },
  ]);

  const [colors, setColors] = useState<Colors[]>([
    { name: "green", hex: "#00C12B", selected: true },
    { name: "red", hex: "#F50606", selected: true },
    { name: "yellow", hex: "#F5DD06", selected: false },
    { name: "orange", hex: "#F57906", selected: false },
    { name: "lightblue", hex: "#06CAF5", selected: false },
    { name: "blue", hex: "#063AF5", selected: false },
    { name: "purple", hex: "#7D06F5", selected: false },
    { name: "pink", hex: "#F506A4", selected: false },
    { name: "white", hex: "#FFFFFF", selected: false },
    { name: "black", hex: "#000000", selected: false },
  ]);
  const updateSize = (sizeName: string, value: boolean): void => {
    setSizes((prev) =>
      prev.map((size) =>
        size.name === sizeName ? { ...size, selected: value } : size
      )
    );
  };

  const updateColors = (colorName: string, value: boolean): void => {
    setColors((prev) =>
      prev.map((color) =>
        color.name === colorName ? { ...color, selected: value } : color
      )
    );
  };

  const displaySelected = () => {
    const userSizes = sizes.filter((s) => s.selected).map((s) => s.name);
    const userColors = colors.filter((c) => c.selected).map((c) => c.name);

    setSelectedSizes(userSizes);
    setSelectedColors(userColors);
  };

  return (
    <aside className="flex-shrink-0 w-[300px] p-4 border rounded-2xl space-y-6 h-fit">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Filters</h2>
        <SlidersHorizontal className="w-5 h-5" />
      </div>

      <div className="space-y-2">
        {categories.map((cat) => (
          <div
            key={cat}
            className="text-sm text-gray-800 hover:underline cursor-pointer"
          >
            {cat}
          </div>
        ))}
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Price</h3>
          <ChevronDown className="w-4 h-4" />
        </div>
        <Slider defaultValue={[50, 200]} min={0} max={300} step={10} />
        <div className="flex justify-between text-sm mt-2">
          <span>$50</span>
          <span>$200</span>
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Colors</h3>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`w-8 h-8 rounded-full border cursor-pointer relative`}
              style={{ background: color.hex }}
              onClick={() => updateColors(color.name, !color.selected)}
            >
              {color.selected && (
                <Check
                  size={16}
                  className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  text-white ${
                    color.name === "white" && "!text-black"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between items-center mb-2">
          <h3 className="font-medium">Size</h3>
          <ChevronDown className="w-4 h-4" />
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => (
            <button
              key={size.name}
              className={`text-xs px-3.5 py-1.5 rounded-full border cursor-pointer hover:bg-[#023E8A] hover:text-white ${
                size.selected ? "bg-[#023E8A] text-white" : "bg-gray-100"
              }`}
              onClick={() => updateSize(size.name, !size.selected)}
            >
              {size.name}
            </button>
          ))}
        </div>
      </div>

      <Button
        className="w-full rounded-full bg-blue-800 text-white hover:bg-blue-900"
        onClick={displaySelected}
      >
        Apply Filter
      </Button>
    </aside>
  );
};
export default FilterSidebar;
