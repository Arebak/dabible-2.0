"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import "animate.css";

const images = [
  { src: "/png/donation1.png", height: "512px", top: "0px" },
  { src: "/png/donation2.png", height: "470px", top: "100px" },
  { src: "/png/donation3.png", height: "512px", top: "0px" },
  { src: "/png/donation1.png", height: "470px", top: "100px" },
];

const StaggeredImageSection = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (
        window.scrollY + window.innerHeight >
        document.getElementById("image-section")!.offsetTop + 100
      ) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section
      id="image-section"
      className="px-4 sm:px-6 md:px-10 flex gap-3 sm:gap-4 md:gap-6 flex-wrap justify-center py-8 sm:py-12 md:py-16 bg-white overflow-y-hidden"
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={`rounded-xl overflow-hidden transition duration-700 w-full sm:w-[45%] md:w-auto ${
            visible
              ? `animate__animated animate__fadeInUp animate__delay-${index}s`
              : "opacity-0"
          }`}
          style={{ animationFillMode: "both" }}
        >
          <Image
            src={image.src}
            alt={`Donation ${index + 1}`}
            width={380}
            height={512}
            style={{
              height: image.height,
              marginTop: image.top,
            }}
            className="w-full sm:w-[300px] md:w-[382px] object-cover"
          />
        </div>
      ))}
    </section>
  );
};

export default StaggeredImageSection;
