import type { Metadata } from "next";
import { Libre_Baskerville, DM_Sans } from "next/font/google";
import "./globals.css";

const libreBaskerville = Libre_Baskerville({
  variable: "--font-libre-baskerville",
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Shrika Dreams | Real Estate Consultant in Bangalore",
  description:
    "Bangalore's trusted real estate consultant. Verified projects from Prestige, Sattva, Century, Brigade, and Godrej with honest guidance at every step.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${libreBaskerville.variable} ${dmSans.variable} antialiased`}
    >
      <body className="bg-offwhite">{children}</body>
    </html>
  );
}
