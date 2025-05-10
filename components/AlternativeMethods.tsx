/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";

export default function AlternativeMethods() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(
        "Account Number: 0178194168, Account Name: Demilade Adetuberu"
      );
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const CopyToClipboard = () => {};
  return (
    <section className="container mx-auto py-12 px-4 ">
      <div className="max-w-7xl mx-auto ">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] text-center mb-6 font-domine">
          Alternative Methods
        </h2>

        <p className="text-center text-[#121212] mb-10 max-w-2xl mx-auto font-mada">
          DaBible Foundation is a registered 501 (C)(3) Non Profit both in USA
          and Nigeria. To donate from Nigeria, use our Nigerian bank account
          below.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* GT Bank Card */}
          <div className="bg-[#FAF9F9] rounded-lg border p-6 flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full  flex items-center justify-center mr-4">
                <Image
                  src="/png/gtb.png"
                  alt="GT Bank"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-[#023E8A] font-bold text-lg">
                GT Bank - Naira transfers only
              </h3>
            </div>

            <div className="space-y-2 mb-6">
              <div>
                <p className="text-gray-600 text-sm">Account Number:</p>
                <p className="font-bold">0178194168</p>
              </div>
              <div>
                <p className="text-gray-600 text-sm">Account Name:</p>
                <p className="font-bold">Demilade Adetuberu</p>
              </div>
            </div>

            <div className="mt-auto text-right">
              <Button
                variant="ghost"
                className="text-rose-600 hover:text-rose-700 p-0 flex items-center ml-auto"
                onClick={handleCopy}
              >
                {copied ? (
                  <>
                    <CopyCheck className="ml-2 h-4 w-4" />
                    Copied Details
                  </>
                ) : (
                  <>
                    <Copy className="ml-2 h-4 w-4" />
                    Copy Details
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Cashapp Card */}
          <div className="bg-[#FAF9F9] rounded-lg border p-6 flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mr-4">
                <Image
                  src="/png/cashapp.png"
                  alt="Cashapp"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-[#023E8A] font-bold text-lg">
                Donate using Cashapp
              </h3>
            </div>

            <div className="flex-grow mb-6">
              <p className="text-2xl font-bold">$dabible</p>
            </div>

            <div className="mt-auto text-right">
              <Button
                variant="ghost"
                className="text-rose-600 hover:text-rose-700 p-0 flex items-center ml-auto"
              >
                Use Cashapp <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Debit Card */}
          <div className="bg-[#FAF9F9] rounded-lg border p-6 flex flex-col">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-300 flex items-center justify-center mr-4">
                <Image
                  src="/png/debit.png"
                  alt="Debit Card"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
              </div>
              <h3 className="text-[#023E8A] font-bold text-lg">Debit Card</h3>
            </div>

            <div className="flex-grow mb-6">
              <p className="text-xl font-bold">Available for all countries</p>
            </div>

            <div className="mt-auto text-right">
              <Button
                variant="ghost"
                className="text-rose-600 hover:text-rose-700 p-0 flex items-center ml-auto"
              >
                Use Debit Card <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
