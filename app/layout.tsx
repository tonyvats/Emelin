import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Geist_Mono, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  variable: "--font-manrope",
  subsets: ["cyrillic", "latin"],
  display: "swap",
});

const display = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Сергей Емелин — ведущий",
  description:
    "Свадьбы, корпоративы, дни рождения, массовые мероприятия и частные квизы. Сергиев Посад и Большое Бетонное Кольцо.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="ru"
      className={`${sans.variable} ${display.variable} ${geistMono.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
