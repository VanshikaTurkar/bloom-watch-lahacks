import Image from "next/image";
import Map from "../app/components/Map";
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
        <Map></Map>
      </main>
    </>
  );
}
