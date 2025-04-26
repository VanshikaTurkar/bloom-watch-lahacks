// src/app/layout.js
import Link from 'next/link';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <header className="bg-blue-800 text-white p-4 flex justify-between">
          <Link href="/" className="font-bold text-lg">🌊 MarineBot</Link>
          <nav>
            <Link href="/chat" className="mr-4 hover:underline">Chat</Link>
          </nav>
        </header>
        <main className="h-[calc(100vh-64px)]">{children}</main>
      </body>
    </html>
  );
}
