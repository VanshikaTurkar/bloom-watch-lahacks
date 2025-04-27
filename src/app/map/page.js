'use client';

import Navbar from '../components/Navbar';
import Map from './Map';

export default function HomePage() {
  return (
    <div className="relative min-h-screen overflow-hidden">
      
       {/* Map Container */}
       <div className="relative w-full h-screen z-10">
        <Map /> {/* Map fills the entire screen */}
      </div>

      {/* Navbar Floating */}
      <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-30">
        <Navbar />
      </div>

      {/* Legend Floating */}
      <div className="absolute top-6 right-6 bg-teal-50 p-4 rounded-lg shadow-lg z-20">
        <h3 className="font-bold text-lg mb-4 text-teal-800 border-b pb-2">Legend</h3>
        <ul className="space-y-2 text-teal-700 text-sm">
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-green-500 mr-2 inline-block"></span>
            Low Risk
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-yellow-500 mr-2 inline-block"></span>
            Medium Bloom
          </li>
          <li className="flex items-center">
            <span className="w-4 h-4 rounded-full bg-red-500 mr-2 inline-block"></span>
            High Bloom
          </li>
        </ul>
      </div>

    </div>
  );
}
