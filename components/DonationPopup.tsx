"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

export function DonationPopup({
  email,
  onClose,
}: {
  email?: string;
  onClose?: () => void;
}) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(true);
  }, []);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[935px] p-0 border-none rounded-2xl">
        <DialogTitle className="hidden">Donation Popup</DialogTitle>
        <div className="relative p-8 flex flex-col items-center">
          <div className="my-4">
            <Image
              src="/png/Kindness1.png"
              alt="Hand illustration"
              width={189}
              height={189}
              priority
            />
          </div>

          <h2 className="text-3xl font-bold mb-4 text-center">
            Thank You for Donating!
          </h2>

          <p className="text-center mb-1 max-w-md">
            Your generosity is making a real difference. We've received your
            donation successfully. You'll receive a confirmation email
          </p>

          <p className="font-bold mb-8">{email} shortly.</p>

          <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
            <Button
              variant="outline"
              className="flex-1 border-2 font-sm  h-11 border-[#A0072F] text-[#a83244] hover:bg-[#a83244]/10 hover:text-[#a83244] hover:border-[#a83244]"
            >
              SHARE THE CAUSE
            </Button>
            <Button className="flex-1 h-11 font-sm bg-[#1a4b8c] hover:bg-[#1a4b8c]/90">
              GO TO DASHBOARD
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
