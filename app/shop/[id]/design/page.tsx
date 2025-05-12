/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useEffect, useState, useMemo } from 'react';

export default function DesignPage() {
  const params = useParams();
  const productId = params?.id;

  const [product, setProduct] = useState<any>(null);
  const [designFile, setDesignFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState<string | null>(null);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [showShippingInfo, setShowShippingInfo] = useState(false);

  useEffect(() => {
    if (productId) {
      fetch(`/api/printful-catalog/${productId}`)
        .then(res => res.json())
        .then(data => {
          setProduct(data);
          console.log('[Product Detail]', data);
          const firstVariant = data?.variants?.[0];
          if (firstVariant) {
            setSelectedColor(firstVariant.color_code);
            setSelectedSize(firstVariant.size);
          }
        });
    }
  }, [productId]);

  const selectedVariant = useMemo(() => {
    if (!product?.variants) return null;
    return (
      product.variants.find(
        (v: any) => v.size === selectedSize && v.color_code === selectedColor
      ) ||
      product.variants.find((v: any) => v.color_code === selectedColor)
    );
  }, [selectedSize, selectedColor, product]);

  const thumbnailsByColor = useMemo(() => {
    if (!product?.variants || !selectedColor) return [];
    return product.variants.filter((v: any) => v.color_code === selectedColor);
  }, [product, selectedColor]);

  // console.log("Product", product?.product?.image);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setDesignFile(file);
    console.log('[User Design File]', file);
  };

  const handleUpload = async () => {
    if (!designFile) return;

    const formData = new FormData();
    formData.append('file[]', designFile);

    try {
      const res = await fetch('/api/printful-upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        console.log('[Uploaded File]', data);
        setUploadStatus(`Uploaded successfully. File ID: ${data.result.id}`);
      } else {
        throw new Error(data.error || 'Upload failed');
      }
    } catch (error: any) {
      console.error('[Upload Error]', error);
      setUploadStatus(`Upload failed: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-10">
      {/* Left Side: Vertical Gallery */}
      <div className="flex gap-4 md:max-h-[600px]">
        <div id={product?.product?.id} className="flex flex-col gap-4 overflow-y-auto max-h-[600px] w-40 p-1">
          {thumbnailsByColor.map((variant: any) => (
            <Image
              key={variant.id}
              src={variant.image}
              alt={`${variant.color} - ${variant.size}`}
              width={120}
              height={120}
              className={`w-full h-30 border rounded object-contain cursor-pointer hover:ring-2 hover:ring-[#A0072F] ${
                selectedVariant?.id === variant.id ? 'ring-2 ring-[#A0072F]' : ''
              }`}
              onClick={() => {
                setSelectedSize(variant.size);
                setSelectedColor(variant.color_code);
              }}
            />
          ))}
        </div>
        <div className="w-full aspect-square border rounded-xl overflow-hidden">
          <Image src={selectedVariant?.image || product?.product?.image} alt={product?.product?.title} className="object-contain w-full h-full" width={120} height={120} />
          
        </div>
      </div>

      {/* Right Side: Product Info and Selectors */}
      <div className="space-y-4">
        <div className='border-b pb-4'>
        <h1 className="text-3xl font-semibold uppercase font-domine">{product?.product?.title}</h1>
        <div className="flex items-center gap-4 text-xl">
          {selectedVariant ? (
            <>
              <span className="font-bold text-2xl font-nunito text-green-700">${parseFloat(selectedVariant.price).toFixed(2)}</span>
              {selectedVariant?.in_stock !== undefined && (
                <span className={`inline-block text-xs font-medium mt-1 px-2.5 py-0.5 rounded-full ${
                  selectedVariant.in_stock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {selectedVariant.in_stock ? 'In Stock' : 'Out of Stock'}
                </span>
              )}
            </>
          ) : (
            <span className="text-gray-500">Select size and color</span>
          )}
        </div>
        {selectedVariant?.availability_status?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            <span className="text-sm font-semibold">Available in:</span>
            {/** Region name mapping for display */}
            {selectedVariant.availability_status.map((status: any, idx: number) => {
              const regionNames: Record<string, string> = {
                US: 'United States',
                EU: 'European Union',
                CA: 'Canada',
                AU: 'Australia',
                // Add more as needed
              };
              return (
                
                <span
                  key={idx}
                  className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full"
                >
                  {regionNames[status.region] || status.region}
                </span>
                
              );
            })}
          </div>
        )}
        </div>

        <div className='border-b pb-4'>
          <h2 className="font-medium mb-2 font-nunito">Choose Size</h2>
          <div className="flex gap-3 flex-wrap">
            {["S", "M", "L", "XL", "2XL", "3XL"].map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-4 py-2 border rounded-3xl font-medium ${
                  selectedSize === size ? 'bg-[#023E8A] text-white border-blue-600' : 'bg-white text-gray-800 border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h2 className="font-medium mb-2 font-nunito">Select Colour</h2>
          <div className="flex gap-3">
            {[...new Set(product?.variants?.map((v: any) => v.color_code))].map((color, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedColor("#000")}
                className={`w-8 h-8 rounded-full border-2 relative flex items-center justify-center focus:outline-none ${
                  selectedColor === color ? 'ring-2 ring-blue-500 border-blue-500' : 'border-gray-300'
                }`}
                // style={{ backgroundColor: color }}
                aria-label={`Select color ${color}`}
              >
                {selectedColor === color && (
                  <svg
                    className="w-4 h-4"
                    fill={color === '#ffffff' ? 'black' : 'white'}
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>
            ))}
          </div>
        </div>

        <div className="border rounded p-4 space-y-2 relative">
          <div
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="flex items-center justify-between cursor-pointer font-semibold font-nunito"
          >
            <span>Description and Fit</span>
            <span className="text-gray-600">{showFullDescription ? '-' : '+'}</span>
          </div>
          <div
            className={`relative text-gray-700 whitespace-pre-line font-nunito transition-all duration-300 ease-in-out ${
              showFullDescription ? 'max-h-full' : 'max-h-[3.0rem] overflow-hidden'
            }`}
          >
            <p>{product?.product?.description}</p>
            {!showFullDescription && (
              <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-white to-transparent pointer-events-none" />
            )}
          </div>
        </div>

        <div className="border rounded p-4 space-y-4">
          <div
            onClick={() => setShowShippingInfo(prev => !prev)}
            className="flex items-center justify-between cursor-pointer font-semibold font-nunito"
          >
            <span>Shipping & Availability</span>
            <span className="text-gray-600">{showShippingInfo ? '-' : '+'}</span>
          </div>
          {showShippingInfo && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {selectedVariant?.discount && (
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-rose-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.5 7.5L12 2 3.5 7.5v9L12 22l8.5-5.5v-9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Discount</p>
                    <p className="font-semibold">{selectedVariant.discount}</p>
                  </div>
                </div>
              )}

              {selectedVariant?.delivery_time && (
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-rose-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 7V5a4 4 0 118 0v2h1a2 2 0 012 2v8a2 2 0 01-2 2H7a2 2 0 01-2-2V9a2 2 0 012-2h1zm2 0h4V5a2 2 0 10-4 0v2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Delivery time</p>
                    <p className="font-semibold">{selectedVariant.delivery_time}</p>
                  </div>
                </div>
              )}

              {selectedVariant?.shipping_fee !== undefined && (
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-rose-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M9.5 3A4.5 4.5 0 015 7.5v9a4.5 4.5 0 004.5 4.5h9a4.5 4.5 0 004.5-4.5v-9A4.5 4.5 0 0018.5 3h-9zM8 9h2v6H8V9zm4 0h2v6h-2V9z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Shipping fee</p>
                    <p className="font-semibold">
                      {selectedVariant.shipping_fee === 0 ? 'Free' : selectedVariant.shipping_fee}
                    </p>
                  </div>
                </div>
              )}

              {selectedVariant?.estimated_delivery && (
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-rose-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3 3h18v2H3V3zm2 4h14v2H5V7zm0 4h14v2H5v-2zm0 4h14v2H5v-2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Estimated delivery</p>
                    <p className="font-semibold">{selectedVariant.estimated_delivery}</p>
                  </div>
                </div>
              )}

              {selectedVariant?.in_stock !== undefined && (
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-rose-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M5 12l5 5L20 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">In Stock</p>
                    <p className="font-semibold">{selectedVariant.in_stock ? 'Yes' : 'No'}</p>
                  </div>
                </div>
              )}

              {selectedVariant?.availability_status?.length > 0 && (
                <div className="flex gap-4 items-start">
                  <div className="flex items-center justify-center bg-gray-100 rounded-full p-2">
                    <svg className="w-6 h-6 text-rose-700" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2a10 10 0 100 20 10 10 0 000-20zM11 11V7h2v6h-4v-2h2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Availability</p>
                    {/** Region name mapping for display */}
                    {(() => {
                      const regionNames: Record<string, string> = {
                        US: 'United States',
                        EU: 'European Union',
                        CA: 'Canada',
                        AU: 'Australia',
                        // Add more if needed
                      };
                      return (
                        <ul className="text-sm font-semibold">
                          {selectedVariant.availability_status.map((status: any, idx: number) => (
                            <li key={idx}>
                              {regionNames[status.region] || status.region}
                            </li>
                          ))}
                        </ul>
                      );
                    })()}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex gap-6 mt-4">
          <button className="flex-1 px-6 py-3 bg-blue-700 text-white rounded font-semibold hover:bg-blue-800 transition">
            Add to Cart
          </button>
          <button className="flex-1 px-6 py-3 bg-pink-600 text-white rounded font-semibold hover:bg-pink-700 transition">
            Buy Now
          </button>
        </div>

        {/* Upload section at the bottom */}
        <section className="mt-8">
          <label className="block mb-2 font-medium">Upload Your Design</label>
          <input type="file" accept="image/png,image/svg+xml" onChange={handleFileChange} />
          {designFile && (
            <p className="mt-2 text-sm text-gray-600">
              Selected file: <strong>{designFile.name}</strong>
            </p>
          )}
          <button
            disabled={!designFile}
            className={`mt-4 px-4 py-2 text-white rounded ${!designFile ? 'bg-gray-400' : 'bg-blue-600'}`}
            onClick={handleUpload}
          >
            {uploadStatus?.includes('Uploading') ? 'Uploading...' : 'Upload to Printful'}
          </button>
          {uploadStatus && (
            <div className="mt-2 text-sm text-blue-700">
              {uploadStatus}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}