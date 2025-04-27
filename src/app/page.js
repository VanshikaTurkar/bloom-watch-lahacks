"use client";
import dynamic from "next/dynamic";

import Navbar from "../app/components/Navbar";
import HomePage from "../app/pages/HomePage"; 

const Map = dynamic(() => import("./map/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="p-8">
        <HomePage></HomePage>
      </main>
    </>
  );
}
