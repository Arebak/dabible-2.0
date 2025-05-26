import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { useState } from "react";

interface ProductHoverCardProps {
  LearnMoreLink?: string;
  Image1: string;
  Alt1: string;
  Image2: string;
  Alt2: string;
  Image3: string;
  ProductName: string;
  ProductTag: string;
  BackgroundColor: string;
  TextPrimaryColor: string;
  ButtonTextColor: string;
  ButtonBackgroundColor: string;
  ProductionDescription: string;
  Feature1: string;
  Feature2: string;
  Feature3: string;
  Feature4: string;
}

const ProductHoverCard = ({
  LearnMoreLink = "#learn-more",
  Image1,
  Alt1,
  Image2,
  Alt2,
  Image3,
  BackgroundColor,
  TextPrimaryColor,
  ProductName,
  ProductTag,
  ProductionDescription,
  ButtonTextColor,
  ButtonBackgroundColor,
  Feature1,
  Feature2,
  Feature3,
  Feature4,
}: ProductHoverCardProps) => {
  const [hovered, setHovered] = useState(false);

  const FlamesIcon = () => (
    <Image src="/svg/flames.svg" alt="Flame" width={20} height={20} className="h-8 w-8" />
  );

  const features = [Feature1, Feature2, Feature3, Feature4];

  return (
    <div
      style={{ background: BackgroundColor, color: TextPrimaryColor }}
      className="group relative h-[300px] md:h-[500px] rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 flex flex-col"
    >
      <div className="absolute -top-4 -translate-x-1/2 left-1/2 animate-spin-slow">
        <Image src={Image1} alt={Alt1} width={400} height={400} />
      </div>

      <div className="flex justify-center items-center cursor-pointer">
        <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
          <Image src={Image2} alt={Alt2} fill className="object-contain" />
          <div
            className="absolute bottom-0 left-3 w-full h-28 z-0"
            style={{
              backgroundImage: `linear-gradient(to top, ${BackgroundColor}, ${BackgroundColor}, transparent)`,
            }}
          ></div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="md:absolute left-8 bottom-8">
          <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-1 font-montserrat uppercase">
            {ProductName}
          </h3>
          <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat -mt-3 font-semibold uppercase">
            {ProductTag}
          </p>
        </div>
      </div>

      <div className="flex justify-end items-center absolute right-4 bottom-4 md:right-8 md:bottom-8">
        <Link href={LearnMoreLink} className="cursor-pointer">
          <Button style={{ color: ButtonTextColor, background: ButtonBackgroundColor }} 
            className="mt-4 text-white text-xs sm:text-sm">
            LEARN MORE →
          </Button>
        </Link>
      </div>

      <div className="absolute w-full h-full inset-0 text-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
        <div
          className="relative h-full w-full max-w-4xl rounded-3xl overflow-hidden"
          style={{
            backgroundImage: `url(${Image3})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              backgroundColor: hovered ? `${TextPrimaryColor}E6` : "transparent",
              backdropFilter: "blur(8px)",
            }}
            className="absolute inset-0 transition-all duration-300 ease-in-out"
          ></div>

          <div className="relative p-4 md:p-8 text-white h-full">
            <div className="space-y-4 h-full">
              <div className="">
                <h1 className="text-3xl md:text-4xl font-bold font-montserrat uppercase">{ProductName}</h1>
                <h1 className="text-3xl md:text-xl font-bold tracking-wide uppercase">{ProductTag}</h1>
              </div>

              <p className="text-md">{ProductionDescription}</p>

              <div className="space-y-2 py-4 h-full">
                {features.map((feature, index) => feature ? (
                  <div key={index} className="flex items-center gap-4">
                    <FlamesIcon />
                    <p className="text-md">{feature}</p>
                  </div>
                ): null)}
              </div>

              <div className="flex justify-end pt-6 absolute right-8 bottom-8">
                <Link href={LearnMoreLink} className="cursor-pointer">
                  <Button
                    style={{ color: ButtonTextColor, background: ButtonBackgroundColor }}
                    className="bg-white hover:bg-white cursor-pointer text-xs sm:text-sm"
                  >
                    LEARN MORE →
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductHoverCard;
