import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { EnhancedSidebar } from "@/components/components-enhanced-sidebar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "App with Persistent Sidebar",
  description: "An application layout with a persistent sidebar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-background overflow-hidden">
      <head>
        
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-full w-full text-black m-0 bg-background text-foreground`}
      >
        <EnhancedSidebar>
          {children}
        </EnhancedSidebar>
      </body>
    </html>
  );
}
