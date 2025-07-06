'use client';

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Auth0Provider } from '@auth0/nextjs-auth0';

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Auth0Provider>
        <body className={inter.className}>{children}</body>
      </Auth0Provider>
    </html>
  );
}
