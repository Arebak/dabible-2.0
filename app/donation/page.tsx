import Image from "next/image";
import DonateButton from "@/components/DonateButton";
import { Progress } from "@/components/ui/progress";
import FixedGridCarousel from "@/components/FixedGridCarousel";
import { DonationForm } from "@/components/DonationForm";
import DonationCard from "@/components/DonationCard";
import StaggeredImageSection from "@/components/StaggeredGridImages";

export default function DonationPage() {
  return (
    <div className="w-full">
      {/* Header */}
      <div className="d-container px-4 sm:px-6">
        <div className="text-center mb-8 sm:mb-12 flex flex-col items-center justify-center gap-y-4 sm:gap-y-8">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#023E8A] mb-2 font-domine max-w-2xl px-4">
            Dabible Partners - Bi-Weekly Donations
          </h1>

          <div className="w-full max-w-md flex flex-col items-center justify-center gap-y-3 sm:gap-y-4 mt-4 sm:mt-8 font-nunito text-xl sm:text-2xl px-4">
            <div className="flex gap-x-1 items-center mb-2 text-[#161515]">
              <span>Goal:</span>
              <span className="font-bold">$15,000</span>
            </div>

            <div className="text-center mb-2">
              <div className="text-sm text-gray-600">Raised money</div>
              <div className="text-lg sm:text-xl font-bold text-red-600">$8,000</div>
            </div>

            <Progress value={53} className="w-full sm:w-[527px]" />

            <div className="mt-4 sm:mt-6">
              <DonateButton />
            </div>
          </div>
        </div>
      </div>

      {/* Image Carousel */}
      <div className="my-8 sm:my-12">
        <FixedGridCarousel />
      </div>

      {/* Main Content */}
      <div className="d-container px-4 sm:px-6">
        <div className="grid md:grid-cols-5 gap-6 sm:gap-8">
          <div className="md:col-span-3">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#023E8A] mb-4 sm:mb-6 font-domine">
              Project Overview
            </h2>

            <div className="space-y-3 sm:space-y-4 text-gray-700 font-mada text-sm sm:text-base">
              <p>
                It is said, &quot;when God starts a thing, he speaks to His people.&quot;
                This is doubly so for me, because it was my encounter with Baba
                that bore the Dabible foundation. It was the 25th of March 2015.
                On this fateful day, I awoke from a shocking dream. I anxiously
                looked around but saw no one. After calming down, I thought back
                on the dream and the booming voice I heard saying, &quot;Build me a
                bible app&quot;.
              </p>

              <p>Half a year ago...</p>

              <p>
                Two weeks before arriving in the United States I got saved.
                Before this I lived an ungodly lifestyle; I was a drunk, a
                chronic womanizer, and most sickening of all were my fraudulent
                escapades. Thankfully I found salvation, and I was now starting
                my journey with the Lord. I must confess though that en route to
                the US, I had aimed to run my old ways; I assumed that I
                wouldn&apos;t need God anymore. I was keen on getting drunk and
                finding a lady to keep me company upon arrival. Later on, I
                would find myself a nice American chick to marry and set myself
                up for a good life in America.
              </p>

              <p>
                Fortunately, God had other plans for me. Upon arriving in the
                US, I stayed with a very hospitable family in Spokane,
                Washington. I slept in the guest house for a couple of days.
                During this time, I fervently studied Christianity. In fact, I
                especially studied the bible. I was hungry for the word of God.
                I found that I lost the urge to drink alcohol, and the once
                overwhelming lust for the opposite sex was now dulled. All I
                wanted now was to know more about God. So, I kept reading and
                learning with none but the holy spirit as my guide. This went on
                for six months…
              </p>

              <div className="my-6 sm:my-8">
                <Image
                  src="/png/outreach.png"
                  alt="Donation activities"
                  width={600}
                  height={400}
                  className="rounded-lg w-full"
                />
              </div>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Donor Impact and Transparency
              </h3>
              <p>
                The success of Chaii&apos;s Emergency Fund relies on the generosity
                of donors who understand the critical role of immediate
                assistance in times of crisis. Chaii maintains a commitment to
                transparency by providing donors with regular updates on fund
                utilization. This ensures that donors can witness the tangible
                impact of their contributions and understand the direct effect
                on affected communities.
              </p>

              <h3 className="text-lg sm:text-xl font-bold text-gray-900">
                Components of Assistance
              </h3>
              <p>
                The Emergency Fund addresses a spectrum of immediate needs,
                including but not limited to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Shelter and Housing: Providing emergency shelter materials and
                  support to those displaced.
                </li>
                <li>
                  Food and Water: Ensuring access to nutritious food and clean
                  water in the aftermath of crises.
                </li>
                <li>
                  Medical Aid: Offering immediate medical assistance and
                  supplies to those injured or in need of healthcare.
                </li>
                <li>
                  Essential Supplies: Distributing necessities such as blankets,
                  clothing, and hygiene kits for comfort and well-being.
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-2">
            <DonationForm />
          </div>
        </div>
      </div>

      {/* Animated Images  */}
      <StaggeredImageSection />

      <section className="d-container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-bold text-[#023E8A] mb-4 sm:mb-7 font-domine">
          Other Causes
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
          <DonationCard
            imageSrc="/png/cause1.png"
            alt="Donation Project 1"
            title="Dabible Partners - Bi-weekly Donations"
            description="Your donations to our organization as a partner will be available us to record more languages in different languages and local dialects"
            progress={60}
            goalLabel="Goal"
            goalValue="$15,000"
            raisedLabel="Raised money"
            raisedValue="$8,000"
          />
          <DonationCard
            imageSrc="/png/cause2.png"
            alt="Donation Project 2"
            title="Dabible Partners - Bi-weekly Donations"
            description="Your donations to our organization as a partner will be available us to record more languages in different languages and local dialects"
            progress={60}
            goalLabel="Goal"
            goalValue="$15,000"
            raisedLabel="Raised money"
            raisedValue="$8,000"
          />
          <DonationCard
            imageSrc="/png/cause1.png"
            alt="Donation Project 3"
            title="Dabible Partners - Bi-weekly Donations"
            description="Your donations to our organization as a partner will be available us to record more languages in different languages and local dialects"
            progress={60}
            goalLabel="Goal"
            goalValue="100 donors"
            raisedLabel="Available donors"
            raisedValue="30"
          />
        </div>
      </section>
    </div>
  );
}
