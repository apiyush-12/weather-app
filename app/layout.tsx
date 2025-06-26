import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Weather App",
  description: "Real-time weather updates by Piyush",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gradient-to-b from-green-500 to-blue-500 text-gray-800`}
      >
        <div className="min-h-screen flex flex-col">

          <header className="sticky top-0 z-10 w-full py-4 bg-white/60 backdrop-blur text-center shadow-md">
            <h1 className="text-2xl font-bold text-blue-700">Weather Forecasting 🌦️</h1>
          </header>

          <main className="flex-1 overflow-y-auto px-4 py-6 flex justify-center">
            <div className="w-full max-w-md">{children}</div>
          </main>

          <footer className="sticky bottom-0 z-10 w-full py-4 bg-white/60 backdrop-blur text-center shadow-inner">
            <p className="text-sm text-gray-700">
              Developed by <span className="font-semibold text-blue-800">Piyush</span> ❤️
            </p>
          </footer>
        </div>
      </body>
    </html>
  );
}
