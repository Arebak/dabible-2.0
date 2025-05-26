"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

type Props = {
  videoSrc: string;
  fallbackImgSrc: string;
  videoId?: string;
  imageId?: string;
  width?: number;
  height?: number;
  className?: string;
};

export default function VideoAppWithFallback({
  videoSrc,
  fallbackImgSrc,
  videoId = "fallback-video",
  imageId = "fallback-image",
  width = 250,
  height = 400,
  className = "",
}: Props) {
  const [fallbackVisible, setFallbackVisible] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => setFallbackVisible(true);

    video.addEventListener("error", handleError);
    return () => {
      video.removeEventListener("error", handleError);
    };
  }, []);

  return (
    <div className="relative">
      {fallbackVisible ? (
        <Image
          id={imageId}
          src={fallbackImgSrc}
          alt="Fallback image"
          width={width}
          height={height}
          className={`rounded-lg shadow-lg mx-auto ${className}`}
        />
      ) : (
        <video
          id={videoId}
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          style={{ background: 'transparent', borderRadius: '36px' }}
          className={`w-full h-full p-0 m-0 bg-transparent ${className}`}
        >
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}
    </div>
  );
}
