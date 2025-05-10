/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  MessageSquare,
  ArrowRight,
} from "lucide-react";

export default function AudioIssuesResolvedPage() {
  return (
    <main className="">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden md:pt-[70px] min-h-[518px]">
        {/* Faded oval background */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-full h-full rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
          }}
        />
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#1a4b8c] mb-6">
            Audio Issues Resolved – Nahum, Psalm 60, Songs Of Solomon, 1 Kings,
            AndHebrews
          </h1>

          <p className="text-center font-semibold mb-4 text-xl text-[#121212]">
            March 4, 2025
          </p>

          <p className="pb-8 pt-4 md:text-2xl font-medium text-[#121212]">
            We currently run 4 YouTube channels, each dedicated to Yoruba,
            Hausa, Pidgin, DaBible Missionary, and Daily Bible Study. Subscribe
            to watch edifying contents today.
          </p>
          {/* Social Media Sharing */}
          <div className="flex justify-center gap-3">
            <Link href="#" className="bg-[#1a4b8c] text-white p-2 rounded-full">
              <Facebook size={20} />
            </Link>
            <Link href="#" className="bg-[#1a4b8c] text-white p-2 rounded-full">
              <Twitter size={20} />
            </Link>
            <Link href="#" className="bg-[#1a4b8c] text-white p-2 rounded-full">
              <Instagram size={20} />
            </Link>
            <Link href="#" className="bg-[#1a4b8c] text-white p-2 rounded-full">
              <MessageSquare size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="m-container px-4 py-12">
        {/* Featured Image */}
        <div className="mb-8 mt-5">
          <Image
            src="/png/version.png"
            alt="Version 7.0 App Interface"
            width={800}
            height={450}
            className="w-full rounded-lg"
          />
        </div>

        {/* Article Content */}
        <article className="prose max-w-none">
          <p>
            We're thrilled to announce a significant update for our beloved
            Yoruba Audio Bible app. Version 7.0.0 is set to launch in the first
            week of November 2024, and we can't wait for you to experience
            everything it offers. This new release continues our journey to make
            the Word of God accessible to as many people as possible, and it
            comes packed with features designed to enhance your spiritual life.
          </p>

          <h2 className="font-bold text-[#121212] my-8 text-lg">
            Reflecting on Our Journey
          </h2>

          <p>
            At DaBible Foundation, we've always been driven by the vision of
            making the Bible available to all, regardless of location or
            literacy level. From our humble beginnings, we've worked tirelessly
            to ensure our audio Bibles resonate deeply with Yoruba, Pidgin, and
            Hausa speakers across the globe. Our Solar Audio Bible Project has
            been a unique part of this mission; once released, it will enable us
            to distribute solar-powered audio Bibles to elderly people in remote
            areas who may not have smartphones or regular access to power. And
            yes, we invite everyone to join us by donating to help fundraise
            this vital project.
          </p>

          <h2 className="font-bold text-[#121212] my-8 text-lg">
            Meet Our Talented Developer Team
          </h2>

          <p>
            Once in a while, we must appreciate the hands that cook the soup.
            Behind our technology stands a team of incredibly dedicated
            developers. Our Android experts, Akorede Egbeolowo and Ini-Ebong
            Jones, have crafted a seamless and responsive app experience that
            Android users have come to love. Their work has been instrumental in
            creating a robust platform that consistently meets the needs of our
            community.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-8">
            <Image
              src="/png/donation1.png"
              alt="DaBible Foundation community work"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <Image
              src="/png/donation1.png"
              alt="DaBible Foundation community work"
              width={300}
              height={300}
              className="rounded-lg"
            />
            <Image
              src="/png/donation1.png"
              alt="DaBible Foundation community work"
              width={300}
              height={300}
              className="rounded-lg"
            />
          </div>

          <p>
            On the iOS front, we're fortunate to have Daniel Jermaine, whose
            expertise has transformed our app. Known in the iOS community for
            his exceptional skills, Daniel took our legacy app to a new level,
            making it one of the most respected Bible apps available. His
            contributions have ensured that the Yoruba Audio Bible on iOS offers
            a reliable and seamless experience for users. He has also been
            instrumental in enhancing the UI and UX design, bringing strong
            problem-solving abilities to every challenge outside his scope of
            work.
          </p>

          <h2 className="font-bold text-[#121212] my-8 text-lg">
            What to Expect in Version 7.0.0
          </h2>

          <p>
            In this latest release, we're excited to introduce three distinct
            audio versions, so you can choose the one that best fits your style
            of listening:
          </p>
          <ul className="list-disc ml-10 my-4 space-y-3">
            <li>
              <strong>Dramatized Version</strong> – Experience the Word with
              engaging voice acting and sound effects.
            </li>
            <li>
              <strong>Background Music Version</strong> – Enjoy a calming
              background melody that enhances the spiritual ambiance.
            </li>
            <li>
              <strong>No Background Music Version</strong> – For a
              straightforward, unembellished delivery, perfect for focused
              study.
            </li>
          </ul>
        </article>
      </div>

      <section className="d-container">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1a4b8c] mb-12 font-domine">
          See More Posts
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
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
      </section>
    </main>
  );
}
