import Image from "next/image";
import Link from "next/link";
import { Flame, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import DonationCard from "@/components/DonationCard";
import AlternativeMethods from "@/components/AlternativeMethods";
import FounderMessage from "@/components/FounderMessage";
import "animate.css";
// import DonationReceipt from "@/components/DonationReceipt";
import VerticalCarousel from "@/components/VerticalCarousel";
import DownloadButtons from "@/components/DownloadButtons";

export default function DonationPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-[url('/png/home-hero.png')] bg-no-repeat bg-right bg-contain">
        {/* Gradient overlay */}
        <div className="relative z-10 container mx-auto px-4 py-8 sm:py-12 md:py-16 lg:py-24 flex flex-col md:flex-row items-center">
          <div className="w-full md:w-1/2 z-10 bg-transparent">
            <p className="text-navy-800 font-semibold mb-2 text-sm sm:text-base">
              WE PROVIDE
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4">
              AUDIO BIBLE IN <span className="text-[#7B0423]">YORUBA</span>{" "}
              LANGUAGE
            </h1>
            <p className="text-gray-700 mb-6 sm:mb-8 text-sm sm:text-base max-w-lg">
              Our mission is to provide the Bible in African languages, support
              children orphaned by religious terrorism in Nigeria, providing
              them with shelter, education, and care to rebuild their futures.
            </p>
            <DownloadButtons />

            <div className="flex w-full sm:w-fit px-3 sm:px-4 py-1 rounded-full items-center space-x-2 text-xs sm:text-sm bg-[#E7F2FF] mt-4 sm:mt-0">
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((_, index) => (
                  <Image
                    key={index}
                    width={24}
                    height={24}
                    alt=""
                    src="/png/user.png"
                    className="rounded-full -mr-2 sm:w-[30px] sm:h-[30px]"
                  />
                ))}
              </div>
              <div className="flex">
                <Star
                  className={`h-3 w-3 sm:h-4 sm:w-4 text-[#023E8A] fill-[#023E8A]`}
                />
              </div>
              <span className="font-semibold">4.6</span>
              <span className="text-[#023E8A] font-semibold text-xs sm:text-sm">
                54,138 Happy Users
              </span>
            </div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/100 to-transparent z-0"></div>
        </div>
      </section>

      {/* Download Section */}
      <section className="py-8 sm:py-12 md:py-16" id="download">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-start gap-8 gap-x-12">
          <div className="w-full md:w-1/2 max-w-[780px] mb-8 md:mb-0 py-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gradient-blue mb-4">
              Download The App And Enjoy Full Access On Offline Mode.
            </h2>
            <p className="text-sm sm:text-base lg:text-lg text-[#121212] font-mada font-medium mb-6 sm:mb-8">
              Download our mobile app, you can also download any of the Bible
              Books to your phone memory so that you don&apos;t need internet to
              listen to the audio anymore.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-8">
              <div className="flex flex-col items-start">
                <Image
                  src="/png/yoruba-card.jpg"
                  alt="Yoruba Audio Bible"
                  width={180}
                  height={180}
                  className="w-full max-w-[120px] sm:max-w-[140px] md:max-w-[180px] h-auto mb-2"
                />

                <Link
                  href="#"
                  className="text-[#023E8A] text-xs sm:text-sm underline mb-1"
                >
                  Download for iOS
                </Link>
                <Link
                  href="#"
                  className="text-[#023E8A] text-xs sm:text-sm underline"
                >
                  Download for Android
                </Link>
              </div>

              <div className="flex flex-col items-start">
                <Image
                  src="/png/hausa-card.jpg"
                  alt="Hausa Audio Bible"
                  width={180}
                  height={180}
                  className="w-full max-w-[120px] sm:max-w-[140px] md:max-w-[180px] h-auto mb-2"
                />

                <Link
                  href="#"
                  className="text-[#023E8A] text-xs sm:text-sm underline mb-1"
                >
                  Download for iOS
                </Link>
                <Link
                  href="#"
                  className="text-[#023E8A] text-xs sm:text-sm underline"
                >
                  Download for Android
                </Link>
              </div>

              <div className="flex flex-col items-start">
                <Image
                  src="/png/pidgin-card.jpg"
                  alt="Pidgin Audio Bible"
                  width={180}
                  height={180}
                  className="w-full max-w-[120px] sm:max-w-[140px] md:max-w-[180px] h-auto mb-2"
                />

                <Link
                  href="#"
                  className="text-[#023E8A] text-xs sm:text-sm underline mb-1"
                >
                  Download for iOS
                </Link>
                <Link
                  href="#"
                  className="text-[#023E8A] text-xs sm:text-sm underline"
                >
                  Download for Android
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full  md:w-1/2 flex justify-center teal-gradient rounded-2xl overflow-y-hidden px-4">
            <div className="relative w-36 sm:w-48 md:w-56 lg:w-64 h-auto mt-10">
              <Image
                src="/png/preview.png"
                alt="App Interface"
                width={320}
                height={640}
                className="rounded-3xl shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-center font-mada mb-8 sm:mb-12">
            Our Products
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
            {/* Solar Audio Bible */}

            <div className="group relative  bg-[#B42D50] h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 text-white">
              <div className="absolute top-0 -translate-x-1/2 left-1/2">
                <Image
                  src="/svg/ripple-circle.svg"
                  alt="Solar Audio Bible Device"
                  width={400}
                  height={400}
                />
              </div>
              <div className="flex justify-center items-center">
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/png/prod1.png"
                    alt="Solar Audio Bible Device"
                    width={400}
                    height={400}
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-1 font-montserrat">
                    SOLAR
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat -mt-3 font-semibold">
                    AUDIO BIBLE
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <Button
                  variant="outline"
                  className="mt-4 text-[#B42D50] border-white hover:bg-[#B42D50]/90 cursor-pointer text-xs sm:text-sm"
                >
                  LEARN MORE →
                </Button>
              </div>

              {/* Hidden Content visible on hover */}
              <div className="absolute w-full h-full inset-0 text-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <div
                  className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
                  style={{
                    backgroundImage: "url('/png/empower2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay with blur and color */}
                  <div className="absolute inset-0 hover:bg-[#B42D50]/90 backdrop-blur-md"></div>

                  {/* Content */}
                  <div className="relative p-8 md:p-12 text-white">
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          SOLAR
                        </h1>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          AUDIO BIBLE
                        </h1>
                      </div>

                      {/* Description */}
                      <p className="text-sm md:text-bas">
                        The Solar Audio Bible is for elderly people who cannot
                        use mobile apps. We invite you to join us in funding
                        this project to provide this elderly-friendly device at
                        no cost to elderly people living in remote villages;
                        leading many souls into a growing relationship with
                        Jesus Christ.
                      </p>

                      {/* Bullet points */}
                      <div className="space-y-2 py-4">
                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            The elderly people reside in remote villages
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            They cannot operate mobile phones.
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Even when given a bible, they cannot read due to old
                            age or illiteracy.
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Some are labeled as witches and wizards.
                          </p>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      <div className="flex justify-end pt-6">
                        <button className="bg-white text-rose-700 px-6 py-3 rounded-lg font-medium text-lg flex items-center gap-2">
                          LEARN MORE
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Yoruba Audio Bible */}
            <div className="bg-[#FEE4EA] group relative h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 text-[#7B0423] flex flex-col">
              <div className="flex justify-center items-center">
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/png/prod2.png"
                    alt="Solar Audio Bible Device"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-1 font-montserrat">
                    YORÙBÁ
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat -mt-3 font-semibold">
                    AUDIO BIBLE
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <Button
                  variant="outline"
                  className="mt-4 text-[#B42D50] border-white hover:bg-[#B42D50]/90 cursor-pointer text-xs sm:text-sm"
                >
                  LEARN MORE →
                </Button>
              </div>
              {/* Display on hover */}
              <div className="absolute w-full h-full inset-0 text-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <div
                  className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
                  style={{
                    backgroundImage: "url('/png/empower2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay with blur and color */}
                  <div className="absolute inset-0 hover:bg-[#B42D50]/90 backdrop-blur-md"></div>

                  {/* Content */}
                  <div className="relative p-8 md:p-12 text-white">
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          YORUBA
                        </h1>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          AUDIO BIBLE
                        </h1>
                      </div>

                      {/* Description */}
                      <p className="text-sm md:text-bas">
                        Inspired by God, recorded in Ibadan, Nigeria. The first
                        and only old & new testament bible in the Yoruba
                        language. You can easily switch between Yoruba and
                        English without affecting the audio player.
                      </p>

                      {/* Bullet points */}
                      <div className="space-y-2 py-4">
                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Listen to old and new testament from Genesis to
                            Revelation.
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Enjoy the bible in simplified Yoruba language
                            to make scriptures personal. 
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Available for offline usage without
                            internet connection all the time.
                          </p>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      <div className="flex justify-end pt-6">
                        <button className="bg-white text-rose-700 px-6 py-3 rounded-lg font-medium text-lg flex items-center gap-2">
                          LEARN MORE
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hausa Audio Bible */}
            <div className="bg-[#E0FFE4] group relative h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 text-[#19832F] flex flex-col">
              <div className="flex justify-center items-center">
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/png/prod3.png"
                    alt="Solar Audio Bible Device"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-1 font-montserrat">
                    HAUSA
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat -mt-3 font-semibold">
                    AUDIO BIBLE
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <Button className="mt-4 text-white border-white hover:bg-[#19832F]/90 bg-[#19832F] cursor-pointer text-xs sm:text-sm">
                  LEARN MORE →
                </Button>
              </div>

              {/* Display on hover */}
              <div className="absolute w-full h-full inset-0 text-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <div
                  className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
                  style={{
                    backgroundImage: "url('/png/empower2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay with blur and color */}
                  <div className="absolute inset-0 hover:bg-[#B42D50]/90 backdrop-blur-md"></div>

                  {/* Content */}
                  <div className="relative p-8 md:p-12 text-white">
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          HAUSA
                        </h1>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          AUDIO BIBLE
                        </h1>
                      </div>

                      {/* Description */}
                      <p className="text-sm md:text-bas">
                        First and ONLY Old & New Testament Bible in Hausa
                        language available on Android devices. Inspired by God,
                        transcribed and recorded in Jos, Nigeria.
                      </p>

                      {/* Bullet points */}
                      <div className="space-y-2 py-4">
                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Listen to old and new testament from Genesis to
                            Revelation.
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Enjoy the bible in simplified Hausa language to make
                            scriptures personal. 
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Available for offline usage without
                            internet connection all the time.
                          </p>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      <div className="flex justify-end pt-6">
                        <button className="bg-white text-rose-700 px-6 py-3 rounded-lg font-medium text-lg flex items-center gap-2">
                          LEARN MORE
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pidgin Audio Bible */}
            <div className="bg-[#E3F2FD] group relative h-[400px] sm:h-[500px] md:h-[600px] rounded-lg overflow-hidden p-4 sm:p-6 md:p-8 text-[#3EA7F7] flex flex-col">
              <div className="flex justify-center items-center">
                <div className="relative w-[200px] h-[200px] sm:w-[300px] sm:h-[300px] md:w-[400px] md:h-[400px]">
                  <Image
                    src="/png/prod4.png"
                    alt="Solar Audio Bible Device"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold mb-1 font-montserrat">
                    HAUSA
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg lg:text-2xl font-montserrat -mt-3 font-semibold">
                    AUDIO BIBLE
                  </p>
                </div>
              </div>

              <div className="flex justify-end items-center">
                <Button className="mt-4 text-white border-white hover:bg-[#19832F]/90 bg-[#3EA7F7] cursor-pointer text-xs sm:text-sm">
                  LEARN MORE →
                </Button>
              </div>

              {/* Display on hover */}
              {/* Display on hover */}
              <div className="absolute w-full h-full inset-0 text-white transform translate-y-full transition-transform duration-300 ease-in-out group-hover:translate-y-0">
                <div
                  className="relative w-full max-w-4xl rounded-3xl overflow-hidden"
                  style={{
                    backgroundImage: "url('/png/empower2.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {/* Overlay with blur and color */}
                  <div className="absolute inset-0 hover:bg-[#B42D50]/90 backdrop-blur-md"></div>

                  {/* Content */}
                  <div className="relative p-8 md:p-12 text-white">
                    <div className="space-y-6">
                      {/* Title */}
                      <div>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          PIDGIN
                        </h1>
                        <h1 className="text-3xl md:text-5xl font-bold tracking-wide">
                          AUDIO BIBLE
                        </h1>
                      </div>

                      {/* Description */}
                      <p className="text-sm md:text-bas">
                        First and ONLY Old & New Testament Bible in Pidgin
                        language available on Android devices. Inspired by God,
                        transcribed and recorded in Jos, Nigeria.
                      </p>

                      {/* Bullet points */}
                      <div className="space-y-2 py-4">
                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Listen to old and new testament from Genesis to
                            Revelation.
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Enjoy the bible in simplified Pidgin language
                            to make scriptures personal. 
                          </p>
                        </div>

                        <div className="flex items-center gap-4">
                          <Flame className="h-8 w-8 text-white shrink-0" />
                          <p className="text-xs md:text-base">
                            Available for offline usage without
                            internet connection all the time.
                          </p>
                        </div>
                      </div>

                      {/* Learn More Button */}
                      <div className="flex justify-end pt-6">
                        <button className="bg-white text-rose-700 px-6 py-3 rounded-lg font-medium text-lg flex items-center gap-2">
                          LEARN MORE
                          <span className="text-xl">→</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Our Mission Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-4 sm:gap-6 md:gap-8 rounded-xl sm:rounded-2xl md:rounded-3xl overflow-hidden font-mada">
            <div className="w-full md:w-1/2 p-4 sm:p-6 md:p-8 lg:p-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 md:mb-6">
                Support Our Mission
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-gray-700 mb-4 sm:mb-6 md:mb-8">
                We currently run 4 YouTube channels, each dedicated to Yoruba,
                Hausa, Pidgin, DaBible Missionary, and Daily Bible Study.
                Subscribe to watch edifying contents today.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button className="bg-[#7B0423] hover:bg-red-900 text-xs sm:text-sm py-2 w-full sm:w-auto">
                  <span className="mr-2">🎁</span> DONATE
                </Button>
                <Button
                  variant="outline"
                  className="border-[#7B0423] text-[#7B0423] hover:bg-red-50 text-xs sm:text-sm py-2 w-full sm:w-auto"
                >
                  <span className="mr-2">▶️</span> VISIT OUR YOUTUBE CHANNEL
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative h-[200px] sm:h-[300px] md:h-[400px] lg:h-[600px]">
              <Image
                src="/png/watch.png"
                alt="Hands praying over Bible"
                fill
                className="object-cover rounded-4xl"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <Button className="bg-white text-[#7B0423] hover:bg-white/90 rounded-full px-4 sm:px-6 text-xs sm:text-sm">
                  <span className="mr-2 text-[#7B0423]">▶</span> WATCH VIDEO
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Empower Missionaries Section */}
      <section className="py-8 sm:py-12 md:py-16 font-mada text-[#06244B]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 sm:mb-8 md:mb-12">
            <h3 className="text-base sm:text-lg md:text-xl font-medium mb-1 sm:mb-2">
              Join Us To
            </h3>
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
              Empower Missionaries
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {/* Mission Field Card */}
            <div className="bg-[#F7F9FC] rounded-lg sm:rounded-xl overflow-hidden shadow-md px-4 sm:px-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#023E8A] text-center py-3 sm:py-4">
                Mission Field
              </h3>
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
                <Image
                  src="/png/empower1.png"
                  alt="Mission Field"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6 text-center">
                <p className="text-[#023E8A] text-xs sm:text-sm md:text-base">
                  You can donate to support missionaries in Northern Nigeria
                </p>
              </div>
            </div>

            {/* School Fee Card */}
            <div className="bg-[#F7F9FC] rounded-lg sm:rounded-xl overflow-hidden shadow-md px-4 sm:px-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#023E8A] text-center py-3 sm:py-4">
                School Fee
              </h3>
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
                <Image
                  src="/png/empower2.png"
                  alt="School Fee"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6 text-center">
                <p className="text-[#023E8A] text-xs sm:text-sm md:text-base">
                  We need donors to sponsor one child to school.
                </p>
              </div>
            </div>

            {/* Crusade Card */}
            <div className="bg-[#F7F9FC] rounded-lg sm:rounded-xl overflow-hidden shadow-md px-4 sm:px-5">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#023E8A] text-center py-3 sm:py-4">
                Crusade
              </h3>
              <div className="relative h-40 sm:h-48 md:h-56 lg:h-64">
                <Image
                  src="/png/empower4.png"
                  alt="Crusade"
                  fill
                  className="object-cover rounded-xl"
                />
              </div>
              <div className="p-3 sm:p-4 md:p-6 text-center">
                <p className="text-[#023E8A] text-xs sm:text-sm md:text-base">
                  Sponsor village crusades in remote parts of the world.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
