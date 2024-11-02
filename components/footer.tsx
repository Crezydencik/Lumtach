import Link from 'next/link';
import { Facebook, Instagram, Youtube, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center mb-4">
              <span className="text-lime-400 text-2xl font-bold">Lum</span>
              <span className="text-white text-2xl font-bold">tech</span>
            </Link>
            <p className="text-gray-400">
              Empowering businesses through innovative technology solutions
            </p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">CONTACT US</h3>
            <p className="text-gray-400">+1 (999) 999-99-99</p>
            <p className="text-gray-400">hello@company.com</p>
            <p className="text-gray-400">Riga, Latvia</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">FOLLOW US</h3>
            <div className="flex space-x-4">
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
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">NEWSLETTER</h3>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="bg-gray-900 text-white px-4 py-2 rounded-lg flex-1"
              />
              <button className="bg-lime-400 text-black px-4 py-2 rounded-lg hover:bg-lime-500">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Lumtech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}