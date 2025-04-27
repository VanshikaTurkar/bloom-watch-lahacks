'use client';

import Navbar from '../components/Navbar';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

// --- Placeholder Data (replace with real data) ---
const center = [51.505, -0.09];
const zoom = 13;
const zones = [
  { name: 'Zone A (Low)', coords: [[51.51, -0.1], [51.51, -0.08], [51.5, -0.08], [51.5, -0.1]], color: 'green' },
  { name: 'Zone B (Medium)', coords: [[51.515, -0.12], [51.515, -0.1], [51.505, -0.1], [51.505, -0.12]], color: 'yellow' },
  { name: 'Zone C (High)', coords: [[51.5, -0.07], [51.5, -0.05], [51.49, -0.05], [51.49, -0.07]], color: 'red' },
];
// --- End Placeholder ---

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar at top */}
      <Navbar />

      {/* Map and Legend Container */}
      <div className="flex flex-row flex-grow h-[calc(100vh-4rem)]"> {/* Adjust height if Navbar is taller */}
        
        {/* Map */}
        <div className="flex-grow h-full">
          <MapContainer center={center} zoom={zoom} className="w-full h-full">
            <TileLayer
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {zones.map((zone, idx) => (
              <Polygon
                key={idx}
                positions={zone.coords}
                color={zone.color}
                fillOpacity={0.4}
              >
                <Popup>{zone.name}</Popup>
              </Polygon>
            ))}
          </MapContainer>
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
