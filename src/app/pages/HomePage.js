'use client';

import { useState } from 'react';
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import Map from '../map/Map'; // Assuming Map component is already created
//import { Tabs, TabsList, TabsTrigger } from "../components/ui/Tabs";
import { FaUserSecret, FaSearch } from 'react-icons/fa'; // Detective + Magnifying Glass
import { GiCoral } from 'react-icons/gi'; // Coral = Algae

export default function HomePage() {
  const [search, setSearch] = useState('');

  return (
    <main className="min-h-screen /*bg-gradient-to-br from-teal-100 to-blue-200*/ flex flex-col items-center p-6 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 /*bg-gradient-to-br from-teal-300 via-blue-300 to-purple-300 opacity-50*/ blur-3xl animate-gradient bg-[length:400%_400%]"></div>
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-48 h-48 bg-green-200 opacity-30 rounded-full filter blur-2xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-teal-300 opacity-20 rounded-full filter blur-3xl animate-pulse"></div>

      {/* Tabs 
      <Tabs defaultValue="map" className="w-full max-w-4xl mb-6 z-10">
        <TabsList className="grid grid-cols-4 gap-2 bg-white/70 backdrop-blur rounded-xl p-2 shadow">
          <TabsTrigger value="map">Map</TabsTrigger>
          <TabsTrigger value="report">Report</TabsTrigger>
          <TabsTrigger value="insight">Insight</TabsTrigger>
          <TabsTrigger value="chat">Chat</TabsTrigger>
        </TabsList>
      </Tabs> */}

      {/* Logo Section */}
      {/* Logo Section */}
      <div className="flex items-center gap-3 mb-6 z-10">
        <div className="flex items-center gap-1 text-4xl text-teal-700 transition-transform duration-300 hover:scale-110">
          <FaUserSecret />
          <FaSearch />
        </div>
        <h1 className="text-5xl font-extrabold text-teal-700 tracking-wide">
          BloomWatch
        </h1>
        <GiCoral className="text-4xl text-teal-700 transition-transform duration-300 hover:scale-125 hover:rotate-6 animate-pulse" />
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
      {/*</div>*/}

    </main>
  );
}
