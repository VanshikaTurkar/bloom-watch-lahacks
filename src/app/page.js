"use client";
import dynamic from "next/dynamic";

// Dynamic import disables SSR for this component
const Form = dynamic(() => import("./components/FormSubmit"), {ssr:false});
const Alert = dynamic(() => import("./components/Alert"), {ssr:false});

// src/app/page.js
import Navbar from "../app/components/Navbar";
import HomePage from "../app/pages/HomePage"; // <-- You need to import HomePage!

// Dynamic import disables SSR for this component
const Map = dynamic(() => import("./map/Map"), { ssr: false });

export default function Home() {
  return (
    <>
      <Navbar />
      <HomePage> </HomePage>
    </>
  );
}
