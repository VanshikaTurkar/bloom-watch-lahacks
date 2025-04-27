"use client";

import dynamic from "next/dynamic";
import Navbar from "../app/components/Navbar";
import HomePage from "../app/pages/HomePage"; // <-- You need to import HomePage!

// Dynamic import disables SSR for this component
const Map = dynamic(() => import("./map/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      
      <HomePage /> {/* <-- Correct usage */}
    </>
  );
}
