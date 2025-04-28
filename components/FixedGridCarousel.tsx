"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const FixedGridCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      spaceBetween={20}
      slidesPerView={5}
      loop
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      speed={5000}
    >
      {["donation1.png", "donation2.png", "donation3.png", "donation1.png", "donation2.png", "donation3.png", "donation1.png", "donation2.png"].map((img, index) => (
        <SwiperSlide key={index}>
          <Image
            src={`/png/${img}`}
            alt={`Donation activity ${index + 1}`}
            width={300}
            height={300}
            className="w-full h-[452px] object-cover rounded-lg"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default FixedGridCarousel;
