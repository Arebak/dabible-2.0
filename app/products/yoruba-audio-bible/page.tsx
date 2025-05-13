import Image from "next/image";
import { CheckCircle } from "lucide-react";
import DownloadButtons from "@/components/DownloadButtons";
import StarTag from "@/components/StarTag";

export default function YorubaBiblePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-blue-50 overflow-hidden">
      {/* Hero Section */}
      <section className="pt-10 pb-8 px-4 md:pt-16 md:pb-12 bg-[#FFFEFF] ">
        <div className="l-container ">
          <div className="text-center flex flex-col justify-center items-center">
            <p className="text-sm text-gray-600 mb-2 font-mada">
              Listen To God's Word In Yoruba
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#9b2242] mb-4 font-domine">
              Gbọ Ọrọ Ọlọrun Ní Èdè Yorùbá
            </h1>
            <p className="text-gray-700 max-w-2xl mx-auto mb-6 font-mada">
              Inspired by God, recorded in{" "}
              <span className="font-semibold">Ibadan, Nigeria</span>. The first
              and only old & new testament bible in the Yoruba language. You can
              easily switch between Yoruba and English without affecting the
              audio player.
            </p>
          </div>
        </div>

        <div className="yoruba-hero-bg min-h-screen relative">
          <div className="flex flex-col items-center justify-center">
            {/* texts  */}
            <div className="flex flex-wrap justify-center gap-6 mb-8 font-manrope">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b2242]" />
                <span className="text-sm">Old & New Testament Available</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b2242]" />
                <span className="text-sm">Make Scripture Personal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-[#9b2242]" />
                <span className="text-sm">Offline Usage</span>
              </div>
            </div>
            <DownloadButtons />
          </div>
          {/* hand  */}{" "}
        </div>
      </section>

      {/* Features Intro */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-8">
            <StarTag text="Features" variant="rose" />
            <h2 className="text-3xl md:text-4xl font-bold mb-4 font-domine text-[#161515] ">
              Build Your Spirit On The Word Of God
            </h2>
            <p className="text-[#6D6B6B] text-xl max-w-2xl mx-auto font-mada ">
              From daily devotionals to saving Bible passages, everything you
              need for your faith journey is right here.
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="pb-16 px-4">
        <div className="d-container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Feature 1 */}
            <div className="bg-[rgba(72,202,228,0.38)] rounded-xl p-6 md:p-8 overflow-hidden flex-[0.45]">
              <h3 className="text-xl font-bold mb-4 font-domine">
                Search, Read & Listen In Yoruba And English
              </h3>
              <p className="text-gray-700 mb-6 font-mada">
                Our app allows you to seamlessly switch between Yoruba and
                English instantly, and quickly search for verses in either
                language.
              </p>

              <div className="relative ">
                <div className="absolute right-0 top-0">
                  <Image
                    src="/png/phone-mockups/y-left.png"
                    alt="Search feature screenshot"
                    width={250}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto rotate-[330deg]"
                  />
                </div>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="flex-1 flex flex-col gap-y-5 ">
              <div className="bg-[rgba(254,228,234,0.60)] rounded-xl pt-6 px-6 md:px-8 flex items-center overflow-hidden w-fit">
                <div className="max-w-[460px]">
                  <h3 className="text-xl font-bold mb-4 font-domine ">
                    Daily Inspiration & Verse Tools
                  </h3>
                  <p className="text-gray-700 mb-6 font-mada">
                    Receive daily devotionals in Yoruba, highlight key
                    scriptures, and easily share verses with your loved ones.
                  </p>
                </div>
                <div className="">
                  <Image
                    src="/png/y-topright.png"
                    alt="Daily inspiration feature screenshot"
                    width={250}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto"
                  />
                </div>
              </div>
              <div className="bg-[#DAEEFF] rounded-xl pt-6 px-6 md:px-8 flex items-center overflow-hidden w-fit">
                <div className="">
                  <Image
                    src="/png/phone-mockups/y-bottomright.png"
                    alt="Daily inspiration feature screenshot"
                    width={250}
                    height={400}
                    className="rounded-lg shadow-lg mx-auto mr-4"
                  />
                </div>

                <div className="max-w-[460px]  ">
                  <h3 className="text-xl font-bold mb-4 font-domine">
                    Offline Listening Made Easy
                  </h3>
                  <p className="text-gray-700 mb-6 font-mada">
                    To enjoy listening to the Yoruba audio bible, you can
                    download the audio files to your phone. The app is not
                    pre-loaded with the audio files. To ensure offline, the
                    audio files must be downloaded.
                  </p>

                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-xs">1</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          Select the Book, then Chapter you want to listen{" "}
                          <span className="font-semibold">Select MENU</span>{" "}
                          (three dots) in the upper right corner of the app.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-xs">2</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
                          Select <span className="font-semibold">DOWNLOAD</span>{" "}
                          to save the audio file to your phone.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 flex-shrink-0 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 text-xs">3</span>
                      </div>
                      <div>
                        <p className="text-sm text-gray-700">
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
      <section className="py-12 px-4 bg-gray-50">
        <div className="">
          <div className="text-center flex flex-col justify-center items-center mb-12">
            <StarTag text="Testimonials" variant="rose" />
            <h2 className="text-2xl md:text-3xl font-bold font-domine mb-4 text-[#161515] max-w-3xl">
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
      <section className=" px-4 bg-[#C8385E] mb-20 md:max-h-[764px] h-full relative  yoruba-download-bg">
        {/* curve yoruba  */}
        <div className="absolute top-0 left-0 right-0 transform translate-x-[40%]">
          <Image
            src="/png/phone-mockups/curve-download-yoruba.png"
            alt="curve"
            width={300}
            height={200}
          />
        </div>
        {/* <div className="absolute top-0 left-0 right-0 transform translate-x-[40%]">
            <Image
              src="/png/phone-mockups/bg-download-yoruba.png"
              alt="curve"
              width={300}
              height={200}
            />
          </div> */}
        <div className="d-container !py-0">
          <div className="flex flex-col md:flex-row items-center gap-8 font-mada">
            <div className="md:w-1/2 text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 font-domine pt-10">
                Download The Yoruba Audio Bible And Stay Connected To God's Word
              </h2>
              <p className="mb-6">
                Experience The Bible In Your Language - Listen, Read, And Grow
                Your Faith Wherever You Are.
              </p>
              <p className="mb-8 text-white/80 text-sm">
                The Yoruba Audio Bible App is available for Google Play and
                Apple Play Store. Search for "Yoruba Audio Bible, Download it,
                and You Will Be Able To Listen To The Audio Bible.
              </p>
              <DownloadButtons />
            </div>

            <div className="md:w-1/2 relative">
              <div className="flex items-center gap-x-12">
                <div className="">
                  <Image
                    src="/png/phone-mockups/y-download-left.png"
                    alt="Yoruba Bible App Screenshot - Genesis"
                    width={250}
                    height={500}
                    className="rounded-2xl"
                  />
                </div>
                <div className="flex flex-col gap-y-[75px]">
                  <Image
                    src="/png/phone-mockups/y-download-top.png"
                    alt="Yoruba Bible App Screenshot - Chapter Selection"
                    width={250}
                    height={500}
                    className="rounded-2xl"
                  />
                  <Image
                    src="/png/phone-mockups/y-download-bottom.png"
                    alt="Yoruba Bible App Screenshot - Verse Reading"
                    width={250}
                    height={500}
                    className="rounded-2xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
