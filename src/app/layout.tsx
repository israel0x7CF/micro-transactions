import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/NavBar";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { UserActions } from "@/context/activeUserContext";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MicroTransactions",
  description: "prototype",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <UserActions>

        <Toaster />
        <Navbar />
        <Suspense fallback={<div>Loading...</div>}>
        {children}
        </Suspense>
        </UserActions>
      </body>
    </html>
  );
}
