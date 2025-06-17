import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Same Day Ramps | Professional Wheelchair Ramp Rentals in DFW",
  description: "Professional wheelchair ramp rentals with 24-hour installation in Dallas-Fort Worth. Safe, ADA-compliant ramps for post-surgery recovery, aging in place, and hospital discharge.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
