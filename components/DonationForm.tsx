
"use client";

import type React from "react";
import { useState } from "react";
import { Shield } from "lucide-react";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { DonationPopup } from "./DonationPopup";

export function DonationForm() {
  const [amount, setAmount] = useState<string>("");
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const handleAmountSelect = (value: number) => {
    setSelectedAmount(value);
    setAmount(value.toString());
  };

  const handleCustomAmount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAmount(null);
    setAmount(e.target.value);
  };

  return (
<div className="bg-gray-50 p-4 sm:p-6 rounded-lg border border-[#CCCCCC]">
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
    <h3 className="text-lg sm:text-xl font-semibold font-nunito mb-2 sm:mb-0">
      Help us do more
    </h3>
    <div className="flex items-center text-sm text-gray-600">
      <Shield className="w-4 h-4 mr-1 text-amber-500" />
      <span>100% Secure Donation</span>
    </div>
  </div>

  <div className="mb-6">
    <p className="text-gray-700 mb-3 text-sm sm:text-base">Make your donation</p>
    <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-6">
      {[50, 100, 150, 200, 250, 300].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleAmountSelect(value)}
          className={`py-2 text-sm rounded-lg border transition ${
            selectedAmount === value
              ? "bg-[#023E8A] text-white border-blue-800"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
          }`}
        >
          ${value}
        </button>
      ))}
    </div>

    <div className="mb-6">
      <Label htmlFor="custom-amount">Enter Amount:</Label>
      <div className="relative mt-1">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-gray-500">$</span>
        </div>
        <Input
          id="custom-amount"
          type="text"
          placeholder="250.00"
          value={amount}
          onChange={handleCustomAmount}
          className="pl-7"
        />
      </div>
      <div className="text-xs text-gray-500 mt-1">
        I&apos;d like to help cover the transaction fees of $1.50 for my donation
      </div>
    </div>
  </div>

  <div className="mb-6">
    <h3 className="text-base sm:text-lg font-semibold mb-2">Who&apos;s giving today?</h3>
    <p className="text-sm text-gray-600 mb-4">
      We&apos;ll never share this information with anyone.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <Label htmlFor="first-name">First Name*</Label>
        <Input id="first-name" placeholder="First name" className="mt-1" />
      </div>
      <div>
        <Label htmlFor="last-name">Last Name*</Label>
        <Input id="last-name" placeholder="Last name" className="mt-1" />
      </div>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
      <div>
        <Label htmlFor="email">E-mail*</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone number*</Label>
        <div className="flex mt-1">
          <div className="flex items-center border rounded-l px-3 bg-gray-50 text-gray-500 text-sm">
            +1
          </div>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 000-0000"
            className="rounded-l-none"
          />
        </div>
      </div>
    </div>

    <div className="mb-4">
      <Label htmlFor="comments">Comments</Label>
      <Textarea
        id="comments"
        placeholder="Optional"
        className="mt-1 h-20 bg-[#FFFFFF]"
      />
    </div>

    <div className="text-start mb-4">
      <p className="text-sm text-[#A0072F] font-semibold">
        Already have an account?
      </p>
    </div>

    <Button
      onClick={() => setShowPopup(true)}
      className="w-full bg-[#023E8A] py-3 text-sm h-fit hover:bg-blue-900"
    >
      PROCEED TO CHECKOUT
    </Button>
  </div>

  {showPopup && (
    <DonationPopup
      email={"users email address"}
      onClose={() => setShowPopup(false)}
    />
  )}
</div>

  );
}
