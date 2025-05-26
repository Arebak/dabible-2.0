"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

interface VideoModalProps {
  videoUrl: string;
  backgroundImageUrl: string
}

const VideoModal: FC<VideoModalProps> = ({ videoUrl, backgroundImageUrl }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <div
        className="w-full cursor-pointer video-modal"
        onClick={() => setShowModal(true)}
      >
        <Image
          src={`${backgroundImageUrl}`}
          alt="Hands praying over Bible" 
          fill
          className="object-cover rounded-4xl"
        />
        <div className="absolute inset-0 flex items-center justify-center z-1">
          <Button className="bg-white cursor-pointer text-[#7B0423] hover:bg-white/90 rounded-full py-6 px-8 text-xl">
            <span className="mr-2 text-[#7B0423]">▶</span> WATCH VIDEO
          </Button>
        </div>
      </div>

      {showModal && videoUrl && (
        <div
          className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center transition-opacity duration-300 ease-in-out animate-fadeIn"
          role="dialog"
          aria-modal="true"
        >
          <div className="relative w-full max-w-4xl p-4 sm:p-6 bg-white rounded-lg">
            <button
              onClick={() => setShowModal(false)}
              className="absolute bg-white cursor-pointer rounded-full top-2 right-2 text-black text-xl font-bold w-10 h-10 border-2"
            >
              <span className="text-2xl">×</span>
            </button>
            <div className="w-full aspect-[4/3] sm:aspect-video">
              <iframe
                width="100%"
                height="100%"
                src={`${videoUrl}?autoplay=1`}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VideoModal;