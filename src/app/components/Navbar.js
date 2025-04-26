// src/app/components/Navbar.jsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs';

export default function Navbar() {
  // Derive the current tab from the URL ("/", "/map", "/report", etc.)
  const pathname = usePathname();
  const defaultValue = pathname.replace('/', '') || 'map';

  return (
    <nav className="bg-[#E6FFFA] py-4">
      <div className="max-w-4xl mx-auto px-4">
        <Tabs defaultValue={defaultValue} className="w-full mb-6 z-10">
          <TabsList className="grid grid-cols-4 gap-2 bg-white/70 backdrop-blur-sm rounded-full p-2 shadow-lg">
            <TabsTrigger value="map" className="text-center">
              <Link href="/">Home</Link>
            </TabsTrigger>
            <TabsTrigger value="map" className="text-center">
              <Link href="/map">Map</Link>
            </TabsTrigger>
            <TabsTrigger value="report" className="text-center">
              <Link href="/report">Report</Link>
            </TabsTrigger>
            <TabsTrigger value="insight" className="text-center">
              <Link href="/insight">Insight</Link>
            </TabsTrigger>
            <TabsTrigger value="chat" className="text-center">
              <Link href="/chat">Chat</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
}
