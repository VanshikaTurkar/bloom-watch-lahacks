/*'use client';

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

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
*/
"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

// Dynamically import the necessary components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });
import L from 'leaflet';
import Papa from 'papaparse';
import { useEffect, useState } from 'react';

// Path to your CSV file in the public folder
const csvFilePath = '/data/algae-blooms.csv'; // Update this path

export default function Map() {
  const [algaeData, setAlgaeData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(csvFilePath);
      const csv = await response.text();
      
      // Parse CSV data
      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: (result) => {
          const filteredData = result.data.map((row) => ({
            latitude: row.Bloom_Latitude,
            longitude: row.Bloom_Longitude,
            advisory: row.Reported_Advisory_Types,
          }));
          setAlgaeData(filteredData);
        },
        error: (error) => {
          console.error("Error parsing CSV:", error);
        },
      });
    };

    fetchData();
  }, []);

  // Set initial map center and zoom
  const center = [37.7749, -122.4194]; // San Francisco as an example
  const zoom = 13;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {algaeData.map((location, idx) => {
          const { latitude, longitude, advisory } = location;
          
          // Set color based on advisory type
          const color = advisory === 'Danger' ? 'red' : advisory === 'Warning' ? 'yellow' : 'green';

          // Define the marker icon based on advisory type
          const markerIcon = new L.Icon({
            iconUrl: `/marker-icons/${color}-icon.png`, // Use the correct URL for your icons
            iconSize: [32, 32],
            iconAnchor: [16, 32],
          });

          return (
            <Marker
              key={idx}
              position={[parseFloat(latitude), parseFloat(longitude)]}
              icon={markerIcon}
            >
              <Popup>
                <b>Algae Bloom Advisory:</b> {advisory}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
