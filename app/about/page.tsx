import TeamSection from "@/components/TeamSection";
import { Clipboard } from "lucide-react";
import Image from "next/image";

export default function OurStoryPage() {
  // Team data
  const teams = [
    {
      title: "Leadership",
      members: [
        { name: "Demilade Adetuberu", role: "Founder", image: "/png/demi.png" },
        { name: "Sanmi Ayotunde", role: "Co-Founder", image: "/png/sanmi.png" },
        {
          name: "Chineye Chidebelu", 
          role: "Senior Manager",
          image: "/png/nenye.png",
        },
        {
          name: "Akinola Ogunyemi",
          role: "Director, Nigeria",
          image: "/png/akinola.png",
        },
      ],
    },
    {
      title: "Hausa Bible Crew",
      members: [
        {
          name: "Wajim Micah T",
          role: "Project Manager",
          image: "/png/default.png",
        },
        {
          name: "Bulus Bengo",
          role: "Audio engineer",
          image: "/png/default.png",
        },
        {
          name: "Pastor Markus Bala",
          role: "Voice-over Artist",
          image: "/png/p-mark.png",
        },
        { name: "Faruk Faruk", role: "Editor", image: "/png/default.png" },
      ],
    },
    {
      title: "Yoruba Bible Crew",
      members: [
        { name: "Abiola Oduremi", role: "Reciter", image: "/png/abiola.png" },
        {
          name: "Akinsola Ayodele",
          role: "Studio Engineer",
          image: "/png/akinsola.png",
        },
      ],
    },
    {
      title: "Pidgin Bible Crew",
      members: [
        {
          name: "Kolawole Oduremi",
          role: "Studio engineer",
          image: "/png/kolawole.png",
        },
        {
          name: "Samuel Alawiye",
          role: "Transcriber",
          image: "/png/samuel.png",
        },
        {
          name: "Akinola Ogunyemi",
          role: "Reciter",
          image: "/png/akinola.png",
        },
        {
          name: "Babatope Ajetunmobi",
          role: "Transcriber",
          image: "/png/babatope.png",
        },
        { name: "Yinka Falola", role: "Reviewer", image: "/png/yinka.png" },
      ],
    },
    {
      title: "Solar Audio Bible Crew",
      members: [
        {
          name: "Sanmi Ayotunde",
          role: "Program Director",
          image: "/png/sanmi.png",
        },
        {
          name: "Esther Aina",
          role: "Wireframe Designer",
          image: "/png/esther.png",
        },
        { name: "Iyin Fagbemi", role: "Supply Chain", image: "/png/iyin.png" },
        { name: "Joseph Edoki", role: "Fundraising", image: "/png/joseph.png" },
        {
          name: "Emmanuel Oni",
          role: "Fundraising",
          image: "/png/emmanuel.png",
        },
      ],
    },
    {
      title: "Mobile & Web Development",
      members: [
        {
          name: "Ayotomiwa Solarin",
          role: "UI/UX Designer",
          image: "/png/ayo.png",
        },
        {
          name: "Ayogu Jennifer",
          role: "UI/UX Designer",
          image: "/png/jenny.png",
        },
        { name: "Andre Ene", role: "Web Developer", image: "/png/andre.png" },
        { name: "Ini Jones", role: "Flutter Developer", image: "/png/ini.png" },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-white">
      {/* Header Section */}
      <section className="py-6 sm:py-8 md:py-12 text-center px-4">
        <div className="inline-flex items-center bg-[#023E8A] text-white px-3 py-1 rounded-full mb-3 sm:mb-4 md:mb-6">
          <Image
            src="/svg/start.svg"
            alt="star icon"
            width={16}
            height={16}
            className="mr-1"
          />{" "}
          ABOUT US
          <Image
            src="/svg/start.svg"
            alt="star icon"
            width={16}
            height={16}
            className="ml-1"
          />
        </div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#023E8A] mb-3 sm:mb-4 md:mb-6 font-domine">
          Our Story
        </h1>

        <div className="max-w-3xl mx-auto">
          <p className="text-base sm:text-lg md:text-xl font-medium text-gray-700 mb-4 sm:mb-6 md:mb-8 font-mada px-4 sm:px-6">
            &quot;Just recently converted, and I was quite skeptical. It was my first
            such experience, and I needed to be sure it was the voice of the
            Lord. The Holy Spirit ministered to me in the form of a question
            &quot;What will Satan gain from you building a bible app?&quot; That put an
            end to my doubts.&quot;
          </p>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-4 sm:py-6 border-t border-b border-gray-200 overflow-x-auto">
        <div className="px-4 sm:px-6">
          <div className="flex flex-nowrap gap-x-4 sm:gap-x-6 md:gap-x-10 pb-4 md:justify-center">
            {[
              {
                src: "/png/empower1.png",
                alt: "Missionary Field in Niger State",
                caption: "Missionary Field in Niger State",
              },
              {
                src: "/png/empower2.png",
                alt: "Zikpak Children Outreach 2021",
                caption: "Zikpak Children Outreach 2021",
              },
              {
                src: "/png/empower4.png",
                alt: "Evangelism Crusade",
                caption:
                  "Evangelism Crusade: The first wife looks always to lead others to Christ",
              },
              {
                src: "/png/empower1.png",
                alt: "Hausa, Zazzagawa, and Adara communities",
                caption:
                  "Hausa, Zazzagawa, and Adara communities of Kaduna State outreach",
              },
              {
                src: "/png/empower2.png",
                alt: "Kajinjiri Village Outreach",
                caption: "Kajinjiri Village Outreach by Missionaries",
              },
            ].map((image, index) => (
              <div
                key={index}
                className="flex-none w-48 sm:w-56 md:w-64 lg:w-[272px] relative bg-[#FAEDED] p-3 sm:p-4 rounded-lg"
              >
                <div className="relative">
                  <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C8385E] w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center rounded-sm z-10">
                    <Clipboard className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>

                  <div className="h-28 sm:h-32 md:h-36 relative rounded-md overflow-hidden">
                    <Image
                      src={image.src || "/placeholder.svg"}
                      alt={image.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm mt-2 text-gray-700">{image.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our True Simple Story Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-2/3">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-4 sm:mb-6 font-domine">
                Our True Simple Story
              </h2>
              <div className="text-gray-700 space-y-3 sm:space-y-4 text-sm sm:text-base font-inter">
                <p>
                  When we say &quot;our story,&quot; we are not merely putting pleasing
                  words together to gain credibility or seek gratification. No, it
                  is much deeper than that, a lot more personal, and of course
                  very spiritual. This adventure recounts raw, unbroken
                  testimonies of real people, actual situations, and of God&apos;s
                  divine empowerment. We are narrating the story of how God used a
                  few individuals collectively to make this platform you have here
                  today. Consequently, we are thankful to God for His direction,
                  we acknowledge God&apos;s sovereignty and His ultimate hand in making
                  this vision a reality.
                </p>
                <p>
                  Before we get on with the story, first, introductions. We of
                  &quot;The DaBible Foundation&quot; are a team of energetic youths doing
                  the work of God. We are glad to have brought you the Yoruba
                  Audio Bible app and the Pidgin Audio Bible app. As mere workers
                  in His vineyard, we&apos;ve worked tirelessly to make these projects
                  possible. Many among us are not professionals, some are even
                  college students, but we are all people who God ordained to
                  accomplish His task. A quick note: we are not a church, as our
                  DaBible foundation leader once said, &quot;When God commits you to do
                  something, He will empower you to do it.&quot; This is our belief in
                  the DaBible foundation. You will come to know some of our team
                  members, in fact, we have listed a few of our team members
                  below. On that note, there are also quite a several people that
                  have been pivotal to the success of our project that may not
                  appear on this list. We haven&apos;t forgotten, and indeed God has
                  not either; we appreciate all you have done and continue to do.
                  Finally, we are particularly grateful to our crew that brought
                  us the Hausa bible audio. You all are remarkable. Your
                  consistency and zeal have significantly expedited the future
                  release of the Hausa audio bible app. Thank you.
                </p>
              </div>
            </div>
            <div className="w-full md:w-1/3 mt-6 md:mt-0">
              <div className="bg-blue-500 h-full rounded-lg min-h-[200px] sm:min-h-[300px]"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Red Arrow Section */}
      <section className="py-6 sm:py-8 flex justify-center">
        <Image
          src="/png/right-down2.png"
          alt="Red arrow pointing to the story"
          width={160}
          height={160}
          className="w-40 sm:w-48 md:w-56"
        />
      </section>

      {/* The Story Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center font-domine font-bold text-[#023E8A] mb-6">
            The Story
          </h2>

          <div className="max-w-4xl font-inter mx-auto text-[#121212] space-y-4 sm:space-y-6 text-sm sm:text-base">
            {/* ... Rest of the story content remains the same ... */}
          </div>
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="py-8 sm:py-12 md:py-16">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-domine font-bold text-[#023E8A] mb-6 sm:mb-8">
            Our Achievements
          </h2>

          <div className="teal-gradient rounded-xl p-4 sm:p-6 md:p-10 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-2 font-montserrat">
                  239k+
                </h3>
                <p className="text-base sm:text-lg md:text-xl font-mada max-w-[250px]">
                  Downloads across all our apps as of 2020
                </p>
              </div>

              {/* ... Other achievement items with similar responsive classes ... */}
            </div>
          </div>
        </div>
      </section>

      {/* Our Expectations Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8">
            <div className="w-full md:w-1/2">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-4 sm:mb-6">
                Our Expectations At DaBible Foundation
              </h2>

              <div className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-700">
                {/* ... Expectations content remains the same ... */}
              </div>
            </div>

            <div className="w-full md:w-1/2 relative">
              <div className="relative h-[250px] sm:h-[300px] md:h-[400px] overflow-hidden">
                {/* ... Image layout remains the same ... */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-8 sm:py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-8 sm:mb-12 text-center">
            Meet The Team
          </h2>

          {teams.map((team, index) => (
            <TeamSection
              key={index}
              title={team.title}
              members={team.members}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
