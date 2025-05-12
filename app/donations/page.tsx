import Image from "next/image";
import { Button } from "@/components/ui/button";
import DonationCard from "@/components/DonationCard";
import AlternativeMethods from "@/components/AlternativeMethods";
import FounderMessage from "@/components/FounderMessage";
import "animate.css";
// import DonationReceipt from "@/components/DonationReceipt";
import VerticalCarousel from "@/components/VerticalCarousel";

export default function DonationPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-white overflow-hidden md:pt-[70px]">
        {/* Faded oval background */}
        <div
          className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[300px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, #38A9CF1C 40%, transparent 100%)",
          }}
        ></div>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-4 md:mb-6">
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className=" mr-1"
            />{" "}
            Donation{" "}
            <Image
              src="/svg/start.svg"
              alt="star icon"
              width={16}
              height={16}
              className=" ml-1"
            />
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] mb-4 md:mb-6 font-domine">
            Great Futures Are Built With A Little Charity
          </h1>
          <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-8 font-mada">
            We appreciate every whit of donation that comes our way! We use this
            funding to produce our audio bible, solar audio device, sponsor
            missionaries, children revivals, and many more. All donations are
            tax deductible and you can view your donation history from your
            Donors Dashboard.
          </p>
          <Button className="bg-[#C8385E] hover:bg-[#C8385E]/90 border-[#A0072F] text-white px-4 md:px-6 py-3  h-fit text-sm md:text-sm">
            GO TO DONOR DASHBOARD
          </Button>
        </div>
      </section>

      {/* Donation Cards Grid */}
      <div className="flex justify-center">
        <Image
          src="/png/frame.png"
          width={1585}
          height={598}
          alt="grid cards"
        />
      </div>

      {/* Our Causes Section */}
      <section className="container mx-auto px-4 py-8 md:py-12 md:mt-20 mt-16">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-2 md:mb-4 font-domine">
          Our Causes
        </h2>
        <p className="text-sm md:text-base text-gray-700 mb-6 md:mb-12 max-w-2xl font-mada">
          We are a force fueled by compassion, committed to uplifting
          communities and transforming lives around the world.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
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
          <DonationCard
            imageSrc="/png/cause2.png"
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
            imageSrc="/png/cause1.png"
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
            imageSrc="/png/cause2.png"
            alt="Donation Project 3"
            title="Dabible Partners - Bi-weekly Donations"
            description="Your donations to our organization as a partner will be available us to record more languages in different languages and local dialects"
            progress={60}
            goalLabel="Goal"
            goalValue="100 donors"
            raisedLabel="Available donors"
            raisedValue="30"
          />
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

      {/* Alternative Methods */}
      <AlternativeMethods />

      {/* Donation Animation Receipt */}
      <div className=" max-h-[60vh]">
        <VerticalCarousel />
      </div>
      {/* Founders Message  */}
      <FounderMessage />
    </div>
  );
}
