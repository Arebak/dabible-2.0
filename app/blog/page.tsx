import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Blog() {
  return (
    <main className=" mx-auto px-4 py-12">
      {/* Hero Section */}
      <section className=" mx-auto px-4 py-8 md:py-12 bg-gradient-to-r from-blue-50 to-transparent">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-4 md:mb-6">
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className=" mr-1"
            />{" "}
            Blog{" "}
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className=" ml-1"
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] mb-4 md:mb-6 font-domine">
            Recent Stories & Articles
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 font-mada">
            These blog post ideas aim to showcase the multifaceted nature of
            Dabible's work, from education and emergency relief to environmental
            conservation.
          </p>
        </div>
      </section>

      <section className="mb-20 d-container flex justify-center items-start gap-x-10 font-mada">
        {/* Featured Article */}
        <div className="flex flex-col gap-y-6">
          <div className="relative">
            <Image
              src="/png/outreachb.png"
              alt="Humanitarian work"
              width={775}
              height={475}
              className="w-[775px] h-[375px] object-cover object-top rounded-lg"
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="text-sm text-gray-500 mb-2">Mar 4, 2025</div>
            <h2 className="text-xl font-bold mb-2">
              Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1
              Kings, AndHebrews
            </h2>
            <p className="text-gray-600 mb-4">
              We currently run 4 YouTube channels, each dedicated to Yoruba,
              Hausa, Pidgin, Dabible Missionary, and Daily Bible Study.
              Subscribe to watch edifying contents today.
            </p>
            <div className="flex justify-end items-center">
              <Link
                href="/blog/id"
                className="flex items-center text-lg text-[#A0072F] font-bold"
              >
                Read post <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Article List */}
        <div className="space-y-6">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`flex flex-col md:flex-row items-center gap-6 border-b pb-6 ${item === 3 && 'border-b-0'}`}
            >
              <div className="md:w-1/4">
                <Image
                  src="/png/version-sample.png"
                  alt="Version 7.0"
                  width={338}
                  height={220}
                  className="w-full rounded-lg"
                />
              </div>
              <div className="md:w-3/4">
                <div className="text-sm text-gray-500 mb-1">Mar 4, 2025</div>
                <h3 className="text-lg font-bold mb-2">
                  Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1
                  Kings, AndHebrews
                </h3>
                <p className="text-gray-600 text-sm mb-2">
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
      <section className="d-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a4b8c] mb-12">
          Recent Posts
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
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
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-2">Mar 4, 2025</div>
                <h3 className="text-lg text-[#051D3B] font-bold mb-3">
                  Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1
                  Kings, AndHebrews
                </h3>
                <p className="text-gray-600 text-base mb-5">
                  We currently run 4 YouTube channels, each dedicated to Yoruba,
                  Hausa, Pidgin, Dabible Missionary, and Daily Bible Study.
                  Subscribe to watch edifying contents today.
                </p>

                <div className="flex justify-end items-center">
                  <Link
                    href="/blog/id"
                    className="flex items-center text-sm text-[#A0072F] font-bold"
                  >
                    Read post <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center my-16">
          <Button className="bg-[#A0072F] w-[168px] h-[43px] ">
            Load More
          </Button>
        </div>
      </section>
    </main>
  );
}
