/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Copy, CopyCheck } from "lucide-react";
import { useState } from "react";
import DonationDetails from "./DonationDetails";

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

  // const CopyToClipboard = () => {};
  return (
    <section className="d-container py-12 ">
      <div className="">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] text-center mb-6 font-domine">
          Alternative Methods
        </h2>

        <p className="text-center text-[#121212] mb-10 max-w-2xl mx-auto font-mada">
          DaBible Foundation is a registered 501 (C)(3) Non Profit both in USA
          and Nigeria. To donate from Nigeria, use our Nigerian bank account
          below.
        </p>

        <DonationDetails />
      </div>
    </section>
  );
}
