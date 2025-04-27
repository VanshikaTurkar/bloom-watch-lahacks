"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Tabs, TabsList, TabsTrigger } from './ui/Tabs';
import '../styles/navbar.css';

export default function Navbar() {
  const pathname = usePathname();
  const defaultValue = pathname.replace('/', '') || 'map';
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Tabs defaultValue={defaultValue} className="tabs-wrapper">
          <TabsList className="tabs-list">
            <TabsTrigger value="home" className="tabs-trigger">
              <Link href="/">Home</Link>
            </TabsTrigger>
            <TabsTrigger value="map" className="tabs-trigger">
              <Link href="/map">Map</Link>
            </TabsTrigger>
            <TabsTrigger value="report" className="tabs-trigger">
              <Link href="/report">Report</Link>
            </TabsTrigger>
            <TabsTrigger value="insight" className="tabs-trigger">
              <Link href="/insight">Insight</Link>
            </TabsTrigger>
            <TabsTrigger value="chat" className="tabs-trigger">
              <Link href="/chat">Chat</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </nav>
  );
}