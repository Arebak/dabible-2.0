"use client";

import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import DonateButton from "./DonateButton";

type DonationCardProps = {
  imageSrc: string;
  alt: string;
  title: string;
  description: string;
  progress: number;
  goalLabel: string;
  goalValue: string;
  raisedLabel: string;
  raisedValue: string;
};

const DonationCard = ({
  imageSrc,
  alt,
  title,
  description,
  progress,
  goalLabel,
  goalValue,
  raisedLabel,
  raisedValue,
}: DonationCardProps) => {
  return (
    <div className="border rounded-lg p-6">
      <Image
        src={imageSrc}
        alt={alt}
        width={400}
        height={200}
        className="w-full h-40 md:h-64 object-cover rounded-lg"
      />

      <h3 className="font-bold text-xl leading-8 md:text-2xl mb-2 font-nunito mt-5 max-w-[520px] ">{title}</h3>
      <p className="text-xs md:text-sm text-gray-600 mb-4 font-mada">
        {description}
      </p>
      <div className="mb-4">
        <div className="flex justify-between text-xs md:text-sm mb-1">
          <span>{progress}%</span>
        </div>
        <Progress value={progress} className="h-2 bg-gray-200" />
      </div>
      <div className="flex justify-between mb-4">
        <div>
          <p className="text-xs text-gray-500">{goalLabel}</p>
          <p className="font-bold text-sm md:text-base">{goalValue}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500">{raisedLabel}</p>
          <p className="font-bold text-sm md:text-base text-rose-600">
            {raisedValue}
          </p>
        </div>
      </div>
      <DonateButton />
    </div>
  );
};

export default DonationCard;
