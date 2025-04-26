"use client";
import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Example coordinates for zones (can be customized)
const zones = [
  {
    name: "Green Zone",
    coords: [
      [40.748817, -73.985428],
      [40.749000, -73.985500],
      [40.749200, -73.984800],
      [40.748900, -73.984600],
    ],
    color: 'green',
  },
  {
    name: "Yellow Zone",
    coords: [
      [40.748000, -73.986000],
      [40.748200, -73.986200],
      [40.748400, -73.985800],
      [40.748100, -73.985600],
    ],
    color: 'yellow',
  },
  {
    name: "Red Zone",
    coords: [
      [40.747500, -73.987000],
      [40.747700, -73.987200],
      [40.747900, -73.986800],
      [40.747600, -73.986600],
    ],
    color: 'red',
  },
];

const Map = () => {
  const center = [40.748817, -73.985428]; // Center of the map (e.g., New York)
  const zoom = 16; // Zoom level

  return (
    <div style={{ position: 'relative', width: '100%', height: '500px' }}>
      <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '90%' }}>
        {/* OpenStreetMap TileLayer */}
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

        {/* Render the zones as polygons */}
        {zones.map((zone, index) => (
          <Polygon key={index} positions={zone.coords} color={zone.color} fillOpacity={0.4}>
            <Popup>{zone.name}</Popup>
          </Polygon>
        ))}
      </MapContainer>

      {/* Removed the Legend Box */}
    </div>
  );
};

export default Map;
