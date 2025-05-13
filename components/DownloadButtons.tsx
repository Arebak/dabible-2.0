import Image from "next/image"
import Link from "next/link"

interface DownloadButtonsProps {
  AppStoreLink?: string;
  PlayStoreLink?: string;
}

const DownloadButtons = ({ AppStoreLink, PlayStoreLink }: DownloadButtonsProps) => {

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <Link
        href={AppStoreLink || "#download"}
        className="flex gap-x-3 items-center bg-black text-white py-2 px-4 rounded-lg w-full sm:w-auto"
      >
        <Image
          src="/svg/apple.svg"
          alt="Download on the App Store"
          width={50}
          height={50}
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm md:text-base">Download on the</p>
          <h4 className="text-lg sm:text-xl font-semibold -mt-1 sm:-mt-2">App Store</h4>
        </div>
      </Link>
      <Link
        href={PlayStoreLink || "#download"}
        className="flex gap-x-3 items-center bg-black text-white py-2 px-4 rounded-lg w-full sm:w-auto"
      >
        <Image
          src="/svg/playstore.svg"
          alt="Get it on Google Play"
          width={50}
          height={50}
          className="h-8 sm:h-10 md:h-12 w-auto"
        />
        <div className="flex flex-col">
          <p className="text-xs sm:text-sm md:text-base">Get it on</p>
          <h4 className="text-lg sm:text-xl font-semibold -mt-1 sm:-mt-2">Google Play</h4>
        </div>
      </Link>
    </div>
  )
}

export default DownloadButtons