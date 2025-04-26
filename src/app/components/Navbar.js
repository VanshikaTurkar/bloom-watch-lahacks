"use client";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-600 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          MyApp
        </Link>

        <button
          className="sm:hidden"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          ☰
        </button>

        <ul
          className={`sm:flex gap-6 ${
            isOpen ? "block mt-4" : "hidden"
          } sm:mt-0 sm:block`}
        >
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li>
            <Link href="/contact" className="hover:underline">
              Contact
            </Link>
          </li>
          <li>
            <Link href="/chat" className="hover:underline">
              Chat
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
