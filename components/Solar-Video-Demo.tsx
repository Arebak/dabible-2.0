"use client";
import Image from "next/image";
import StarTag from "./StarTag";
import { Button } from "./ui/button";

type SolarVideoProps = {
  title?: string;
  description?: string;
  label?: string;
  buttonLabel?: string;
  buttonUrl?: string;
  videoSrc?: string;
  buttonDisabled?: boolean;
  backgroundColor?: string; 
  textColor?: string;
};

const SolarVideoDemo = ({
  title,
  description,
  label,
  buttonLabel,
  buttonUrl, 
  videoSrc = "/videos/solar_1.mp4",
  buttonDisabled = false,
  backgroundColor = "bg-black",
  textColor = "text-white",
}: SolarVideoProps) => {


  return (
       <div className={`${backgroundColor} w-full`}>
          <div className="text-center pt-18 mb-12">
            <StarTag text={label || "FEATURES"} variant="blue" />
            <h2 className="md:text-4xl text-3xl font-bold text-white font-domine">
              { title || "Get The Highlights" }
            </h2>
            <p className={`${textColor} text-sm md:text-lg max-w-2xl mx-auto mt-4 font-mada`}>
              { description || "Experience the power of the Solar Audio Bible with our engaging video. See how it works and why it's a must-have for your audio Bible needs." }
            </p>
          </div>

          <div className="relative overflow-hidden w-full h-full text-center">
            <div id="fallback-image-solar" style={{ display: 'none' }}>
            <Image
              src="/png/right-solar-hero.png"
              alt="Solar Audio Bible device"
              fill
              className="z-10 absolute !h-auto !left-[unset] !top-[unset] !right-[180px] !bottom-[250px]"
              priority
            />
          </div>
            <video
            autoPlay
            id="solar_intro_video_1"
            muted
            loop
            playsInline
            onError={() => {
              const fallback = document.getElementById('fallback-image-solar');
              const vid1 = document.getElementById('solar_intro_video_1');
              if (vid1) vid1.style.display = 'none';
              if (fallback) fallback.style.display = 'block';
            }}
            className="w-full h-full p-0 m-0"
          >
            <source src={videoSrc} type="video/mp4"/>
            Your browser does not support the video tag.
          </video>

          { !buttonDisabled ? (
          <Button className="mt-8 mb-18 py-6 px-12 rounded-3xl text-xl bg-blue-600 hover:bg-blue-700 transition-colors">
            <a
              href={buttonUrl || "/products/solar-audio-bible"}
              rel="noopener noreferrer"
              className="text-white font-bold"
            >
              {buttonLabel || "Learn More"}
            </a>
          </Button>
          ) : ""
        }
        
      
          </div>
        </div>
    );
};
export default SolarVideoDemo;