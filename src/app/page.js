"use client";
import dynamic from "next/dynamic";

// Dynamic import disables SSR for this component
const Map = dynamic(() => import("./components/Map"), { ssr: false });

// src/app/page.js
import Navbar from "../app/components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to Next.js!</h1>
        <p className="text-lg text-gray-600">
          This is your default home page with a navbar.
        </p>
      </main>
    </>
  );
}
