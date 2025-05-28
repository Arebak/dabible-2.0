

import BibleStudyForm from "@/components/BibleStudyForm";
import Image from "next/image";

export default function AntiochPage() {
  
  return (
    <div className="w-full">
      <section className="bg-[#fef9f4] py-16 px-6 md:px-20 flex flex-col-reverse lg:flex-row items-center gap-10 relative overflow-hidden">
        {/* Left Text Content */}
        <div className="absolute inset-0 w-full bg-[url('/designs/bible-girl.jpg')] bg-top-left lg:bg-top-right bg-no-repeat z-1"></div>
        <div className="absolute w-full bg-gradient-to-t from-20% from-white to-transparent z-2 bottom-0 left-0 h-32"></div>
        <div className="absolute inset-0 w-full bg-[url('/svg/polygon-1.svg')] bg-top-left lg:bg-bottom-left bg-no-repeat z-1"></div>


        <div className="w-full mt-0 lg:mt-18 md:w-2xl lg:w-5xl self-center container mx-auto text-center z-3">
            <h1 className="text-5xl md:text-8xl lg:text-6xl xl:text-8xl font-extrabold text-[#1e1e1e] leading-tight font-montserrat">
                Just Got <span className="text-white bg-red-500 px-3 py-1 rounded-full">Born</span> Again?
            </h1>
            <div className="bg-[url('/svg/line-break.svg')] inset-0 w-full h-[25px]  bg-size-[25px] bg-repeat my-14"></div>
            <p className="text-3xl mx-auto lg:text-6xl mt-6 text-gray-800 font-bold font-montserrat md:max-w-lg">
                Confused about <span className="text-red-500 font-extrabold underline">where</span> to start?
            </p>
            <p className="text-lg md:text-lg lg:text-2xl mt-2 md:mt-8 max-w-xl !mx-auto lg:mx-0 text-gray-700 font-proza-libre font-medium text-center">
            We now have an online bible study platform.
            </p>

            <div className="bg-[url('/svg/line-break-2.svg')] w-full h-[20px] bg-center bg-contain bg-no-repeat my-8 mx-auto"></div>
            
            <Image
            src="/svg/antioch.svg"
            alt="Bible Study Logo"
            className="w-2/3 max-w-md h-auto object-contain mx-auto mt-4"
            width={500}
            height={500}
            />
            <p className="text-md md:text-xl lg:text-2xl font-medium -mt-4 text-gray-800">where you can grow with other believers in the Word of God every day.</p>
            {/* <p className="font-comforter text-6xl lg:text-8xl">Join our</p>
            <p className="text-4xl text-[#111556] -mt-4 font-extrabold font-montserrat lg:text-8xl uppercase">Online Bible Study</p> */}
        </div>

        {/* Right Image */}
        {/* <div className="flex-1 w-full max-w-md"> */}
        {/* <Image
            src="/designs/bible-girl.jpg"
            alt="Woman holding Bible"
            className="w-2/3 h-auto object-contain absolute top-0 right-0"
            width={500}
            height={500}
            /> */}
        {/* </div> */}

        {/* Decorative background elements can be added here */}
        </section>

        <section className="bg-white py-0 md:py-16 px-6 md:px-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                {/* Speaker Image */}
                <div className="flex-1">
                <Image
                    src="/designs/sanmi.jpg"
                    alt="Bible Study Testimonial Speaker"
                    className="w-full max-w-sm mx-auto rounded-lg"
                    width={500}
                    height={500}
                />
                </div>

                {/* Description */}
                <div className="flex-1 text-center lg:text-left">
                <span className="bg-gray-200 text-sm px-3 py-1 rounded-full uppercase font-semibold tracking-wide mb-4 inline-block">
                    Live
                </span>
                <h2 className="text-3xl md:text-5xl text-gray-900 mb-4 font-montserrat font-extrabold">
                    Daily Bible Study
                </h2>
                <p className="text-gray-700 text-base md:text-lg mb-6">
                    Join a community of believers who meet together every night from Monday to Friday to study the bible, pray and intercede.
                </p>

                {/* What Will Happen */}
                <h3 className="text-xl mb-4 text-gray-900 font-montserrat font-extrabold">What Will Happen</h3>
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 text-md text-gray-800 font-medium">
                    <div className="flex items-center gap-2">🕊️ Encounter with The Holy Spirit</div>
                    <div className="flex items-center gap-2">📖 Revelation of the Word</div>
                    <div className="flex items-center gap-2">🔥 Intense Prayers</div>
                    <div className="flex items-center gap-2">🧑🏾‍🤝‍🧑🏽 Guest Ministers</div>
                    <div className="flex items-center gap-2">🌱 Spiritual Growth</div>
                    <div className="flex items-center gap-2">✨ Total Transformation</div>
                </div>
                </div>
            </div>
            </section>

        <section className="bg-[#fff7f2] py-16 px-6 md:px-20">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-10">
                {/* Left Image */}
                <div className="flex-1">
                <Image
                    width={500}
                    height={500}
                    src="/designs/bible_readers.jpeg"
                    alt="Bible Study Participants"
                    className="w-full rounded-lg shadow-md"
                />
                </div>

                {/* Right Content */}
                <div className="flex-1">
                <h3 className="text-3xl md:text-5xl text-gray-900 mb-4 font-montserrat font-extrabold">
                    How To Participate
                </h3>
                <p className="text-md md:text-lg text-gray-700 mb-6">
                    We meet together <strong>Monday to Friday</strong> on Google Meet for <strong>1 hour</strong> at the following time zones:
                </p>

                <ul className="text-gray-800 text-sm md:text-lg mb-6 space-y-1">
                    <li>🇬🇧 UK – 2 AM (WAT)</li>
                    <li>🇳🇬 Nigeria – 3 AM (WAT)</li>
                    <li>🇺🇸 USA – 9 PM (EST)</li>
                    <li>🇺🇸 USA – 6 PM (PST)</li>
                </ul>

                <p className="text-sm text-gray-600">
                    The class is also livestreamed on YouTube and Instagram. If you are interested, sign up using the form below. Someone from our team will reach out.
                </p>

                <p className="text-sm text-gray-600 mt-4">
                    We are not pastors, reverends, or theologians. We are just a group of hungry Christians who want to transform people through the revelation of God’s word.
                </p>
                </div>
            </div>
        </section>

        <section className="bg-white py-16 px-6 md:px-20">
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-12">
                
                {/* Form Content */}
                
                <BibleStudyForm/>

                {/* Right Poster */}
                <div className="flex-1 w-full max-w-sm mx-auto">
                <Image
                    width={500}
                    height={500}
                    src="/designs/hebrews.jpg"
                    alt="Book of Hebrews Poster"
                    className="w-full rounded-lg shadow-lg"
                />
                </div>
            </div>
        </section>

        {/* Watch and Join Online Section */}
        <section className="bg-gray-100 py-16 px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 font-domine">
                Can’t Attend in Person?
            </h2>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto font-mada">
                Don’t worry! You can join us live from anywhere in the world via YouTube or Google Meet.
            </p>

            <div className="flex flex-col md:flex-row justify-center gap-6">
                <a
                href="https://youtube.com/@dabible"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                Watch on YouTube
                </a>

                <a
                href="https://meet.google.com/your-meeting-id"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition duration-300"
                >
                Join on Google Meet
                </a>
            </div>

            <p className="text-sm text-gray-500 mt-6">
                Streaming begins 10 minutes before each session. Please be on time!
            </p>
        </section>


    </div>
  );
}
