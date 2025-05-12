import Image from "next/image";
import { CheckCircle } from "lucide-react";
import DownloadButtons from "@/components/DownloadButtons";
import StarTag from "@/components/StarTag";

export default function hausaBiblePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      <div className="relative">
        {/* Hero Section */}
        <section className="pt-8 sm:pt-10 md:pt-16 pb-6 sm:pb-8 md:pb-12 px-4 bg-[#FFFEFF]">
          <div className="l-container">
            <div className="text-center flex flex-col justify-center items-center">
              <p className="text-sm text-gray-600 mb-2 font-mada">
                Listen to God's Word in Pidgin
              </p>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl w-full sm:w-[90%] md:w-[800px] font-bold text-[#3EA7F7] mb-3 sm:mb-4 font-domine">
                God Word No Far—Listen to Am for Pidgin
              </h1>
              <p className="text-gray-700 text-sm sm:text-base max-w-xl sm:max-w-2xl mx-auto mb-4 sm:mb-6 font-mada px-2">
                First and ONLY Old & New Testament Bible in Pidgin language
                available on Android devices. Inspired by God, transcribed and
                recorded in{" "}
                <span className="font-semibold">Abuja, Nigeria.</span>
              </p>
            </div>
          </div>

          <div className="pidgin-hero-bg min-h-[80vh] sm:min-h-screen relative">
            <div className="flex flex-col items-center justify-center">
              {/* texts  */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-6 sm:mb-8 font-manrope">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-[#3EA7F7]" />
                  <span className="text-xs sm:text-sm">Old & New Testament Available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-[#3EA7F7]" />
                  <span className="text-xs sm:text-sm">Make Scripture Personal</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 sm:h-5 w-4 sm:w-5 text-[#3EA7F7]" />
                  <span className="text-xs sm:text-sm">Offline Usage</span>
                </div>
              </div>
              <DownloadButtons />
            </div>
          </div>
        </section>

        {/* Features Intro */}
        <section className="py-8 sm:py-12 px-4">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-6 sm:mb-8">
              <StarTag text="Features" variant="blue" />
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 capitalize font-domine text-[#161515] px-2">
                Build Your Spirit On The Word Of God
              </h2>
              <p className="text-[#6D6B6B] text-lg sm:text-xl max-w-xl sm:max-w-2xl mx-auto font-mada px-2">
                From daily devotionals to saving Bible passages, everything you
                need for your faith journey is right here.
              </p>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="pb-12 sm:pb-16 px-4">
          <div className="d-container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
              {/* Feature 1 */}
              <div className="bg-[rgba(72,202,228,0.38)] rounded-xl p-5 sm:p-6 md:p-8 overflow-hidden flex-[0.45]">
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-domine">
                  Search, Read & Listen In Pidgin And English
                </h3>
                <p className="text-gray-700 mb-4 sm:mb-6 font-mada text-sm sm:text-base">
                  Our app allows you to seamlessly switch between pidgin and
                  English instantly, and quickly search for verses in either
                  language.
                </p>

                <div className="relative">
                  <div className="absolute right-0 top-0">
                    <Image
                      src="/png/phone-mockups/p-left.png"
                      alt="Search feature screenshot"
                      width={200}
                      height={320}
                      className="rounded-lg shadow-lg mx-auto rotate-[330deg] sm:w-[250px] sm:h-[400px]"
                    />
                  </div>
                </div>
              </div>

              {/* Feature 2 */}
              <div className="flex-1 flex flex-col gap-y-4 sm:gap-y-5">
                <div className="bg-[rgba(254,228,234,0.60)] rounded-xl pt-5 sm:pt-6 px-4 sm:px-6 md:px-8 flex flex-col sm:flex-row items-center overflow-hidden w-full sm:w-fit">
                  <div className="max-w-full sm:max-w-[460px]">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-domine">
                      Daily Inspiration & Verse Tools
                    </h3>
                    <p className="text-gray-700 mb-4 sm:mb-6 font-mada text-sm sm:text-base">
                      Receive daily devotionals in pidgin, highlight key
                      scriptures, and easily share verses with your loved ones.
                    </p>
                  </div>
                  <div className="mt-4 sm:mt-0">
                    <Image
                      src="/png/phone-mockups/p-topright.png"
                      alt="Daily inspiration feature screenshot"
                      width={200}
                      height={320}
                      className="rounded-lg shadow-lg mx-auto sm:w-[250px] sm:h-[400px]"
                    />
                  </div>
                </div>

                <div className="bg-[#DAEEFF] rounded-xl pt-5 sm:pt-6 px-4 sm:px-6 md:px-8 flex flex-col-reverse sm:flex-row items-center overflow-hidden w-full sm:w-fit">
                  <div className="mt-4 sm:mt-0">
                    <Image
                      src="/png/phone-mockups/p-bottomright.png"
                      alt="Daily inspiration feature screenshot" 
                      width={200}
                      height={320}
                      className="rounded-lg shadow-lg mx-auto mr-0 sm:mr-4 sm:w-[250px] sm:h-[400px]"
                    />
                  </div>

                  <div className="max-w-full sm:max-w-[460px]">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4 font-domine">
                      Offline Listening Made Easy
                    </h3>
                    <p className="text-gray-700 mb-4 sm:mb-6 font-mada text-sm sm:text-base">
                      To enjoy listening to the pidgin audio bible, you can
                      download the audio files to your phone. The app is not
                      pre-loaded with the audio files. To ensure offline, the
                      audio files must be downloaded.
                    </p>

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-xs">1</span>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-700">
                            Select the Book, then Chapter you want to listen{" "}
                            <span className="font-semibold">Select MENU</span>{" "}
                            (three dots) in the upper right corner of the app.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-xs">2</span>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-700">
                            Select{" "}
                            <span className="font-semibold">DOWNLOAD</span> to
                            save the audio file to your phone.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-600 text-xs">3</span>
                        </div>
                        <div>
                          <p className="text-xs sm:text-sm text-gray-700">
                            Enjoy the audio without internet connection!
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-8 sm:py-12 px-4 bg-gray-50">
          <div className="">
            <div className="text-center flex flex-col justify-center items-center mb-8 sm:mb-12">
              <StarTag text="Testimonials" variant="blue" />
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold font-domine mb-3 sm:mb-4 text-[#161515] max-w-xl sm:max-w-3xl px-2">
                Don't Take Our Word For It. Hear What Our Community Has To Say
              </h2>
            </div>

            {/* Testimonials will go here */}
            <div className="flex justify-center">
              <Image
                src="/placeholder.svg?height=100&width=200"
                alt="Testimonial signature"
                width={200}
                height={100}
                className="opacity-50"
              />
            </div>
          </div>
        </section>

        {/* Download Section */}
        <section className="px-4 bg-[#3EA7F7] mb-16 sm:mb-20 md:max-h-[764px] h-full relative yoruba-download-bg">
          {/* curve pidgin  */}
          <div className="absolute top-0 left-0 right-0 transform translate-x-[40%] hidden sm:block">
            <Image
              src="/svg/curve-download-p.svg"
              alt="curve"
              width={300}
              height={200}
            />
          </div>
          <div className="d-container !py-0">
            <div className="flex flex-col md:flex-row items-center gap-6 sm:gap-8 font-mada">
              <div className="md:w-1/2 text-white">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 font-domine pt-10">
                  Download The Pidgin Audio Bible And Stay Connected To God's
                  Word
                </h2>
                <p className="mb-4 sm:mb-6 text-sm sm:text-base">
                  Experience The Bible In Your Language - Listen, Read, And Grow
                  Your Faith Wherever You Are.
                </p>
                <p className="mb-6 sm:mb-8 text-white/80 text-xs sm:text-sm">
                  The pidgin Audio Bible App is available for Google Play and
                  Apple Play Store. Search for "pidgin Audio Bible, Download it,
                  and You Will Be Able To Listen To The Audio Bible.
                </p>
                <DownloadButtons />
              </div>

              <div className="md:w-1/2 relative mt-8 md:mt-0">
                <div className="flex items-center gap-x-6 sm:gap-x-12">
                  <div className="">
                    <Image
                      src="/png/phone-mockups/p-download-left.png"
                      alt="pidgin Bible App Screenshot - Genesis"
                      width={180}
                      height={360}
                      className="rounded-2xl sm:w-[250px] sm:h-[500px]"
                    />
                  </div>
                  <div className="flex flex-col gap-y-[45px] sm:gap-y-[75px]">
                    <Image
                      src="/png/phone-mockups/p-download-up.png"
                      alt="pidgin Bible App Screenshot - Chapter Selection"
                      width={180}
                      height={360}
                      className="rounded-2xl sm:w-[250px] sm:h-[500px]"
                    />
                    <Image
                      src="/png/phone-mockups/p-download-bottom.png"
                      alt="pidgin Bible App Screenshot - Verse Reading"
                      width={180}
                      height={360}
                      className="rounded-2xl sm:w-[250px] sm:h-[500px]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
