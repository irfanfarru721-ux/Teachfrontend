import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="w-full bg-white shadow-sm fixed top-0 left-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">MySite</Link>

        <button
          className="md:hidden p-2 rounded-xl border"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>

        <div className="hidden md:flex space-x-6 text-base">
          <Link href="/about" className="hover:text-gray-600">About</Link>
          <Link href="/services" className="hover:text-gray-600">Services</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white shadow-inner px-4 pb-4 flex flex-col space-y-3">
          <Link href="/about" className="hover:text-gray-600">About</Link>
          <Link href="/services" className="hover:text-gray-600">Services</Link>
          <Link href="/contact" className="hover:text-gray-600">Contact</Link>
        </div>
      )}
    </nav>
  );
}
