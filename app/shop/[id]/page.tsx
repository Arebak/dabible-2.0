/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
 
// import ColorSwatch from "@/components/ColorSwatch";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {  CreditCard, ShoppingCart } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState, useEffect, JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal } from "react";


type Colors = {
  name: string;
  hex: string;
  selected: boolean;
};
// interface Params {
//   params: {
//     id: string;
//   };
// }

export default function ProductPage() {
  const { id } = useParams() as { id?: string };
  const [product, setProduct] = useState<any>(null);

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

  useEffect(() => {
    if (!id) return;
    async function fetchProduct() {
      const res = await fetch(`/api/products/${id}`);
      if (res.ok) {
        setProduct(await res.json());
      }
    }
    fetchProduct();
  }, [id]);

  const updateColors = (name: string, selected: boolean) => {
    setColors((prev) =>
      prev.map((color) =>
        color.name === name ? { ...color, selected } : color
      )
    );
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="d-container grid grid-cols-1 md:grid-cols-2 gap-10 font-mada">
      {/* Left: Images */}
      <div className="grid grid-cols-4 gap-6 max-w-5xl w-full  place-items-center">
        {/* Left Column (Thumbnails) */}
        <div className="col-span-1 flex flex-col gap-4">
          <div className="border-2 border-red-400 rounded-lg p-1">
            <Image
              src="/png/front.png"
              alt="Front Thumbnail"
              width={200}
              height={200}
              className="rounded"
            />
          </div>
          <div className="bg-gray-100 rounded-lg p-1">
            <Image
              src="/png/back.png"
              alt="Back Thumbnail"
              width={200}
              height={200}
              className="rounded"
            />
          </div>
          <div className="bg-gray-100 rounded-lg p-1">
            <Image
              src="/png/model.png"
              alt="Model Thumbnail"
              width={200}
              height={200}
              className="rounded"
            />
          </div>
        </div>

        <div className="col-span-3 h-[600px] flex items-center justify-center bg-gray-100 rounded-xl p-6">
          <Image
            src="/png/close.png"
            alt="Main Shirt Image"
            width={500}
            height={500}
            className="rounded-xl"
          />
        </div>
      </div>

      {/* Right: Details */}
      <div>
        <h1 className="text-3xl font-bold font-domine">{product.title}</h1>
        <div className="flex gap-4 mt-2 items-center ">
          <p className="text-2xl font-semibold text-black">${product.price}</p>
          <p className="text-lg line-through text-gray-400">$260</p>
          <span className="text-red-500 text-sm">-40%</span>
        </div>

        <Separator className="mt-5" />

        {/* Sizes */}
        <div className="mt-6">
          <h2 className="mb-2 font-medium">Choose Size</h2>
          <div className="flex gap-2">
            {product.sizes.map((size: boolean | Key | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined) => (
              <Button
                key={String(size)}
                variant={"outline"}
                className="px-4 py-2 border hover:text-gray-100 rounded-full hover:bg-[#023E8A]"
              >
                {size}
              </Button>
            ))}
          </div>
        </div>

        <Separator className="mt-5" />

        {/* Colors */}
        <div className="mt-6">
          <h2 className="mb-2 font-medium">Select Colours</h2>
          <div className="flex flex-wrap gap-2">
            {product.colors.map((color: Key | null | undefined) => (
              <div
                key={color}
                className="w-8 h-8 rounded-full border cursor-pointer relative"
                style={{ background: color as string }}
              ></div>
            ))}
          </div>
        </div>

        {/* Description */}
        <div className="mt-8 p-4 border rounded-xl">
          <h3 className="font-semibold mb-2">Description & Fit</h3>
          <p className="text-sm text-gray-700">
            This graphic t-shirt which is perfect for any occasion. Crafted from
            a soft and breathable fabric, it offers superior comfort and style.
          </p>
        </div>

        {/* Shipping */}
        <div className="mt-4 p-4 border rounded-xl grid grid-cols-2 gap-4 text-sm">
          <div className="flex gap-x-3 items-center">
            <Image src="/svg/Frame.svg" alt="icon" width={16} height={16} />
            <div className="flex flex-col justify-start gap-y-0.5">
              <span className="text-[#00000099] font-medium">Discount:</span>{" "}
              <p>50%</p>
            </div>
          </div>

          <div className="flex gap-x-3 items-center">
            <Image src="/svg/Group.svg" alt="icon" width={16} height={16} />
            <div className="flex flex-col justify-start gap-y-0.5">
              <span className="text-[#00000099] font-medium">
                Shipping Fee:
              </span>{" "}
              <p>Not free</p>
            </div>
          </div>

          <div className="flex gap-x-3 items-center">
            <Image src="/svg/Group.svg" alt="icon" width={16} height={16} />
            <div className="flex flex-col justify-start gap-y-0.5">
              <span className="text-[#00000099] font-medium">
                Delivery Time:
              </span>{" "}
              <p>3-5 working days</p>
            </div>
          </div>

          <div className="flex gap-x-3 items-center">
            <Image src="/svg/Vector.svg" alt="icon" width={16} height={16} />
            <div className="flex flex-col justify-start gap-y-0.5">
              <span className="text-[#00000099] font-medium">
                Estimated delivery:
              </span>{" "}
              <p>April 20th - 24th, 2025</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center gap-x-12 mt-10">
          <Button
            variant={"outline"}
            className="flex items-center w-full max-w-[350px] h-12 justify-center text-xs gap-x-2 px-4 border border-[#1a3a89] text-[#1a3a89] font-medium rounded-lg hover:bg-[#1a3a89]/5 transition-colors"
          >
            <ShoppingCart size={20} />
            ADD TO CART
          </Button>

          <Button className="flex items-center w-full max-w-[350px] h-12 justify-center text-xs gap-x-2  px-4 bg-[#b84a64] text-white font-medium rounded-lg hover:bg-[#a43e57] transition-colors">
            <CreditCard size={20} />
            BUY NOW
          </Button>
        </div>
      </div>


    </div>
  );
}
