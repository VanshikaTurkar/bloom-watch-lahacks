"use client";

import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import Papa from 'papaparse';

// Dynamically import Leaflet components
const MapContainer = dynamic(() => import('react-leaflet').then(mod => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then(mod => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then(mod => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then(mod => mod.Popup), { ssr: false });

export default function Map() {
  const [algaeData, setAlgaeData] = useState([]);
  const [leafletLoaded, setLeafletLoaded] = useState(false);

  // Load Leaflet dynamically
  useEffect(() => {
    import('leaflet').then((L) => {
      window.L = L;
      setLeafletLoaded(true);
    });
  }, []);

  // Fetch and parse CSV data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/data/algae-bloom.csv');
        if (!response.ok) throw new Error(`Failed to fetch CSV: ${response.statusText}`);

        const csv = await response.text();

        Papa.parse(csv, {
          header: true,
          skipEmptyLines: true,
          complete: (result) => {
            const filteredData = result.data
              .map((row, idx) => {
                const latitude = parseFloat(row.Bloom_Latitude);
                const longitude = parseFloat(row.Bloom_Longitude);
                const advisory = row.Reported_Advisory_Types;

                if (isNaN(latitude) || isNaN(longitude)) {
                  console.warn(`Invalid coordinates at row ${idx}: ${row.Bloom_Latitude}, ${row.Bloom_Longitude}`);
                  return null;
                }

                return {
                  latitude,
                  longitude,
                  advisory: typeof advisory === 'string' ? advisory.trim() : 'Unknown',
                };
              })
              .filter(Boolean);

            setAlgaeData(filteredData);
          },
          error: (error) => console.error('Error parsing CSV:', error),
        });
      } catch (error) {
        console.error('Error fetching CSV:', error);
      }
    };

    fetchData();
  }, []);

  const center = [37.7749, -122.4194];
  const zoom = 10;

  if (!leafletLoaded) return <div>Loading map...</div>;

  const L = window.L;

  return (
    <div style={{ width: '100%', height: '100%'}}>
      <MapContainer center={center} zoom={zoom} style={{ width: '100%', height: '100%', borderRadius:'10px'}}>
        <TileLayer
          attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {algaeData.map((location, idx) => {
          const { latitude, longitude, advisory } = location;

          const color = advisory === 'Danger' ? 'red' : advisory === 'Warning' ? 'yellow' : 'green';

          const markerIcon = new L.Icon({
            iconUrl: `/marker-icons/${color}-icon.png`,
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
          });

          return (
            <Marker key={idx} position={[latitude, longitude]} icon={markerIcon}>
              <Popup>
                <b>Algae Bloom Advisory:</b> {String(advisory)}
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}
