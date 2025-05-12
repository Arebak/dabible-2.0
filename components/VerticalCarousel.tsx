 

"use client";

<<<<<<< HEAD
// import Image from "next/image";
=======
>>>>>>> 3c99f780b2b3dc879b02338693fc8c07f1140826
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import DonationReceipt from "./DonationReceipt";

const VerticalCarousel = () => {
  return (
    <Swiper
      modules={[Navigation, Autoplay]}
      direction="vertical"
      spaceBetween={20}
      slidesPerView={5}
      loop
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
        reverseDirection: true,
      }}
      speed={5000}
      style={{
        height: "100%", // 👈 make swiper take full height of its container
      }}
    >
      {[
        "donation1.png",
        "donation2.png",
        "donation3.png",
        "donation1.png",
        "donation2.png",
        "donation3.png",
        "donation1.png",
        "donation2.png",
      ].map((img, index) => (
        <SwiperSlide key={index}>
          <DonationReceipt
            name={img}
            description="Dabible Partners - Bi-weekly Donations"
            amount="$40"
            date="April 25th, 2025"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default VerticalCarousel;
