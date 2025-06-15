"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StarTag from "@/components/StarTag";
import Link from "next/link";
import BlackSolarVideo from "@/components/Solar-Video-Demo";

export default function SolarBiblePage() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);

 
  // Frame range manager for different animation contexts
const frameRanges = {
  rotationFrames: { start: 50, end: 150 },
  featureSpinFrames: { start: 80, end: 130 },
  closerLookFrames: { start: 120, end: 160 },
};

const generateFrames = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => {
    const frameNumber = (start + i).toString().padStart(4, "0");
    return `/solar_3d/${frameNumber}.png`;
  });

const productFrames = generateFrames(frameRanges.rotationFrames.start, frameRanges.rotationFrames.end);

const featureFrames = generateFrames(frameRanges.featureSpinFrames.start, frameRanges.featureSpinFrames.end);


  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % productFrames.length);
    }, 50);

    return () => clearInterval(interval);
  }, [productFrames.length]);
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#0a3170] text-white px-4 py-0 md:py-16 lg:px-8 relative md:bg-[url('/png/solar-hero.pngs')] bg-no-repeat bg-right bg-contain overflow-hidden">
        <div className="d-container mx-auto max-w-6xl relative z-1">
          <div className="flex flex-col md:flex-row gap-8 items-center font-mada font-medium">
            <div className="flex-1 space-y-2 md:space-y-6">
              <StarTag text="PRODUCTS" variant="white" />
              <h1 className="text-lg md:text-3xl lg:text-5xl font-bold leading-tight font-domine">
                Solar Audio Bible - One Purchase, Double The Impact
              </h1>

              <p className="text-sm md:text-md lg:text-lg opacity-90 ">
                The Solar Audio Bible is designed especially for the elderly and
                others who cannot use mobile phones - simple, solar-powered, and
                preloaded with the Word of God.
              </p>

              <p className="text-sm md:text-md lg:text-lg opacity-90">
                When you buy one, you&apos;re not just receiving this life-changing
                device - you&apos;re also donating one to an elderly person in a
                remote village who otherwise wouldn&apos;t have access to God&apos;s Word.
              </p>

              <div className="space-y-1 md:space-y-3">
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/svg/flames.svg"
                    alt="star icon"
                    width={24}
                    height={24}
                    className=" mr-1"
                  />
                  <p className="md:text-md text-sm  lg:text-lg">
                    {" "}
                    Built for those who can&apos;t operate mobile phones
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/svg/flames.svg"
                    alt="star icon"
                    width={24}
                    height={24}
                    className=" mr-1"
                  />
                  <p className="md:text-md text-sm  lg:text-lg">
                    {" "}
                    Fully solar-powered - no charging required
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/svg/flames.svg"
                    alt="star icon"
                    width={24}
                    height={24}
                    className=" mr-1"
                  />
                  <p className="md:text-md text-sm  lg:text-lg">
                    {" "}
                    Comes with both Old and New Testament
                  </p>
                </div>
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/svg/flames.svg"
                    alt="star icon"
                    width={24}
                    height={24}
                    className=" mr-1"
                  />
                  <p className="md:text-md text-sm  lg:text-lg">
                    Given freely to someone in need with every purchase
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Link href="https://donate.dabible.com/solar-audio-bible/" className="cursor-pointer">
                <Button
                  variant="outline"
                  className="bg-white text-[#0a3170] border-white hover:bg-[#aac9ff] hover:text-[#0a3170] md:w-[230px] w-full h-fit md:text-base text-sm md:px-5 md:py-4 px-4 py-4"
                >
                  <Image
                    src="/svg/coin.svg"
                    alt="star icon"
                    width={16}
                    height={16}
                    className=" ml-1"
                  />
                  Donate
                </Button>
                </Link>

                <Link href="https://donate.dabible.com/product/solar-audio-bible/" className="cursor-pointer">
                <Button
                  variant={"outline"}
                  className="bg-[#0a3170] hover:bg-[#aac9ff] text-white hover:text-[#023E8A] border-white w-full h-fit md:text-base text-sm md:px-5 md:py-4 px-4 py-4"
                >
                  <span className="mr-1">Pre-order Now</span>-<span className="ml-1">Give One Too</span>
                </Button>
                </Link>
              </div>
            </div>

            <div className="flex-1 flex pb-40 lg:pb-0 justify-center"></div>
          </div>
        </div>

        <div className="absolute md:block sm:right-[-230px] lg:right-[-240px] xl:right-[-200px] bottom-[-100px]  md:bottom-[-250px] z-0">
          <div id="fallback-image" style={{ display: 'none' }}>
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
            muted
            playsInline
            onError={() => {
              const fallback = document.getElementById('fallback-image');
              const vid1 = document.querySelector('video');
              const vid2 = document.getElementById('solar_intro_2');
              if (vid1) vid1.style.display = 'none';
              if (vid2) vid2.style.display = 'none';
              if (fallback) fallback.style.display = 'block';
            }}
            onEnded={(e) => {
              e.currentTarget.style.display = 'none';
              const nextVideo = document.getElementById('solar_intro_2');
              if (nextVideo) nextVideo.style.display = 'block';
              (nextVideo as HTMLVideoElement | null)?.play();
            }}
            className="w-full h-full p-0 m-0"
          >
            <source src="/videos/intro_1.1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <video
            id="solar_intro_2"
            loop
            muted
            playsInline
            style={{ display: 'none' }}
            className="w-full h-full p-0 m-0"
          >
            <source src="/videos/intro_1.2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      {/* Features Section */}
      <section className="">

        <BlackSolarVideo buttonDisabled={true} />


  

        <div className="bg-black bg-gradient-to-b from-black to-white w-full overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col gap-6 md:gap-y-10 px-4 lg:px-4">
            {/* Feature 1 */}
            <div className="overflow-hidden card-gradientz border-none rounded-3xl bg-gradient-to-tl from-[#c2ccdb]  to-[#575f6d]">
              <div className="p-8 md:p-6 md:pl-16 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1 order-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-black mb-2">
                    Easy To Use & Hand - Held
                  </h3>
                  <p className="text-black md:text-lg">
                    Designed with simplicity in mind - No tech knowledge needed.
                    The Solar Audio Bible fits comfortably in one hand and
                    features large, easy-to-press buttons. It&apos;s The perfect
                    solution for elderly users or anyone who finds smartphones
                    too complicated.
                  </p>
                </div>

                
                <div className="relative md:w-[415px] w-[300px] md:h-[350px] h-[300px] order-1">
                  <Image
                    src="/png/0001_2.png"
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all scale-125"
                  />
                </div>
                
              </div>
            </div>
            
            {/* <div className="from-10%  card-gradientx border-none  bg-gradient-to-bl from-[#010711] to-[#3e437d] rounded-3xl">
              <div className="p-6 md:p-8 md:py-18 flex flex-col sm:flex-row gap-2 md:gap-x-[130px] items-stretch">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl md:text-4xl text-white font-bold mb-2">
                    Easy To Use & Hand - Held
                  </h3>
                  <p className="text-white md:text-lg">
                    Designed with simplicity in mind — No tech knowledge needed.
                    The Solar Audio Bible fits comfortably in one hand and
                    features large, easy-to-press buttons. It&apos;s The perfect
                    solution for elderly users or anyone who finds smartphones
                    too complicated.
                  </p>
                </div>
                <div className="relative flex-1 py-26">
                  <div className="absolute
                    w-[500px] h-[500px] md:w-[700px]
                    right-[-30%] md:right-[-55%] lg:right-[-20%] xl:right-[-10%]
                    top-[-70%] sm:top-[-50%] md:top-[-45%] lg:top-[-60%]">
                    {featureFrames[frameIndex] && (
                    <Image
                      src={featureFrames[frameIndex]}
                      alt="Rotating Solar Audio Bible"
                      fill
                      className="w-full h-full object-contain duration-1000 ease-in-out transition-all"
                    />
                    )}
                  </div>
                </div>
              </div>
            </div> */}

            {/* Feature 2 */}
            <div className="overflow-hidden card-gradientz border-none rounded-3xl bg-gradient-to-tl from-[#c2ccdb]  to-[#575f6d]">
              <div className="p-8 md:p-6 md:pr-16 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge2.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-black mb-2">
                    Internal AA Battery With Solar Panel
                  </h3>
                  <p className="text-black md:text-lg">
                    Say goodbye to power worries. This device runs on AA batteries and comes with a built-in solar panel, making it ideal for rural areas with limited electricity. Just leave it in the sun to charge and it’s ready to use.
                  </p>
                </div>
                
                <div className="relative md:w-[415px] w-[300px] md:h-[350px] h-[300px] md:order-1">
                  <Image
                    src="/png/0002.png"
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all scale-120  md:scale-150"
                  />
                </div>
                
              </div>
            </div>

            {/* Feature 3 */}
            <div className="overflow-hidden card-gradientz border-none rounded-3xl bg-gradient-to-tl from-[#d5dde9]  to-[#828ea3]">
              <div className="p-8 md:p-6 md:pl-16 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1 md:order-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge3.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-black mb-2">
                     Old & New Testament
                  </h3>
                  <p className="text-black md:text-lg">
                    Preloaded with both the Old and New Testaments, the Solar Audio Bible provides a comprehensive listening experience. It&apos;s like having a pastor in your pocket, ready to share God&apos;s Word at any time.
                  </p>
                </div>

                
                <div className="relative md:w-[415px] w-[300px] md:h-[350px] h-[300px] md:order-1">
                  <Image
                    src="/png/0161.png"
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all md:scale-180"
                  />
                </div>
                
              </div>
            </div>

          

            {/* Feature 4 */}
            <div className="overflow-hidden card-gradientz border-none rounded-3xl bg-gradient-to-tr from-[#ffffff]  to-[#cbd9f1]">
              <div className="p-8 md:p-6 md:pr-16 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1 order-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge4.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-black mb-2">
                     Flash Light
                  </h3>
                  <p className="text-black md:text-lg">
                    Equipped with a built-in flashlight, the Solar Audio Bible
                    is not just a spiritual tool but also a practical one. It
                    provides light in dark places, making it useful for reading,
                    navigating, or simply providing comfort during the night.
                  </p>
                </div>

                
                <div className="relative md:w-[415px] w-[300px] md:h-[350px] h-[300px] order-2">
                  <Image
                    src="/png/0000.png"
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all scale-120"
                  />
                </div>
                
              </div>
            </div>

            <div className="overflow-hidden card-gradientz border-none rounded-3xl bg-gradient-to-tl from-[#ffffff]  to-[#cbd9f1]">
              <div className="p-8 md:p-6 md:pl-16 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1 md:order-2">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge4.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl md:text-4xl font-bold text-black mb-2">
                     Audio Sermons
                  </h3>
                  <p className="text-black md:text-lg">
                    We have compiled sermons from various pastors and
                    evangelists, providing a rich source of spiritual nourishment.
                    These audio sermons are designed to complement the Bible
                    readings, offering deeper insights and practical applications
                    of God&apos;s Word.
                  </p>
                </div>

                
                <div className="relative md:w-[415px] w-[300px] md:h-[350px] h-[300px] md:order-1">
                  <Image
                    src="/png/0004.png"
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all scale-110 md:scale-180"
                  />
                </div>
                
              </div>
            </div>

            
          </div>
        </div>
        </div>

      </section>

      





      {/* Take A Closer Look Section */}
      <section className="py-12 px-4 overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl mt-16 md:text-3xl font-bold text-[#0a3170] mb-8 font-domine text-center">
            Take A Closer Look
          </h2>

          <div className="bg-[#F8F7F7] rounded-xl p-6 md:p-10 flex flex-col items-center">
            
            <div className="relative md:w-[415px] w-[300px] md:h-[615px] h-[300px] z-0">
               {featureFrames[frameIndex] && (
              <Image
                src={featureFrames[frameIndex]}
                alt="Rotating Solar Audio Bible"
                fill
                className={`w-full h-full object-contain transition-all scale-280 duration-500 ${
                  selectedColor === "gray"
                    ? "filter grayscale"
                    : selectedColor === "red"
                    ? "filter sepia-[140] hue-rotate-[266deg] saturate-[2];"
                    : ""
                }`}
              />
             )}
            </div>


            <div className="text-center relative z-3">
              <p className="text-sm text-gray-600 mb-3">
                Solar Audio Bible Device
              </p>
              <div className="inline-flex items-center bg-white rounded-full p-1 border">
                <button
                  className="w-8 h-8 rounded-full bg-gray-300 mx-1 cursor-pointer"
                  onClick={() => setSelectedColor("gray")}
                ></button>
                <button
                  className="w-8 h-8 rounded-full bg-red-500 mx-1 cursor-pointer"
                  onClick={() => setSelectedColor("red")}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>

  <section className="bg-[#f1f7fe] py-6 px-6 md:px-12 rounded-xl">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
    <div className="flex-1">
      <h2 className="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
        Give the Gift of the Word, Your Way.
      </h2>
      <p className="text-gray-700 text-base md:text-lg mb-6">
        Want to bless your church, ministry partners, or loved ones with the Solar Audio Bible? <br />
        You can now customize the device with your logo or special message and order in bulk for:
      </p>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-base font-medium text-[#1e3a8a] mb-6">
        <div className="flex items-center gap-2"><span>🎁</span> Church Outreach</div>
        <div className="flex items-center gap-2"><span>🎁</span> Mission Trips</div>
        <div className="flex items-center gap-2"><span>🎁</span> Weddings & Birthdays</div>
        <div className="flex items-center gap-2"><span>🎁</span> Community Events</div>
        <div className="flex items-center gap-2"><span>🎁</span> Corporate Giving</div>
        <div className="flex items-center gap-2"><span>🎁</span> Holiday Gifts</div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <a
          href="/support"
          className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-3 rounded-full transition duration-300"
        >
          Customize Now
        </a>
        <p className="text-sm text-gray-700">
          Use code <strong>SCOOP15</strong> for 15% off your first order!
        </p>
      </div>
    </div>

    {/* Image of devices */}
    <div className="flex-1 flex justify-center">
      <Image
        src="/svg/solar-customized.svg"
        alt="Customized Solar Audio Bibles"
        className="w-full max-w-md object-contain"
        width={500}
        height={500}
      />
    </div>
  </div>
</section>

      {/* The Forgotten Generation Section */}
      <section className=" px-4 bg-[#C8385E] h-full relative  md:yoruba-download-bg py-5 overflow-hidden">
        {/* curve yoruba  */}
        <div className="absolute top-0 left-0 right-0 transform translate-x-[40%]">
          <Image
            src="/png/phone-mockups/curve-download-yoruba.png"
            alt="curve"
            width={300}
            height={200}
          />
        </div>
        <div className="d-container mx-auto max-w-6xl px-4 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-6xl md:max-w-xs font-bold mb-6 font-domine">
                The Forgotten Generation
              </h2>

              <div className="space-y-4 text-white/90 md:text-lg font-mada md:max-w-3/4 w-full">
                <p>
                  A heavy burden rests on our hearts for the elderly who reside in remote villages that do not have access to the gospel of Christ. Many of them are alone for various reasons such as: their children have relocated to bigger cities in pursuit of education and/or economic opportunities. Some are of such an old age that they’re unable to walk to church. Many of them are illiterate (some are unable to understand the national language and can only speak their local dialect, which is not spoken in these churches). Many of them cannot read or write, thus, cannot operate a mobile app. So, they are at a great disadvantage in having access to the gospel of Christ.
                </p>

                <p>
                  Many of these elders were raised in the era of idol worshipping, and they pray with incantations and wicked proverbs. Some are labeled as witches and wizards. These people are dying on a daily basis without knowing the love of Jesus and believing in His saving grace. Where do they end up in eternity? This is why we are providing a solar audio Bible device that is elderly friendly for them.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl md:text-2xl font-domine font-bold mb-4">
                  Ready to donate now? Give & Receive a Solar Audio Bible
                </h3>
                <div className="flex flex-col sm:flex-row gap-4">
                <Link href="https://donate.dabible.com/solar-audio-bible/" className="cursor-pointer">
                <Button
                  variant="outline"
                  className="bg-white border-2 border-white text-[#C8385E] hover:bg-white border-none px-18 py-4 h-fit"
                >
                  <Image
                    src="/svg/rose-coin.svg"
                    alt="Elderly person in a remote village"
                    width={15}
                    height={15}
                    className="rounded-lg shadow-lg :hover:hidden "
                  />
                  Donate
                </Button>
                </Link>
                <Link href="https://donate.dabible.com/product/solar-audio-bible/" className="cursor-pointer">
                <Button
                  variant="outline"
                  className="bg-transparent text-white border-2 border-white hover:bg-[#023E8A] hover:text-white hover:border-[#023E8A] px-18 py-4 h-fit"
                >
                  Preorder Now - Give One Too
                </Button>
                </Link>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/png/elderly.png"
                  alt="Elderly person in a remote village"
                  width={400}
                  height={400}
                  className="w-full md:scale-140"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
