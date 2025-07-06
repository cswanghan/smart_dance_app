'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from '@auth0/nextjs-auth0';
import { Navbar } from '@/components/navbar';

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <Auth0Provider>
        <body className={inter.className}>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main>
              {children}
            </main>
          </div>
        </body>
      </Auth0Provider>
    </html>
  );
}
