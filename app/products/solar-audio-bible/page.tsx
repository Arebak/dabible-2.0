"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import StarTag from "@/components/StarTag";

export default function SolarBiblePage() {
  const [frameIndex, setFrameIndex] = useState(0);
  const [redVisibility, setRedVisibility] = useState(false);
  const productFrames = [
    "/png/solar1.png",
    "/png/solar2.png",
    "/png/solar3.png",
    "/png/solar4.png",
    "/png/solar5.png",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrameIndex((prev) => (prev + 1) % productFrames.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <main className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <section className="bg-[#0a3170] text-white px-4 py-12 md:py-16 lg:px-8 relative md:bg-[url('/png/solar-hero.png')] bg-no-repeat bg-right bg-contain">
        <div className="d-container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8 items-center font-mada font-medium">
            <div className="flex-1 space-y-6">
              <StarTag text="PRODUCTS" variant="white" />
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight font-domine">
                Solar Audio Bible - One Purchase, Double The Impact
              </h1>

              <p className="text-lg opacity-90 ">
                The Solar Audio Bible is designed especially for the elderly and
                others who cannot use mobile phones — simple, solar-powered, and
                preloaded with the Word of God.
              </p>

              <p className="text-lg opacity-90">
                When you buy one, you're not just receiving this life-changing
                device — you're also donating one to an elderly person in a
                remote village who otherwise wouldn't have access to God's Word.
              </p>

              <div className="space-y-3">
                <div className="flex items-center gap-x-3">
                  <Image
                    src="/svg/flames.svg"
                    alt="star icon"
                    width={24}
                    height={24}
                    className=" mr-1"
                  />
                  <p className="md:text-xl text-lg">
                    {" "}
                    Built for those who can't operate mobile phones
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
                  <p className="md:text-xl text-lg">
                    {" "}
                    Fully solar-powered — no charging required
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
                  <p className="md:text-xl text-lg">
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
                  <p className="md:text-xl text-lg">
                    Given freely to someone in need with every purchase
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  variant="outline"
                  className="bg-white text-[#0a3170] hover:bg-gray-100 border-none md:w-[230px] w-fit h-fit md:text-base text-sm md:px-5 md:py-4 px-4 py-4"
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
                <Button
                  variant={"outline"}
                  className="bg-[#0a3170] hover:bg-[#0a3170]/90 text-white border-white w-fit h-fit md:text-base text-sm md:px-5 md:py-4 px-4 py-4"
                >
                  Buy Now - Give One Too
                </Button>
              </div>
            </div>

            <div className="flex-1 flex justify-center"></div>
          </div>
        </div>

        <div className="absolute md:block hidden -right-10 bottom-0 w-[700px] h-[500px] lg:w-[1100px] lg:h-[700px]">
          <Image
            src="/png/right-solar-hero.png"
            alt="Solar Audio Bible device"
            fill
            className="relative z-10"
            priority
          />
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-12">
            <StarTag text="FEATURES" variant="blue" />
            <h2 className="md:text-4xl text-3xl font-bold text-gray-900 font-domine">
              Get The Highlights
            </h2>
          </div>

          <div className="flex flex-col gap-6 md:gap-y-10 ">
            {/* Feature 1 */}
            <div className="overflow-hidden card-gradient border-none">
              <div className="p-6 flex flex-col md:flex-row gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Easy To Use & Hand - Held
                  </h3>
                  <p className="text-gray-700">
                    Designed With Simplicity In Mind — No Tech Knowledge Needed.
                    The Solar Audio Bible Fits Comfortably In One Hand And
                    Features Large, Easy-To-Press Buttons. It's The Perfect
                    Solution For Elderly Users Or Anyone Who Finds Smartphones
                    Too Complicated.
                  </p>
                </div>

                <div className="relative md:w-[415px] w-[300px] md:h-[415px] h-[300px]">
                  <Image
                    src={productFrames[frameIndex]}
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="overflow-hidden card-gradient border-none">
              <div className="p-6 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge2.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Internal AA Battery With Solar Panel
                  </h3>
                  <p className="text-gray-700">
                    Say Goodbye To Power Worries. This Device Runs On AA
                    Batteries And Comes With A Built-In Solar Panel, Making It
                    Ideal For Rural Areas With Limited Electricity. Just Leave
                    It In The Sun To Charge And It's Ready To Use.
                  </p>
                </div>

                <div className="relative md:w-[415px] w-[300px] md:h-[415px] h-[300px]">
                  <Image
                    src={productFrames[frameIndex]}
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="overflow-hidden card-gradient border-none">
              <div className="p-6 flex flex-col md:flex-row gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge3.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">
                    Old & New Testament
                  </h3>
                  <p className="text-gray-700">
                    From Genesis To Revelation — It's All Here. The Solar Audio
                    Bible Contains A Complete Recording Of Both The Old And New
                    Testament, Providing The Full Message Of Hope, Love, And
                    Salvation In An Easy-To-Listen Format.
                  </p>
                </div>

                <div className="relative md:w-[415px] w-[300px] md:h-[415px] h-[300px]">
                  <Image
                    src={productFrames[frameIndex]}
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Feature 4 */}
            <div className="overflow-hidden card-gradient border-none">
              <div className="p-6 flex flex-col md:flex-row-reverse gap-6 md:gap-x-[130px] items-center">
                <div className="flex-1">
                  <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center mb-4 shadow-sm">
                    <Image
                      src="/svg/badge4.svg"
                      alt="Hand-held Solar Audio Bible"
                      width={30}
                      height={30}
                    />
                  </div>
                  <h3 className="text-xl font-bold mb-2">Flash Light</h3>
                  <p className="text-gray-700">
                    More Than Just A Bible — It's Also A Practical Tool. The
                    Built-In Flashlight Comes In Handy For Navigating In The
                    Dark Or During Power Outages, Making It Especially Useful In
                    Remote Areas And For Elderly Users.
                  </p>
                </div>

                <div className="relative md:w-[415px] w-[300px] md:h-[415px] h-[300px]">
                  <Image
                    src={productFrames[frameIndex]}
                    alt="Rotating Solar Audio Bible"
                    fill
                    className="w-full h-full object-contain duration-1000 ease-in-out transition-all"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Take A Closer Look Section */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-2xl md:text-3xl font-bold text-[#0a3170] mb-8">
            Take A Closer Look
          </h2>

          <div className="bg-[#F8F7F7] rounded-xl p-6 md:p-10 flex flex-col items-center">
            <div className="relative md:w-[415px] w-[300px] md:h-[415px] h-[300px]">
              <Image
                src={
                  !redVisibility
                    ? productFrames[frameIndex]
                    : "/png/red-solar.png"
                }
                alt="Rotating Solar Audio Bible"
                fill
                className="w-full h-full object-contain duration-1000 ease-in-out transition-all"
              />
            </div>

            <div className="text-center">
              <p className="text-sm text-gray-600 mb-3">
                Solar Audio Bible Device
              </p>
              <div className="inline-flex items-center bg-white rounded-full p-1 border">
                <button
                  className="w-8 h-8 rounded-full bg-gray-300 mx-1 cursor-pointer"
                  onClick={() => setRedVisibility(false)}
                ></button>
                <button
                  className="w-8 h-8 rounded-full bg-red-500 mx-1 cursor-pointer"
                  onClick={() => setRedVisibility(true)}
                ></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Forgotten Generation Section */}
      <section className=" px-4 bg-[#C8385E] mb-20 md:max-h-[764px] h-full relative  md:yoruba-download-bg py-5">
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
              <h2 className="text-2xl md:text-3xl font-bold mb-6 font-domine">
                The Forgotten Generation
              </h2>

              <div className="space-y-4 text-white/90 font-mada md:max-w-3/4 w-full">
                <p>
                  A Heavy Burden Rests On Our Hearts For The Elderly Who Reside
                  In Remote Villages That Do Not Have Access To The Gospel Of
                  Christ. Many Of Them Alone For Various Reasons Such As: Their
                  Children Have Relocated To Bigger Cities In Pursuit Of
                  Education And/Or Economic Opportunities. Some Are As Such An
                  Old Age That They're Unable To Walk To Church. Many Of Them
                  Are Illiterate (Some Are Unable To Understand The National
                  Language, And Can Only Speak Their Local Dialect, Which Is Not
                  Spoken In These Churches). Many Of Them Cannot Read Or Write,
                  Thus, Cannot Operate A Mobile App. So, They Are At A Great
                  Disadvantage In Having Access To The Gospel Of Christ.
                </p>

                <p>
                  Many Of These Elders Were Raised In The Era Of Idol
                  Worshipping, And They Pray With Incantations And Wicked
                  Proverbs. Some Are Labeled As Witches And Wizards. These
                  People Are Dying On A Daily Basis Without Knowing The Love Of
                  Jesus And Believing In His Saving Grace. Where Do They End Up
                  In Eternity? This Is Why We Are Providing A Solar Audio Bible
                  Device That Is Elderly Friendly For Them.
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">
                  Ready To Donate Now? Give & Receive A Solar Audio Bible
                </h3>

                <Button
                  variant="outline"
                  className="bg-white text-[#C8385E] hover:bg-white/90 border-none px-10 py-2 h-fit"
                >
                  <Image
                    src="/svg/rose-coin.svg"
                    alt="Elderly person in a remote village"
                    width={15}
                    height={15}
                    className="rounded-lg shadow-lg "
                  />
                  Donate
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <div className="relative">
                <Image
                  src="/png/elderly.png"
                  alt="Elderly person in a remote village"
                  width={400}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
