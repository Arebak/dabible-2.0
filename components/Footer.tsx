import Image from "next/image";
import Link from "next/link";
import { Facebook, Instagram, Phone, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#091D36] text-white md:h-[577px] font-mada">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 lg:col-span-1 space-y-16">
            <Image
              src="/png/white-logo.png"
              alt="DaBible Foundation"
              width={200}
              height={60}
              className="mb-4"
            />
            <p className="text-white text-sm mb-6">
              An open source platform to develop digital bible and empower
              missionaries.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-2">
              <Link href="#" className="inline-block">
                <Image
                  src="/png/store.png"
                  alt="Download on the App Store"
                  width={153}
                  height={40}
                  className="border border-gray-600 rounded"
                />
              </Link>
              <Link href="#" className="inline-block">
                <Image
                  src="/png/play.png"
                  alt="Get it on Google Play"
                  width={153}
                  height={40}
                  className="border border-gray-600 rounded"
                />
              </Link>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-4 mt-6">
              <Link
                href="#"
                className="bg-white text-blue-950 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="bg-white text-blue-950 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Youtube size={18} />
              </Link>
              <Link
                href="#"
                className="bg-white text-blue-950 p-2 rounded-full hover:bg-gray-200 transition-colors"
              >
                <Instagram size={18} />
              </Link>
            </div>
          </div>

          {/* Visit Us */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">VISIT US</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="flex items-center text-white hover:text-white transition-colors"
                >
                  <Youtube size={18} className="mr-2" />
                  YouTube Channel
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center text-white hover:text-white transition-colors"
                >
                  <Facebook size={18} className="mr-2" />
                  Facebook Page
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center text-white hover:text-white transition-colors"
                >
                  <Instagram size={18} className="mr-2" />
                  Instagram
                </Link>
              </li>
              <li>
                <Link
                  href="tel:1-509-339-4854"
                  className="flex items-center text-white hover:text-white transition-colors"
                >
                  <Phone size={18} className="mr-2" />
                  1-509-339-4854
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">RESOURCES</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="col-span-1">
            <h3 className="text-lg font-bold mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white hover:text-white transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-6 border-t border-gray-200">
          <p className="text-white text-base text-center">
            DABIBLE FOUNDATION IS A DBA (DOING BUSINESS AS) OF KERYGMA
            FOUNDATION, A REGISTERED 501(C)(3) NON-PROFIT ORGANIZATION IN THE
            USA AND NIGERIA. ALL RIGHTS RESERVED
          </p>
        </div>
      </div>
    </footer>
  );
}
