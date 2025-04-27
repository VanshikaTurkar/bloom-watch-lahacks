'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Lazy load MapContainer and friends only on client
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Polygon = dynamic(() => import('react-leaflet').then(mod => mod.Polygon), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

const zones = [
  { name: 'Zone A (Low)', coords: [[51.51, -0.1], [51.51, -0.08], [51.5, -0.08], [51.5, -0.1]], color: 'green' },
  { name: 'Zone B (Medium)', coords: [[51.515, -0.12], [51.515, -0.1], [51.505, -0.1], [51.505, -0.12]], color: 'yellow' },
  { name: 'Zone C (High)', coords: [[51.5, -0.07], [51.5, -0.05], [51.49, -0.05], [51.49, -0.07]], color: 'red' },
];

const center = [51.505, -0.09];
const zoom = 13;

export default function Map() {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='© OpenStreetMap contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {zones.map((zone, idx) => (
          <Polygon
            key={idx}
            positions={zone.coords}
            pathOptions={{ color: zone.color, fillOpacity: 0.4 }}
          >
            <Popup>{zone.name}</Popup>
          </Polygon>
        ))}
      </MapContainer>
    </div>
  );
}
