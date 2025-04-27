'use client';

import Navbar from '../components/Navbar';
import Map from './Map';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Map and Legend Container */}
      <div className="flex flex-row flex-grow h-[calc(100vh-4rem)]">
        
        {/* Map */}
        <div className="flex-grow h-full">
          <Map /> {/* <-- using the imported Map component */}
        </div>

        {/* Legend */}
        <div className="w-64 h-full bg-teal-50 p-4 shadow-md flex flex-col">
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
    </div>
  );
}
