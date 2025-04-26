'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar'; // Importing the Navbar component
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Map from '../components/Map'; // Assuming Map component is already created

export default function MapPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-100 to-blue-200 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Background Effects */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-teal-300 via-blue-300 to-purple-300 opacity-50 blur-3xl animate-gradient bg-[length:400%_400%]"></div>
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-200 opacity-30 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

      {/* Main Content */}
      <main className="flex flex-col items-center p-6 relative z-10">
        {/* Logo Section */}
        <div className="flex items-center gap-3 mb-6 z-10">
          <span className="text-4xl">🌊</span>
          <h1 className="text-5xl font-extrabold text-teal-700 tracking-wide">
            BloomWatch
          </h1>
          <span className="text-4xl">🦠</span>
        </div>

        {/* Search Bar */}
        <div className="w-full max-w-md mb-8 z-10">
          <Input
            type="text"
            placeholder="Search bloom reports..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="rounded-full border-2 border-teal-400 focus:ring-teal-500 focus:border-teal-500 bg-white/80 backdrop-blur"
          />
        </div>

        {/* Map Section */}
        <div className="relative w-full max-w-4xl h-[500px] rounded-3xl shadow-lg p-6 mb-6 z-10">
          <Map />
        </div>

        {/* Legend */}
        <div className="absolute bottom-4 right-4 bg-teal-100/90 rounded-xl p-3 text-xs shadow z-20">
          <p className="font-bold mb-2 text-teal-800">Legend</p>
          <ul className="space-y-1 text-teal-700">
            <li>🟢 Low Risk</li>
            <li>🟡 Medium Bloom</li>
            <li>🔴 High Bloom</li>
          </ul>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 z-10 mt-6">
          <Button variant="outline" className="border-teal-500 text-teal-600 hover:bg-teal-100 rounded-full px-6 py-3 text-lg">
            Report Incident
          </Button>
          <Button variant="outline" className="border-blue-500 text-blue-600 hover:bg-blue-100 rounded-full px-6 py-3 text-lg">
            View Risk
          </Button>
        </div>
      </main>
    </div>
  );
}
