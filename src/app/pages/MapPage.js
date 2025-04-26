"use client";
import dynamic from "next/dynamic";
import Navbar from "./components/Navbar"; // Assuming this is your Navbar component

// Dynamic import disables SSR for this component
const Map = dynamic(() => import("./components/Map"), { ssr: false });

export default function MapPage() {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <h1 className="text-4xl font-bold mb-4">Map Page</h1>
        <p className="text-lg text-gray-600 mb-4">
          Here is the map view.
        </p>
        <div className="w-full h-[500px]">
          <Map /> {/* Render the Map component here */}
        </div>
      </main>
    </>
  );
}
