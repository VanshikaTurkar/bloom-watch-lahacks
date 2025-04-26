'use client';

import { useState } from 'react';
import Navbar from '../components/Navbar'; // Importing the Navbar component
import Map from '../components/Map'; // Assuming Map component is already created

export default function MapPage() {
  const [search, setSearch] = useState('');

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Map and Legend Section */}
      <div className="relative flex-grow flex flex-col items-center p-6 z-10">
        {/* Map Section */}
        <div className="relative w-full max-w-4xl h-[80vh] rounded-3xl shadow-lg mb-6 z-10">
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
      </div>
    </div>
  );
}
