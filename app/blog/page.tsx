
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  return (
    <main className="mx-auto px-4">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden md:pt-[70px] min-h-[40vh]">
        {/* Faded oval background */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full md:w-[1000px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
          }}
        />

        <Image
          src="/png/red-circle.png"
          alt="heart image"
          width={200}
          height={200}
          className="absolute -top-10 right-0 w-32 md:w-48 lg:w-52"
        />
        <Image
          src="/png/blue-circle.png"
          alt="heart image"
          width={200}
          height={200}
          className="absolute -top-10 left-0 w-32 md:w-48 lg:w-52"
        />
        <div className="max-w-3xl mx-auto text-center px-4">
          <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-4 md:mb-6">
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className="mr-1 w-3 h-3 md:w-4 md:h-4"
            />{" "}
            Blog{" "}
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className="ml-1 w-3 h-3 md:w-4 md:h-4"
            />
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] mb-4 md:mb-6 font-domine">
            Recent Stories & Articles
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 font-mada px-2">
            These blog post ideas aim to showcase the multifaceted nature of
            Dabible&apos;s work, from education and emergency relief to environmental
            conservation.
          </p>
        </div>
      </section>

      <section className="mb-20 d-container flex flex-col lg:flex-row justify-center items-start gap-x-10 gap-y-8 font-mada">
        {/* Featured Article */}
        <div className="flex flex-col gap-y-6 w-full lg:w-auto">
          <div className="relative">
            <Image
              src="/png/outreachb.png"
              alt="Humanitarian work"
              width={775}
              height={475}
              className="w-full lg:w-[775px] h-[250px] sm:h-[300px] md:h-[375px] object-cover object-top rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center px-2">
            <div className="text-sm text-gray-500 mb-2">Mar 4, 2025</div>
            <h2 className="text-lg sm:text-xl font-bold mb-2">
              Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1
              Kings, AndHebrews
            </h2>
            <p className="text-sm sm:text-base text-gray-600 mb-4">
              We currently run 4 YouTube channels, each dedicated to Yoruba,
              Hausa, Pidgin, Dabible Missionary, and Daily Bible Study.
              Subscribe to watch edifying contents today.
            </p>
            <div className="flex justify-end items-center">
              <Link
                href="/blog/id"
                className="flex items-center text-base sm:text-lg text-[#A0072F] font-bold"
              >
                Read post <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Article List */}
        <div className="space-y-6 w-full lg:w-auto">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex flex-col sm:flex-row items-center gap-4 sm:gap-6 border-b pb-6 ${
                item === 3 && "border-b-0"
              }`}
            >
              <div className="w-full sm:w-1/4">
                <Image
                  src="/png/version-sample.png"
                  alt="Version 7.0"
                  width={338}
                  height={220}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="w-full sm:w-3/4 mt-4 sm:mt-0">
                <div className="text-sm text-gray-500 mb-1">Mar 4, 2025</div>
                <h3 className="text-base sm:text-lg font-bold mb-2">
                  Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1
                  Kings, AndHebrews
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-2">
                  We currently run 4 YouTube channels, each dedicated to Yoruba,
                  Hausa, Pidgin, Dabible Missionary, and Daily Bible Study.
                  Subscribe to watch edifying contents today.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Recent Posts Section */}
      <section className="d-container px-4">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-[#1a4b8c] mb-8 sm:mb-12">
          Recent Posts
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 18 }).map((_, index) => (
            <div
              key={index}
              className="bg-[#F6F6F6] border rounded-2xl !overflow-hidden shadow-sm"
            >
              <Image
                src="/png/version-sample.png"
                alt="Version 7.0"
                width={338}
                height={220}
                className="w-full"
              />
              <div className="p-4 sm:p-6">
                <div className="text-xs sm:text-sm text-gray-500 mb-2">Mar 4, 2025</div>
                <h3 className="text-base sm:text-lg text-[#051D3B] font-bold mb-2 sm:mb-3">
                  Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1
                  Kings, AndHebrews
                </h3>
                <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-5">
                  We currently run 4 YouTube channels, each dedicated to Yoruba,
                  Hausa, Pidgin, Dabible Missionary, and Daily Bible Study.
                  Subscribe to watch edifying contents today.
                </p>

                <div className="flex justify-end items-center">
                  <Link
                    href="/blog/id"
                    className="flex items-center text-xs sm:text-sm text-[#A0072F] font-bold"
                  >
                    Read post <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center my-8 sm:my-12 lg:my-16">
          <Button className="bg-[#A0072F] w-[140px] sm:w-[168px] h-[38px] sm:h-[43px] text-sm sm:text-base">
            Load More
          </Button>
        </div>
      </section>
    </main>
  );
}
