import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white p-12">
      <div className="md:flex ">
        {/* Contact Form */}
        <div className="p-6 rounded-lg md:w-[33%]">
          <h3 className="text-lime-400 text-sm font-mono mb-4">CONTACT US</h3>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            WANT TO <span className="text-lime-400">CONTACT US?</span>
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="Your name"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
            <input
              type="text"
              placeholder="Phone number"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white"
            />
            <textarea
              placeholder="Message"
              className="w-full bg-black border border-gray-700 rounded-lg px-4 py-3 text-white h-28 resize-none"
            ></textarea>
            <button className="bg-lime-400 text-black px-6 py-3 rounded-lg hover:bg-lime-500">
              Send Message
            </button>
          </form>
        </div>
    <div className="md:flex justify-between md:w-[67%]">

        {/* Navigation and Contact Details */}
        <div className="">
          <div>
            <h3 className="text-lime-400 text-sm font-mono mb-4">ABOUT</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Company
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Team
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Projects
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lime-400 text-sm font-mono mb-4">INFO</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  Advantages
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-400 hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          </div>
        <div className="">
          <div>
            <h3 className="text-lime-400 text-sm font-mono mb-4">CONTACT US</h3>
            <ul className="space-y-2">
              <li className="text-gray-400">+1 (999) 999-99-99</li>
              <li className="text-gray-400">hello@company.com</li>
              <li className="text-gray-400">Riga, Latvia</li>
            </ul>
          </div>
        </div>
        {/* Logo and Social Links */}
        <div className="">
          <div className="flex justify-center lg:justify-end">
            <Link href="/" className="flex items-center mb-4">
            <Image
              src="/lumtech-logo.svg"
              alt="Lumtech"
              width={140}
              height={32}
              className="h-8 w-auto"
            />
            </Link>
          </div>
          </div>
      </div>
    </div>
        <div className="center">
          <div className="flex space-x-4 justify-center mb-4">
            <Link href="#" className="text-gray-400 hover:text-white">
              <Facebook className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Instagram className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Youtube className="w-6 h-6" />
            </Link>
            <Link href="#" className="text-gray-400 hover:text-white">
              <Twitter className="w-6 h-6" />
            </Link>
          </div>
          <div className="text-center text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Lumtech. All rights reserved.
          </div>
        </div>
    </footer>
  );
}
