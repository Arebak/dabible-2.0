/* eslint-disable react/no-unescaped-entities */

import Image from "next/image";

export default function FounderMessage() {
  return (
    <section className="bg-[#108DA6] py-12 md:py-16 mt-10 mb-36">
      <div className="container mx-auto px-4 relative">
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12">
          {/* Founder Image */}
          <div className="w-full md:w-2/5 lg:w-1/3">
            {" "}
            <Image
              src="/png/founder.png?height=600&width=450"
              alt="Demilade Adetuberu - Founder"
              width={450}
              height={600}
              className="w-full h-auto"
            />
          </div>

          {/* Message Content */}
          <div className="w-full max-w-[667px] relative">
            <div className="border-8 border-white p-6 md:p-10 relative">
              <h2 className="text-white text-2xl md:text-3xl font-bold mb-4">
                Message From Founder
              </h2>

              <p className="text-white mb-4 text-sm md:text-base">
              &quot;We are a group of young christians with a lot of technology and
                music industry background. We are not the qualified ones to
                translate the bible into our native language but God has
                strengthened our hands to produce this new versions of the
                bible.
              </p>

              <div className="flex items-start mt-6">
                <div>
                  <p className="text-white mb-4 text-sm md:text-base">
                    Our team a just a group of youths who volunteered to
                    dedicate our lives to this project. Thank you for supporting
                    us, encouraging us and strengthening our hands into doing
                    more.&quot;
                  </p>

                  <p className="text-white mb-4 text-sm md:text-base">
                    DaBible Foundation is an open source project, which means
                    anyone can become a participate. If you wish to join us,
                    contact us directly at support@dabible.com
                  </p>

                  <div className="flex items-center justify-end mt-4">
                    <div className="text-right">
                      <p className="text-white font-bold">DEMILADE ADETUBERU</p>
                      <p className="text-[#03224A] font-bold text-xs mt-2">
                        CO-FOUNDER & TEAM LEADER
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <Image
                src="/png/quote.png"
                alt="quote icon"
                width={67}
                height={67}
                className="absolute top-[40%] -left-10"
              />
              <Image
                src="/png/quote2.png"
                alt="quote icon"
                width={67}
                height={67}
                className="absolute top-[40%] -right-10"
              />
            </div>
          </div>
        </div>
        <Image
          src="/png/heart.png"
          alt="heart image"
          width={500}
          height={500}
          className="absolute -top-10 right-0"
        />
      </div>
    </section>
  );
}
