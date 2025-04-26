// src/app/page.jsx
'use client';

import Link from 'next/link';

export default function IntroPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-blue-50 px-4 py-8">
      <div className="max-w-lg text-center bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-4xl font-bold text-blue-800 mb-4">🌊 Welcome to MarineBot</h1>
        <p className="text-gray-700 mb-6 text-lg">
          Your friendly AI assistant for algae blooms, marine safety, and beach conditions.
          Stay informed, stay safe!
        </p>
        <Link href="/chat" className="inline-block">
          <button className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition">
            Start Chat
          </button>
        </Link>
      </div>
    </div>
  );
}
