/* eslint-disable react/no-unescaped-entities */
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
      <section className="py-6 sm:py-8 md:py-12 text-center px-4 sm:px-6 md:px-8">
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
            &quot;Just recently converted, and I was quite skeptical. It was my
            first such experience, and I needed to be sure it was the voice of
            the Lord. The Holy Spirit ministered to me in the form of a question
            &quot;What will Satan gain from you building a bible app?&quot; That
            put an end to my doubts.&quot;
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
                className="flex-none w-[250px] sm:w-[280px] md:w-[300px] relative bg-[#FAEDED] p-3 sm:p-4 rounded-lg"
              >
                <div className="relative">
                  <div className="absolute -top-6 sm:-top-8 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#C8385E] w-5 sm:w-6 h-5 sm:h-6 flex items-center justify-center rounded-sm z-10">
                    <Clipboard className="w-4 sm:w-5 h-4 sm:h-5" />
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
                <p className="text-xs sm:text-sm mt-2 text-gray-700 line-clamp-2">
                  {image.caption}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our True Simple Story Section */}
      <section className="py-12 md:py-16 lg:bg-[url('/png/blue-pattern.png')] bg-no-repeat bg-contain bg-right">
        <div className="container mx-auto px-4 flex flex-col md:flex-row">
          <div className="w-full md:w-2/3 pr-0 md:pr-8">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-6 font-domine">
              Our True Simple Story
            </h2>
            <div className="text-gray-700 space-y-4 text-sm md:text-base font-inter">
              <p>
                When we say &quot;our story,&quot; we are not merely putting
                pleasing words together to gain credibility or seek
                gratification. No, it is much deeper than that, a lot more
                personal, and of course very spiritual. This adventure recounts
                raw, unbroken testimonies of real people, actual situations, and
                of God&apos;s divine empowerment. We are narrating the story of
                how God used a few individuals collectively to make this
                platform you have here today. Consequently, we are thankful to
                God for His direction, we acknowledge God&apos;s sovereignty and
                His ultimate hand in making this vision a reality.
              </p>
              <p>
                Before we get on with the story, first, introductions. We of
                &quot;The DaBible Foundation&quot; are a team of energetic
                youths doing the work of God. We are glad to have brought you
                the Yoruba Audio Bible app and the Pidgin Audio Bible app. As
                mere workers in His vineyard, we&apos;ve worked tirelessly to
                make these projects possible. Many among us are not
                professionals, some are even college students, but we are all
                people who God ordained to accomplish His task. A quick note: we
                are not a church, as our DaBible foundation leader once said,
                &quot;When God commits you to do something, He will empower you
                to do it.&quot; This is our belief in the DaBible foundation.
                You will come to know some of our team members, in fact, we have
                listed a few of our team members below. On that note, there are
                also quite a several people that have been pivotal to the
                success of our project that may not appear on this list. We
                haven&apos;t forgotten, and indeed God has not either; we
                appreciate all you have done and continue to do. Finally, we are
                particularly grateful to our crew that brought us the Hausa
                bible audio. You all are remarkable. Your consistency and zeal
                have significantly expedited the future release of the Hausa
                audio bible app. Thank you.
              </p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center md:w-1/3 mt-8 md:mt-0">
            <Image
              src={"/png/story.png"}
              alt="Our Story"
              width={400}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Red Arrow Section */}
      <section className="py-8 flex justify-center">
        <Image
          src="/svg/red-arrow.svg"
          alt="Red arrow pointing to the story"
          width={120}
          height={120}
          className="rotate-[70deg]"
        />
      </section>

      {/* The Story Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="m-container mx-auto px-4">
          <h2 className="text-2xl text-center font-domine md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-6">
            The Story
          </h2>

          <div className="max-w-4xl font-inter mx-auto text-[#121212] space-y-6 text-sm md:text-base">
            <p>
              When we say “our story,” we are not merely putting pleasing words together for credibility or gratification. This adventure recounts true stories of real people and God’s faithfulness. Demilade began with skepticism, uncertainty, and a yearning for purpose. She found herself at a crossroads, which led her to pray and intercede for souls. Little did she know that God was already working with another person on the other side of the world, who would join hands to give birth to the DaBible Foundation. 
            </p>

            <p>
              Before we get started with the story, let's do some introductions. We at “The DaBible Foundation” are a team of energetic young people. Some team members are college students; others had just accepted Jesus as their savior when this project started. You'll get to know some of our team members on this page. Several people have also been pivotal to the project's success, who may not be listed here. We haven’t forgotten, and indeed, God hasn't either; we appreciate all our crew members for all they continue to do. 
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 font-domine text-[#023E8A]">2013 - 2014</h3>

            <p className="italic">
              Two weeks before arriving in the United States, I, Sanmi, got saved. Before this, I lived an unruly lifestyle; I was a drunk, a chronic womanizer, and most sickening of all were my fraudulent street-hustling escapades. Thankfully, I found salvation, and I began my journey with the Lord. I must confess, though, that en route to the US, I intended to return to my old ways; I assumed that I wouldn’t need God anymore. I was keen on getting drunk and womanizing my way into the future. If I just gave my life to Jesus two weeks ago, I can as well take it back instantly, it's my life anyway! … not knowing that God already has an eternal plan waiting to be unveiled.
            </p>

            <p className="italic">
              Upon arrival the hospitable family had a place in their library for me to sleep. Surrounded by books, I forgot my plans and started studying Christian books ferociously. I primarily studied the bible, which strangely opened to me! I never knew the Bible was this interesting. I was hungry for the word of God. I found that I lost the urge to drink alcohol, and for the first time in my life, the prior overwhelming lust for the opposite sex was killed. All I wanted now was to know more about God. So, I kept reading and learning, guided only by the Holy Spirit. This went on for six months… 
            </p>

            <p>
             I started having questions about what I was reading, what I saw in my dreams, and the visions of the night. Then I remembered a lady, Demilade, who had always been churchy and non-judgmental. Strangely, we reconnected, and she began to provide answers, scriptures, and explanations that made sense. Little did I know that Demilade was also praying for the salvation of my soul in Nigeria. Back in Nigeria, I was incredibly selfish, ruthless, and employed every crooked method to make money. Besides, I was a hip-hop artist during the week and a backup vocalist of a live band on weekends. I'm either in the club, drinking, and picking up strange ladies. Now that I have no idea what to do with my life, I turn to prayer and studying the Word, but I still have a problem…
            </p>

            <p>
              ... The King James Bible was complicated for me to understand. I love my KJV because it forces me to study using parallel translations, which has expanded my understanding, but it was still tricky. How can I keep reading even when I need to sleep? I went online and found an audio narration of the Bible. Oh, what a blessing! So, I'll listen to the audio first, then read! My friend and discipler, Demilade, was also loading me with prayers I must pray earnestly every night. One of those nights, I found myself saying, “God, give me an idea that would turn my life around!” And He did. To my surprise, I wasn’t given just one idea but three. I had heard a clear, audible voice, “Build me an Audio Bible!”.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 font-domine text-[#023E8A]">2015</h3>

            <p>
              Being recently converted, I was skeptical. It was my first such experience, and I needed to be sure it was the voice of the Lord. Then the Holy Spirit ministered to me in the form of a question: “What will Satan gain from you by building a bible app?” That put an end to my doubts. Though I felt pretty inadequate - I hadn't even thoroughly read the Bible. How was I going to create a Bible app? That was the challenge. I recalled the personal testimony of the late evangelist Reinhard Bonnke about how God showed him a map of Africa covered in blood and a voice crying, “Africa must be saved.” I thought of the mighty works God wrought through Reinhard Bonnke and felt instantly invigorated.
            </p>

            <p>
               “God said I should do it.” “I am all for it. “So far, He says it, I am up on my feet!” I told myself. 
            </p>

            <p>
              The first thing I did was research how many people were searching for a Yoruba Audio Bible app. Using my SEO skills, I quickly found the numbers. They were only about 50 searches; Once again, I became discouraged, but quickly recovered, trusting that God had a plan. And yes, He did. I was led to call a friend. He was the one I needed to speak to about this project. I reached for my phone and quickly dialed Abiola Oduremi, and the rest is history. We recorded the Yoruba Bible in Ibadan, Nigeria, over about a year and released the app in early 2016.
            </p>

            <h3 className="text-2xl font-bold mt-8 mb-4 font-domine text-[#023E8A]">Going Forward </h3>

            <p>
              We have not only created the Yoruba Audio Bible mobile app, which has over 196,584 users in the last 4 years. But we have gone on to make similar apps for the Pidgin and Hausa languages. We thank God for how far we’ve come. Despite the challenges we face, we keep growing each time. We are currently releasing a Solar Audio Device, which will be distributed to remote parts of Africa where mobile app penetration is low. Apart from the technological side of things, we have been heavily involved in evangelism through our team of missionaries, who take delight in winning souls and raising disciples across villages and cities in Africa. The rest of the story will be made available on a separate platform. 
            </p>

            <p>
              Today, the DaBible Foundation stands as a beacon of hope, a testament to the transformative power of faith and the boundless potential of collaboration. As they continue to expand their reach and impact, they invite like-minded individuals to join them on their journey. Whether you're a seasoned professional, a passionate volunteer, or simply someone eager to make a difference, the DaBible Foundation welcomes you with open arms. Together, let's write the next chapter of our story, united in our mission to empower missionaries, enrich communities, and illuminate hearts with the timeless power of God's Word.
            </p>
          </div>
        </div>
      </section>

      {/* Our Achievements Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-domine font-bold text-[#023E8A] mb-8">
            Our Achievements
          </h2>

          <div className="teal-gradient rounded-xl p-6 md:p-10 text-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 text-center">
              <div className="flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 font-montserrat">
                  239k+
                </h3>
                <p className=" md:text-xl font-mada max-w-[250px] text-lg ">
                  Downloads across all our apps as of 2020
                </p>
              </div>

              <div className="flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-bold font-montserrat mb-2">
                  11k+
                </h3>
                <p className="md:text-xl font-mada max-w-[250px] text-lg">
                  Active monthly users served across all our apps
                </p>
              </div>

              {/* <div className="flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 font-montserrat">
                  $50k+
                </h3>
                <p className="md:text-xl font-mada max-w-[250px] text-lg">
                  Raised from donations
                </p>
              </div> */}

              <div className="flex flex-col items-center">
                <h3 className="text-4xl md:text-5xl font-bold mb-2 font-montserrat">
                  8 Years +
                </h3>
                <p className=" md:text-xl font-mada max-w-[250px] text-lg">
                  Building and deploying
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Expectations Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2 md:flex-[0.4]">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-6">
                Our Expectations At DaBible Foundation
              </h2>

              <div className="space-y-4 text-sm md:text-base text-gray-700">
                <p className="font-semibold">
                  DaBible Foundation welcomes entrepreneurs, techies, and
                  developers who want to contribute to our mission. Our project
                  is open source and available on GitHub, contact us to learn more.
                </p>

                <p>
                  We&apos;re deeply grateful to our patrons for their generous
                  support. Your help powers ongoing projects, including new
                  language recordings. We&apos;re always looking for passionate
                  individuals to join us in spreading God&apos;s Word globally.
                </p>

                <p>
                  A special burden on our hearts is reaching elderly people in
                  remote villages who struggle with mobile apps. We&apos;re
                  working with Chinese partners to create easy-to-use audio
                  Bible devices, completely free for the elderly.
                </p>

                <p>
                  To support this, we&apos;re launching the &quot;Empower
                  5,000&quot; Device Evangelism Campaign. With your help, we aim
                  to distribute 5,000 devices through our village evangelism
                  teams. We trust God to provide, just as He has through your
                  continued encouragement.
                </p>
              </div>
            </div>

            <div className="w-full md:w-1/2 relative md:flex-[0.6]">
              <div className="relative h-[300px] md:h-[600px] ">
                <Image
                  src="/png/expectations.png"
                  alt="Village outreach"
                  fill
                  className="object-contain rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Meet The Team Section */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-[#023E8A] mb-12 text-center">
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
